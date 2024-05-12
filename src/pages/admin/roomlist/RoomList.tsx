import { FunctionComponent, useEffect, useState } from "react";
import RoomListView from "./RoomList.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import AddRoomList from "./addroomlist/AddRoomList";

export const RoomList: FunctionComponent = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const [listOption, setOption] = useState<any[]>([]);
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();


	const getData = async (id?: any) => {
		
		loadingService.openLoading();
		const rs = await DonDatApi.locPhong(id);
		loadingService.closeLoading();
		setListData(rs.data);

	}

	const handleOpenDialog = ( item: any) => {
		// gan phong
		dialogService.openDialog(option => {
			option.title = item ? "Sửa phòng" : "Thêm phòng";
			option.size = DialogSize.small;
			option.content = (<AddRoomList id={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
			//closeDialog();
		}
	}
	const getOption = async () => {

		const rs = await DonDatApi.getLoaiPhong();
		let newOption = [
			{
				tenLoaiPhong: "Tất cả",
				id: null
			},
			...rs.data
		];

		setOption(newOption);


	}
	const deletePhong = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.id) {
			loadingService.openLoading();
			
			await DonDatApi.deletePhong(item.id);
			// refesh data
			

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			await getData();
		}
	}
	const chonDichVu = (id: any) => {
		getData(id)
	}


	useEffect(() => {
		getOption();
		getData();
	}, []);

	return RoomListView({listData, listOption, chonDichVu,deletePhong, handleOpenDialog});
};

export default RoomList;
