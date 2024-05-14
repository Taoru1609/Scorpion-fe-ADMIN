import { FunctionComponent, useEffect, useState } from "react";
import AddTaiKhoanAdView from "./AddTaiKhoanAd.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const AddTaiKhoanAd: FunctionComponent <({

	id?: any
	
	onClose: (hasChange: boolean) => void
})> = (props: any) => {
	const [hasChange, setHasChange] = useState<boolean>(false);
	const { loadingService } = useLoading();
	const { dialogService } = useDialog();

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			id : [ null],
			quyenHanIdQuyenHan: [{id : 1}],
			hoTen: ['', ValidatorExtention.required('Họ tên không được để trống')],
			email: ['', ValidatorExtention.required('Email không được để trống')],
			cccd: ['', ValidatorExtention.required('Căn cước công dân không được để trống')],
			soDienThoai: ['', ValidatorExtention.required('Số điện thoại không được để trống')],
			tenTaiKhoan: ['', ValidatorExtention.required('Nick name không được để trống')],
			matKhau: ['', ValidatorExtention.required('Mật khẩu không được để trống')],

		})
	);
	const saveTaiKhoan = async () => {

		if(myForm.invalid) return;
	

		if(props.id){
			loadingService.openLoading();
			await DonDatApi.updateTaiKhoan(myForm.value);
			loadingService.closeLoading();
			await dialogService.alert('Cập nhật thành công');
			closeDialog();			

		}else{
			loadingService.openLoading();
			await DonDatApi.addTaiKhoan(myForm.value);
			loadingService.closeLoading();
			await dialogService.alert('Thêm thành công');
			closeDialog();
		}
		

	}

	const detailTaiKhoan = async () => {
		
		console.log(myForm)
		if(props.id){
			loadingService.openLoading();
			const rs = await DonDatApi.detailTaiKhoan(props.id)
			loadingService.closeLoading();
			myForm.patchValue(rs.data);
		}
		
	}
	const closeDialog = () => {
		props.onClose(hasChange);
	}

	useEffect(() => {
		detailTaiKhoan();
	}, []);

	return AddTaiKhoanAdView({myForm,closeDialog, saveTaiKhoan});
};

export default AddTaiKhoanAd;
