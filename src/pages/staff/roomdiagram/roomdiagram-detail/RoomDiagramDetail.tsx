import { FunctionComponent, useEffect, useState } from "react";
import RoomDiagramDetailView from "./RoomDiagramDetail.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import AddRoom from "../../addroom/AddRoom";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import LuuPhong from "../luuphong/LuuPhong";

export const RoomDiagramDetail: FunctionComponent <({
	idPhongDat?: any,
	idPhong?: any,
	mode?: string,
	onClose: (hasChange: boolean) => void
})>  = (props: any) => {

	const [hasChange, setHasChange] = useState<boolean>(false);
	const { dialogService } = useDialog();


	const [detailData, setdetailData] = useState<any>();

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idPhongDat: [null],
			idPhong: [null],
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			soTienPhong: [null, Validators.required],
			tenPhong: [null, Validators.required],
			tenLoaiPhong: [null, Validators.required]
		})
	);

	const handleOpenDialog = ( ) => {

		// gan phong
		dialogService.openDialog(option => {
			option.title = 'Chọn số phòng';
			option.size = DialogSize.small;
			option.content = (<LuuPhong idPhongDat={props.idPhongDat} idPhong={props.idPhong} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});
	}

	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();

		if(!hasChange){
			getData();
		}
		// closeDialog();
	}


	const getData = async () => {
		
		const rs = await DonDatApi.getChiTietPhong(props.idPhongDat);

		let data = rs.data;

		myForm.patchValue({
			idPhongDat: data.idLoaiPhong,
			idPhong : data.idPhong,
			tenPhong: data.tenPhong,
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
			tenLoaiPhong: data.tenLoaiPhong,
			soTienPhong: data.soTienPhong
		});

		console.log(data)

		setdetailData(rs.data);

	}
	
	useEffect(() => {
		getData();
	}, []);

	const closeDialog = () => {
		props.onClose(hasChange);
		
	}

	return RoomDiagramDetailView({closeDialog , handleCloseDialog,handleOpenDialog,  myForm});
};

export default RoomDiagramDetail;
