import { FunctionComponent, useEffect, useState } from "react";
import ReservationDetailView from "./ReservationDetail.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import CheckIn from "../check-in/CheckIn";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const ReservationDetail: FunctionComponent<({
	id?: string,
	mode?: string,
	trangThai?: any,
	onClose: (hasChange: boolean) => void
})> = (props) => {
	const { dialogService } = useDialog();

	const { dataShareService } = useDataShare();

	const { loadingService } = useLoading();

	const [listData, setListData] = useState<any[]>([]);

	const [getStatus, setStatus] = useState<any>();


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
			diaChi: [null, Validators.required],
			ghiChu: [null, Validators.required]

		})
	);



	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	const getData = async () => {
		
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
			gioiTinh: data.gioiTinh? 'Nam' : 'Nữ',
			diaChi: data.diaChi,
			ghiChu: data.ghiChu

		})
		setStatus(props.trangThai)

	}

	const handleOpenDialog = () => {
		
		dialogService.openDialog(option => {
			option.title = 'Check In';
			option.size = DialogSize.medium;
			option.content = (<CheckIn id={props.id} trangThai={props.trangThai} onClose={(event) => handleCloseDialog(event)} />)
		});
	}

	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		closeDialog(hasChange);
		getData();
	}

	const huyPhong = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn hủy phòng không?');
		if (!result) {
			return;
		}
	
			loadingService.openLoading();
			
			await DonDatApi.huyPhong(props.id);
			// refesh data

			loadingService.closeLoading();

			await dialogService.alert('Hủy phòng thành công');
			await getData();
		
		closeDialog();
	}

	// init page
	useEffect(() => {
		if (props.mode === 'view') myForm.disable();
		getData();
	}, []);


	return ReservationDetailView({ mode: props.mode, getStatus, myForm, listData, closeDialog, handleOpenDialog, huyPhong });
};

export default ReservationDetail;
