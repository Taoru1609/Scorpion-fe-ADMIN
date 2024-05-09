import { FunctionComponent, useEffect, useState } from "react";
import CheckInView from "./CheckIn.view";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { DonDatApi } from "src/common/api/DonDatApi";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import AddRoom from "../../addroom/AddRoom";
import AddGuest from "../../addguest/AddGuest";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const CheckIn: FunctionComponent<({
	id?: string,
	onClose: (hasChange: boolean) => void
})> = (props) => {

	const [selected, setSelected] = useState(false);

	const { dialogService } = useDialog();

	const { loadingService } = useLoading();

	const { dataShareService } = useDataShare();

	const [listData, setListData] = useState<any[]>([]);

	const [detailListData, setDetailListData] = useState<any[]>([]);

	const [hasChange, setHasChange] = useState<boolean>(false);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idLoaiPhong: [null],
			idPhongDat: [null],
			tenLoaiPhong: [null, Validators.required],
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			soTienPhong: [null, Validators.required],
			tenPhong: [null, Validators.required],
		})
	);

	const postCheckIn = async (item: any) => {
		const rs = await DonDatApi.postCheckIn(item.idPhongDat);

		setHasChange(true);
		await dialogService.alert('Check in thành công');
		getData();
	}

	const closeDialog = () => {
		props.onClose(hasChange);

	}


	const handleOpenDialog = () => {

		if (selected === false) {
			dialogService.alert('Vui lòng chọn thao tác phòng trước');
			return;
		}
		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Chọn số phòng';
			option.size = DialogSize.small;
			option.content = (<AddRoom idPhongDat={myForm.get('idPhongDat').value} idLoaiPhong={myForm.get('idLoaiPhong').value} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});

		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (hasChange) {
				getData();
			}
			//closeDialog();
		}
	}

	const handleOpenGuest = (item?: any) => {

		if (selected === false) {
			dialogService.alert('Vui lòng chọn thao tác phòng trước');
			return;
		}
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
				getPhongDaChon({ idPhongDat: myForm.get('idPhongDat').value });
			}
		}
	}
	//handle xóa khách
	const deleteKhach = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.idKhachO) {
			loadingService.openLoading();
			await DonDatApi.deleteKhachO(item.idKhachO);
			// refesh data
			await getPhongDaChon({ idPhongDat: myForm.get('idPhongDat').value });

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
		}
	}

	const getDataDetail = async (item: any) => {
		const rs = await DonDatApi.getDetailPhongDat(item.idPhongDat);
		const { khachO } = rs.data;

		setDetailListData(khachO);
	}

	const getPhongDaChon = async (item: any) => {
		loadingService.openLoading();
		const rs = await DonDatApi.getDetailPhongDat(item.idPhongDat);

		const { khachO } = rs.data;

		setDetailListData(khachO);

		let data = {
			tienLoaiPhong: calculatePrice(convertDate(rs.data.thoiGianRa), convertDate(rs.data.thoiGianVao), rs.data.tienLoaiPhong),
			...rs.data
		};


		myForm.patchValue(data);
		setSelected(true);

		loadingService.closeLoading();
	}

	const checkIn = async (item: any) => {

		console.log('checkIn');
	}



	const convertDate = (dateString: any) => {
		const parts = dateString?.split("/");
		if (parts?.length === 3) {
			const [day, month, year] = parts;
			// Đảo ngược thứ tự và nối lại với dấu "-"
			return `${year}-${month}-${day}`;
		} else {
			return null; // Trả về null nếu định dạng không hợp lệ
		}
	};


	const calculatePrice = (checkInDate: any, checkOutDate: any, pricePerDay: any) => {

		const startDate = new Date(checkInDate);
		const endDate = new Date(checkOutDate);

		// Chuyển đổi ngày thành timestamp (milliseconds)
		const startTimestamp = startDate.getTime();
		const endTimestamp = endDate.getTime();

		// Số mili giây trong 1 ngày
		const oneDay = 1000 * 60 * 60 * 24;

		// Tính số ngày giữa hai ngày
		const numberOfDays = Math.round((endTimestamp - startTimestamp) / oneDay);

		// Tính tổng giá tiền
		const totalPrice = numberOfDays * pricePerDay;

		return totalPrice;
	};


	const getData = async () => {
		const rs = await DonDatApi.getPhongDat(props.id);

		console.log('getData', rs);

		setListData(rs.data);
	}

	useEffect(() => {
		getData();
	}, []);

	return CheckInView({ listData, detailListData, myForm, selected, closeDialog, handleOpenGuest, getPhongDaChon, handleOpenDialog, postCheckIn, checkIn, deleteKhach });
};

export default CheckIn;
