import { FunctionComponent, useEffect, useState } from "react";
import AddGuestView from "./AddGuest.view";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { Value } from "sass";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { message } from "antd";

export const AddGuest: FunctionComponent<({

	idKhachO?: any,
	idLoaiPhong: any,
	idPhongDat: any,
	idDonDat?: any
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const { dialogService } = useDialog();

	const [messageApi, contextHolder] = message.useMessage();

	const [myForm] = useState<FormGroup>(

		FormBuilder.group({
			id: [props.idKhachO],
			idDonDat: [props.idDonDat],
			phongDatIdPhongDat: [props.idPhongDat],
			hoTen: ['', ValidatorExtention.required('Họ tên không được để trống')],
			soGiayTo: ['', ValidatorExtention.required('Số giấy tờ không được để trống')],
			tenGiayTo: ['', ValidatorExtention.required('Tên giấy tờ không được để trống')],
			quocTich: ['', ValidatorExtention.required('Quóc tịch không được để trống')],
		})
	);

	const inTuKhachO = async () => {

		if (props.idKhachO) {
			const rs = await DonDatApi.detailKhachO(props.idKhachO)
			myForm.patchValue(rs.data);
		}

	}

	const save = async () => {
		debugger;
		console.log(myForm.value)

		if (myForm.invalid) return;

		if (props.idKhachO) {
			try {
				await DonDatApi.updateKhachO(props.idKhachO, myForm.value);
				await dialogService.alert('Cập nhật thành công');

				closeDialog();
			} catch (error) {
				console.log(error)
			}

		} else {
			try {
				await DonDatApi.addKhachO(myForm.value.idDonDat, myForm.value);
				await dialogService.alert('Thêm thành công');

				closeDialog();
			} catch (error: any) {
				// alert(error.response.data)
				dialogService.alert(error.response.data);

			}

		}


	}

	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	useEffect(() => {
		// getData();
		inTuKhachO();

	}, []);


	return AddGuestView({ myForm, closeDialog, save, contextHolder });

};

export default AddGuest;
