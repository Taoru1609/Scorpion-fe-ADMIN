import { FunctionComponent, useEffect, useState } from "react";
import AddGuestView from "./AddGuest.view";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { Value } from "sass";
import { ValidatorExtention } from "src/common/ValidatorExtention";

export const AddGuest: FunctionComponent <({
	
	idKhachO?: any,
	idLoaiPhong: any,
	idPhongDat: any,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const { dialogService } = useDialog();
	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			id: [props.idKhachO],
			phongDatIdPhongDat: [props.idPhongDat],
			hoTen: ['', ValidatorExtention.required('Họ tên không được để trống')],
			soGiayTo: ['', ValidatorExtention.required('Số giấy tờ không được để trống')],
			tenGiayTo: ['', ValidatorExtention.required('Tên giấy tờ không được để trống')],
			quocTich: ['', ValidatorExtention.required('Quóc tịch không được để trống')],
		})
	);

	const inTuKhachO = async () => {
	
		if(props.idKhachO){
			const rs = await DonDatApi.detailKhachO(props.idKhachO)
			myForm.patchValue(rs.data);
		}
		
	}

	const save = async () => {
		debugger;
		console.log(myForm.value)
	
		if(myForm.invalid) return;

		if(props.idKhachO){
			await DonDatApi.updateKhachO(props.idKhachO, myForm.value);
			await dialogService.alert('Cập nhật thành công');
		}else{
			await DonDatApi.addKhachO(myForm.value);
			await dialogService.alert('Thêm thành công');
		}

		closeDialog(); 

	}


	
	// const getData = async () => {
	// 	debugger;
	// 	const rs = await DonDatApi.getOne(props.id);
	// 	console.log('getData', rs);
		
	// 	let data = rs.data[0];

	// 	setListData(data.loaiphongDat);
	// 	myForm.patchValue({
	// 		hoTen: data.hoTen,
	// 		cccd: data.cccd,
	// 		tenGiayTo: data.tenGiayTo,
	// 		quocTich: data.quocTich,
	
	// 	})
	// }

	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	useEffect(() => {
		// getData();
		inTuKhachO();
	}, []);

	return AddGuestView({myForm, closeDialog, save});
};

export default AddGuest;
