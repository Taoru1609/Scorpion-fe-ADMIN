import { FunctionComponent, useEffect, useState } from "react";
import AddRoomTypeView from "./AddRoomType.view";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const AddRoomType: FunctionComponent <({

	idLoaiPhong?: any
	
	onClose: (hasChange: boolean) => void
})> = (props: any) => {
	const [hasChange, setHasChange] = useState<boolean>(false);
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idLoaiPhong: [ null],
			tenLoaiPhong: ['', ValidatorExtention.required('Tên loại phòng không được để trống')],
			huongNhin: ['', ValidatorExtention.required('Hướng nhìn không được để trống')],
			soNguoi: ['', ValidatorExtention.required('Số người không được để trống')],
			dienTich: ['', ValidatorExtention.required('Diện tích không được để trống')],
			giaTien: ['', ValidatorExtention.required('Giá tiền không được để trống')],
			moTa: ['', ValidatorExtention.required('Mô tả không được để trống')],

		})
	);
	const detailKhachO = async () => {
		
		console.log(myForm)
		if(props.idLoaiPhong){
			const rs = await DonDatApi.detailLoaiPhong(props.idLoaiPhong)
			myForm.patchValue(rs.data);
		}
		
	}

	
	const saveLoaiPhong = async () => {
		
		if(myForm.invalid) return;
		
		if(props.idLoaiPhong){
			await DonDatApi.updateLoaiPhong( myForm.value);
			console.log(myForm)
			await dialogService.alert('Cập nhật thành công');
			closeDialog();
			

		}else{
			await DonDatApi.addLoaiPhong(myForm.value);
			await dialogService.alert('Thêm thành công');
			closeDialog();
		}
		

	}

	const closeDialog = () => {
		props.onClose(hasChange);

	}
	useEffect(() => {
		detailKhachO();
	}, []);

	return AddRoomTypeView({myForm, closeDialog, saveLoaiPhong});
};

export default AddRoomType;
