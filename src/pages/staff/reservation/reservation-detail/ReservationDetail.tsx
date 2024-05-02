import { FunctionComponent, useEffect, useState } from "react";
import ReservationDetailView from "./ReservationDetail.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import CheckIn from "../check-in/CheckIn";

export const ReservationDetail: FunctionComponent<({
	id?: string,
	mode?: string,
	onClose: (hasChange: boolean) => void
})> = (props) => {
	const { dialogService } = useDialog();

	const { dataShareService } = useDataShare();

	const [listData, setListData] = useState<any[]>([]);

	const [hasChange, setHasChange] = useState<boolean>(false);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			tienPhong: [null, Validators.required],
			hoTen: [null, Validators.required],
			ngaySinh: [null, Validators.required],
			soDienThoai: [null, Validators.required],
			email: [null, Validators.required],
			quocTich: [null, Validators.required],
			gioiTinh: [null, Validators.required],
			diaChi: [null, Validators.required]
		})
	);



	const closeDialog = () => {
		props.onClose(hasChange);
	}

	const getData = async () => {
		debugger;
		const rs = await DonDatApi.getOne(props.id);
		console.log('getData', rs);
		
		let data = rs.data[0];

		setListData(data.loaiphongDat);
		myForm.patchValue({
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
			tienPhong: data.tienPhong,
			hoTen: data.ten,
			ngaySinh: data.ngaySinh,
			soDienThoai: data.sdt,
			email: data.email,
			quocTich: data.quocTich,
			gioiTinh: data.gioiTinh,
			diaChi: data.diaChi
		})
	}

	const handleOpenDialog = () => {
		dialogService.openDialog(option => {
			option.title = 'Check In';
			option.size = DialogSize.medium;
			option.content = (<CheckIn id={props.id}  onClose={(event) => handleCloseDialog(event)} />)
		});
	}

	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		closeDialog();
	}

	// init page
	useEffect(() => {
		if (props.mode === 'view') myForm.disable();
		getData();
	}, []);


	return ReservationDetailView({ mode: props.mode, myForm, listData, closeDialog, handleOpenDialog });
};

export default ReservationDetail;
