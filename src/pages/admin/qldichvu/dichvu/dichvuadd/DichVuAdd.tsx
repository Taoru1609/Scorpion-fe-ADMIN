import { FunctionComponent, useEffect, useState } from "react";
import DichVuAddView from "./DichVuAdd.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const DichVuAdd: FunctionComponent  <({

	id?: any
	
	onClose: (hasChange: boolean) => void
})>  = (props: any) => {

	const { dialogService } = useDialog();
	const [hasChange, setHasChange] = useState<boolean>(false);
	const [listOption, setOption] = useState<any[]>([]);
	const [selectedDichVu, setSelectedDichVu] = useState<any>();
	const [getId, setId] = useState<any>();

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

		let newData = {
			...myForm.value,
			loaiDichVuIdLoaiDichVu : {
				id: myForm.value.loaiDichVuIdLoaiDichVu
			}
		}
		
		if(props.id){
			newData.id = props.id
			newData.loaiDichVuIdLoaiDichVu = {
				id: selectedDichVu
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
		console.log(listOption)
	}

	const chonDichVu = (id: any) => {
		myForm.controls['loaiDichVuIdLoaiDichVu'].patchValue(selectedDichVu);
		setSelectedDichVu(id)
	}

	const closeDialog = () => {
		props.onClose(hasChange);
	}

	useEffect(() => {
		detailDichVu();
		getOption();
	}, []);


	return DichVuAddView({myForm, listOption, saveDichVu, closeDialog, chonDichVu, selectedDichVu, getId});
};

export default DichVuAdd;
