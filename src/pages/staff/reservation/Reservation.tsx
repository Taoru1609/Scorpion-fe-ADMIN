import { FunctionComponent, useEffect, useState } from "react";
import ReservationView from "./Reservation.view";
import { FormGroup, FormBuilder } from "react-reactive-form";
import { PagingModal } from "src/common/model/PagingModal";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import ReservationDetail from "./reservation-detail/ReservationDetail";

export const Reservation: FunctionComponent = (props: any) => {
	// use các service cần sử dụng
	const { dialogService } = useDialog();

	const { loadingService } = useLoading();

	// const { dataShareService } = useDataShare();

	const [listData, setListData] = useState<any[]>([]);

	const [paging, setPaging] = useState<PagingModal>(new PagingModal());

	const [formSearch] = useState<FormGroup>(
		FormBuilder.group({
			q: ['']
		})
	);

	const getData = async () => {
		if (formSearch.invalid) return;

		const formData = formSearch.getRawValue();

		loadingService.openLoading();
		const rs:any = await DonDatApi.getAll({sdt: formData.q});
		setListData(rs.data.map((x:any)=>{
			
			x.hoTen = x.thongTinKhachDatIdKhachDat.hoTen;
			x.soDienThoai = x.thongTinKhachDatIdKhachDat.soDienThoai;
			
			return x;
		}));
		// setPaging(rs.paging);
		loadingService.closeLoading();

	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		formSearch.markAllAsTouched();
		if (formSearch.invalid) return;

		// refesh về trang 1
		paging.page = 1;
		getData();
	}

	const handleOpenDialog = (mode: string = 'add', item: any = null) => {
		dialogService.openDialog(option => {
			option.title = mode === 'view' ? 'Thông tin phòng đặt' : 'Thêm dữ liệu';
			if (mode === 'edit') option.title = 'Sửa dữ liệu';
			option.size = DialogSize.tab;
			option.content = (<ReservationDetail id={item.id} mode={mode} onClose={(event) => handleCloseDialog(event)} />)
		});
	}

	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		if (!hasChange) {
			// có thay đổi dữ liệu refesh data tại trang hiện tại
			getData();
		}
	}

	// init page
	useEffect(() => {
		getData();
	}, []);

	return ReservationView({ formSearch, listData, paging, getData, handleSubmit, handleOpenDialog, handleCloseDialog, setPaging });
};

export default Reservation;
