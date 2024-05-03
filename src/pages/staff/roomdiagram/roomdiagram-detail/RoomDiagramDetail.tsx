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

export const RoomDiagramDetail: FunctionComponent <({
	idKhachO?: any,
	idPhongDat?: any,
	idLoaiPhong?: any,
	mode?: string,
	onClose: (hasChange: boolean) => void
})>  = (props: any) => {

	const { dataShareService } = useDataShare();

	const { dialogService } = useDialog();
	const { loadingService } = useLoading();
	// const [detailListData, setDetailListData] = useState<any[]>([]);

	const [detailData, setdetailData] = useState<any>();

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
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

	const handleOpenDialog = () => {
		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Chọn số phòng';
			option.size = DialogSize.small;
			option.content = (<LuuPhong idPhongDat={props.idPhongDat} idLoaiPhong={props.idLoaiPhong} onClose={(hasChange: boolean) => handleCloseDialogluuPhong(hasChange)} />)
		}); 
		

		const handleCloseDialogluuPhong = (hasChange: boolean) => {
			dialogService.closeDialog();

			if(hasChange){
				getData();
				dataShareService.setValue('hasChange01', true)
			}
		}
	}

	const handleCloseDialog = () => {
		props.onClose(dataShareService.getValue<boolean>('hasChange01'));
	}
	
	const handleOpenGuest = (item?:any) => {
		
		let idKhachO:any;

		if(item){
			idKhachO = item.idKhachO;
		}else{
			idKhachO = null;
		}
		
		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Thông tin khách ';
			option.size = DialogSize.small;
			option.content = (<AddGuest idPhongDat={myForm.get('idPhongDat').value} idKhachO={idKhachO} idLoaiPhong={myForm.get('idLoaiPhong').value}  onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});

		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();
	
			if(hasChange){
				// refesh data
				getData();
			}
		}
	}

	const deleteKhach = async (item?: any) => {
	
		if(item.idKhachO){
			loadingService.openLoading();
			await DonDatApi.deleteKhachO(item.idKhachO);
					// refesh data
			getData();

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
		}
	}

	const getData = async () => {
		
		const rs = await DonDatApi.getChiTietPhong(props.idPhongDat);

		let data = rs.data;

		myForm.patchValue({
		
			idPhongDat: data.idLoaiPhong,
			idLoaiPhong : data.idLoaiPhong,
			tenPhong: data.tenPhong,
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
			tenLoaiPhong: data.tenLoaiPhong,
			soTienPhong: data.soTienPhong
		});


		setdetailData(data.khachO);

	}
	
	// init page
	useEffect(() => {
		dataShareService.setValue('hasChange01', false);
		getData();
	}, []);

	return RoomDiagramDetailView({detailData,deleteKhach,handleOpenGuest , handleCloseDialog,handleOpenDialog,  myForm, getData});
};

export default RoomDiagramDetail;
