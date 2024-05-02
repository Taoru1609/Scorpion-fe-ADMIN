import { FunctionComponent, useEffect, useState } from "react";
import AddGuestView from "./AddGuest.view";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import { DonDatApi } from "src/common/api/DonDatApi";

export const AddGuest: FunctionComponent <({
	idLoaiPhong: any,
	idPhongDat: any,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const [hasChange, setHasChange] = useState<boolean>(false);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			hoTen: [null, Validators.required],
			soGiayTo: [null, Validators.required],
			tenGiayTo: [null, Validators.required],
			quocTich: [null, Validators.required],
		})
	);

	const save = async () => {

		if(myForm.invalid) return;

		console.log(myForm)
		// let message;
		// let create = await donDatApi.addGuests(myform.value);
		// let update = await donDatApi.editGuests(id, myform.value);

		// if(id){
		// 	message = "Cập nhật thành công";
		// 	return update;
		// }else{
		// 	message = "Thêm mới thành công";
		// 	return create;
		// }

		// messageDialog.alert({
		// 	text: message
		// })
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
	const closeDialog = () => {
		props.onClose(hasChange);
	}

	// useEffect(() => {
	// 	getData();
	// }, []);

	return AddGuestView({myForm, closeDialog, save});
};

export default AddGuest;
