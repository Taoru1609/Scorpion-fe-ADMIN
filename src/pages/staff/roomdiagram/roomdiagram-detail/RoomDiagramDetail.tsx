import { FunctionComponent, useEffect, useState } from "react";
import RoomDiagramDetailView from "./RoomDiagramDetail.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import AddRoom from "../../addroom/AddRoom";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import LuuPhong from "../luuphong/LuuPhong";
import AddGuest from "../../addguest/AddGuest";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { message } from "antd";
import HoaDon from "../hoadon/HoaDon";
import DichVu from "../dichvu/DichVu";
import UpdateDichVu from "../dichvu/updateDichVu/UpdateDichVu";

export const RoomDiagramDetail: FunctionComponent<({
	idDichVuDat?: any,
	idKhachO?: any,
	idDonDat?: any,
	idPhongDat?: any,
	idLoaiPhong?: any,
	mode?: string,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const { dataShareService } = useDataShare();

	const { dialogService } = useDialog();
	const { loadingService } = useLoading();
	// const [detailListData, setDetailListData] = useState<any[]>([]);

	const [detailData, setdetailData] = useState<any>();

	const [listDataDV, setListDataDV] = useState<any>();


	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idDonDat: [null],
			idDichVuDat: [null],
			idKhachO: [null],
			idPhongDat: [null],
			idLoaiPhong: [null],
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			soTienPhong: [null, Validators.required],
			tenPhong: [null, Validators.required],
			tenLoaiPhong: [null, Validators.required]
		})
	);



	///api trả phòng
	const postCheckOut = async () => {
		loadingService.openLoading();

		// const result = dialogService.confirm('Bạn có muốn trả phòng không')

		await DonDatApi.postCheckOut(props.idDonDat, props.idPhongDat);
		loadingService.closeLoading();

		await dialogService.alert('Trả phòng thành công');
		getData();


		dataShareService.setValue('hasChange03', true);
		closeDialog();

		dialogService.openDialog(option => {
			option.size = DialogSize.medium;
			option.content = (<HoaDon idDonDat={props.idDonDat} idPhongDat={props.idPhongDat} onClose={(hasChange: boolean) => handleCloseDialogHoaDon(hasChange)} />)
		});


	}

	//handle update dịch vụ
	const handleOpenUpdateDichVu = (item: any) => {

		dialogService.openDialog(option => {

			option.size = DialogSize.small;
			option.content = (<UpdateDichVu item={item } onClose={(hasChange) => handleCloseDialog(hasChange)} />)

		});

		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
		}
	}


	const handleCloseDialogHoaDon = (hasChange: boolean) => {
		dialogService.closeDialog();

		if (!hasChange) {
			// refesh data
			getData();
		}

	}


	const closeDialog = () => {
		props.onClose(dataShareService.getValue<boolean>('hasChange03'));
	}


	//mở trang lưu phòng
	const handleOpenDialog = () => {


		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Chọn số phòng';
			option.size = DialogSize.small;
			option.content = (<LuuPhong idPhongDat={props.idPhongDat} idLoaiPhong={props.idLoaiPhong} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {


			dialogService.closeDialog();

			if (hasChange) {
				// refesh data
				getData();
			}

		}
	}

	const handleCloseDialog = () => {
		props.onClose(dataShareService.getValue<boolean>('hasChange01'));
	}

	//Handle mở trang dịch vụ
	const handleOpenDialogDichVu = () => {


		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Thêm dịch vụ';
			option.size = DialogSize.medium;
			option.content = (<DichVu idDichVu={props.idDichVu} idPhongDat={props.idPhongDat} onClose={(hasChange: boolean) => handleCloseDialogDichVu(hasChange)} />)
		});
	}

	const handleCloseDialogDichVu = (hasChange: boolean) => {


		dialogService.closeDialog();
		if (!hasChange) {
			// refesh data
			getData();
		}

	}

	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};


	//mở trang thêm khách
	const handleOpenGuest = (item?: any) => {


		let idKhachO: any;


		if (item) {
			idKhachO = item.idKhachO;
		} else {
			idKhachO = null;
		}

		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Thông tin khách ';
			option.size = DialogSize.small;
			option.content = (<AddGuest idPhongDat={myForm.get('idPhongDat').value} idKhachO={idKhachO} idLoaiPhong={myForm.get('idLoaiPhong').value} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});

		const handleCloseDialog = (hasChange: boolean) => {


			dialogService.closeDialog();

			if (!hasChange) {
				// refesh data
				getData();
			}

		}
	}

	//xóa khách
	const deleteKhach = async (item?: any) => {

		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}

		if (item.idKhachO) {
			loadingService.openLoading();
			await DonDatApi.deleteKhachO(item.idKhachO);


			// refesh data
			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			getData();


		}
	}
	//Xóa dịch vụ
	const handleDeleteDichVu = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.idDichVuDat) {
			loadingService.openLoading();
			await DonDatApi.deleteDichVu(item.idDichVuDat);


			// refesh data
			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			getData();


		}
	}


	//get Dâta
	const getData = async () => {

		const rs = await DonDatApi.getChiTietPhong(props.idPhongDat);

		let data = rs.data;

		myForm.patchValue({
			idDichVuDat: data.idDichVuDat,
			idDonDat: data.idDonDat,
			idPhongDat: data.idPhongDat,
			idLoaiPhong: data.idLoaiPhong,
			tenPhong: data.tenPhong,
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
			tenLoaiPhong: data.tenLoaiPhong,
			soTienPhong: data.soTienPhong
		});


		setdetailData(data.khachO);
		setListDataDV(data.dichVuDat);

	}

	// init page
	useEffect(() => {
		dataShareService.setValue('hasChange01', false);
		dataShareService.setValue('hasChange03', false);



		getData();
	}, []);

	return RoomDiagramDetailView({ detailData, listDataDV, handleOpenUpdateDichVu, handleDeleteDichVu, deleteKhach, handleOpenGuest, handleOpenDialogDichVu, handleCloseDialogHoaDon, formatNumber, handleCloseDialog, handleOpenDialog, postCheckOut, myForm, getData });
};

export default RoomDiagramDetail;
