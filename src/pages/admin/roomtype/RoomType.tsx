import { FunctionComponent, useEffect, useState } from "react";
import RoomTypeView from "./RoomType.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import AddRoomType from "../addroomtype/AddRoomType";
import { useLoading } from "src/common/services/loading/Loading.provider";
import HinhAnh from "./hinhanh/HinhAnh";

export const RoomType: FunctionComponent  = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const [hasChange, setHasChange] = useState<boolean>(false);

	const { dialogService } = useDialog();

	const { loadingService } = useLoading();


	const handleOpenDialog = ( item: any) => {
		// gan phong
		dialogService.openDialog(option => {

			
			option.title = item ? "Sửa phòng" : "Thêm phòng";
			option.size = DialogSize.small;
			option.content = (<AddRoomType idLoaiPhong ={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
			//closeDialog();
		}
	}

	const handleOpenHinhAnh = ( item: any) => {
		console.log(item)
		// gan phong
		dialogService.openDialog(option => {

			
			option.size = DialogSize.medium;
			option.content = (<HinhAnh idLoaiPhong ={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
			//closeDialog();
		}
	}

	

	const deleteLoaiPhong = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}

		try {
			if (item.id) {
				
				await DonDatApi.deleteLoaiPhong(item.id);
				// refesh data
				await dialogService.alert('Xóa thành công');
				await getData();
				
			}
		} catch (error: any) {
				dialogService.alert(error.response.data)
		}
		
	}

	const getData = async () => {
		loadingService.openLoading();
		const rs = await DonDatApi.getLoaiPhong();
		loadingService.closeLoading();
		setListData(rs.data);
	}
	const closeDialog = () => {
		props.onClose(hasChange);

	}
	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};
	useEffect(() => {
		getData();
	}, []);

	return RoomTypeView({listData , closeDialog ,handleOpenDialog, formatNumber, deleteLoaiPhong, handleOpenHinhAnh});
	
};

export default RoomType;
