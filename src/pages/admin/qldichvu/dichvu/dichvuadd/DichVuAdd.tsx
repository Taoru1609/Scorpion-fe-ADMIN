import { FunctionComponent, useEffect, useState } from "react";
import DichVuAddView from "./DichVuAdd.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useStatePromise } from "src/common/components/useStateSync";

export const DichVuAdd: FunctionComponent  <({

	id?: any
	
	onClose: (hasChange: boolean) => void
})>  = (props: any) => {

	const { dialogService } = useDialog();
	const [hasChange, setHasChange] = useStatePromise<boolean>(false);
	const [listOption, setOption] = useStatePromise<any[]>([]);
	const [selectedDichVu, setSelectedDichVu] = useStatePromise<any>(null);
	const [getId, setId] = useStatePromise<any>(null);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			loaiDichVuIdLoaiDichVu: [ null],
			tenDichVu: ['', ValidatorExtention.required('Tên dịch vụ không được để trống')],
			giaTien: ['', ValidatorExtention.required('Giá tiền không được để trống')],
			trangThai: [1]
		})
	);

	const saveDichVu = async () => {
		
		if(myForm.invalid) return;
		let formData = myForm.getRawValue();

		let newData = {
			...formData,
			loaiDichVuIdLoaiDichVu : {
				id: formData.loaiDichVuIdLoaiDichVu
			}
		}
		
		if(props.id){
			newData.id = props.id
			newData.loaiDichVuIdLoaiDichVu = {
				id: selectedDichVu.value
			}
			
			await DonDatApi.updateDichVu(newData);
			dialogService.alert('Cập nhật thành công');
		}else{
			await DonDatApi.addDichVu(newData);
			dialogService.alert('Thêm thành công');	
		}

		closeDialog();
	}

	const detailDichVu = async () => {
		if(props.id){
			setId(props.id);
			const rs = await DonDatApi.detailDichVu(props.id)
			myForm.patchValue(rs.data);
			setSelectedDichVu(rs.data.loaiDichVuIdLoaiDichVu.id)
		}
	}

	const getOption = async () => {
		const rs = await DonDatApi.getLoaiDichVu();
		setOption(rs.data);
		console.log(listOption.value)
	}

	const chonDichVu = async (id: any) => {
		console.log(id)
		await setSelectedDichVu(id)
		myForm.controls['loaiDichVuIdLoaiDichVu'].patchValue(selectedDichVu.value);
	}

	const closeDialog = () => {
		props.onClose(hasChange.value);
	}

	useEffect(() => {
		detailDichVu();
		getOption();
	}, []);


	return DichVuAddView({myForm, listOption, saveDichVu, closeDialog, chonDichVu, selectedDichVu, getId});
};

export default DichVuAdd;
