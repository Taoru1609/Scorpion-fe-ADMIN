import { FunctionComponent, useEffect, useState } from "react";
import AddRoomListView from "./AddRoomList.view";
import { FormBuilder } from "react-reactive-form";
import { FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const AddRoomList: FunctionComponent  <({

	id?: any
	
	onClose: (hasChange: boolean) => void
})>   = (props: any) => {
	const [hasChange, setHasChange] = useState<boolean>(false);
	const [listOption, setOption] = useState<any[]>([]);
	const [selectedPhong, setSelectedPhong] = useState<any>();
	const { dialogService } = useDialog();
	const [getId, setId] = useState<any>();


	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			loaiPhongIdLoaiPhong: [ null],
			soPhong: ['', ValidatorExtention.required('Số phòng không được để trống')],
			soTang: ['', ValidatorExtention.required('Số tầng không được để trống')],
			trangThai: [1]
		})
	);

	const savePhong = async () => {
		debugger
		if(myForm.invalid) return;

		let newData = {
			...myForm.value,
			soPhong: Number(myForm.value.soPhong),
			soTang: String(myForm.value.soTang),
		}
		
		if(props.id){
			newData.id = props.id
			newData.loaiPhongIdLoaiPhong = {
				id: selectedPhong
			}
			
			await DonDatApi.updatePhong(newData);
			dialogService.alert('Cập nhật thành công');
		}else{
			await DonDatApi.addPhong(newData);
			dialogService.alert('Thêm thành công');	
		}

		closeDialog();
	}

	const detailPhong = async () => {
		if(props.id){
			setId(props.id);
			const rs = await DonDatApi.detailPhong(props.id)
			myForm.patchValue(rs.data);
			setSelectedPhong(rs.data.loaiPhongIdLoaiPhong.id)
		}
	}
	const getOption = async () => {

		const rs = await DonDatApi.getLoaiPhong();
		setOption(rs.data);


	}
	const chonLoaiPhong = (id: any) => {
		myForm.controls['loaiPhongIdLoaiPhong'].patchValue({ id: id });
		setSelectedPhong(id)
	}

	const closeDialog = () => {
		props.onClose(hasChange);
	}
	
	useEffect(() => {
		detailPhong();
		getOption();
	}, []);

	return AddRoomListView({myForm, closeDialog, listOption, chonLoaiPhong, savePhong, selectedPhong, getId});
};

export default AddRoomList;
