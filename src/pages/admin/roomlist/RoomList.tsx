import { FunctionComponent, useEffect, useState } from "react";
import RoomListView from "./RoomList.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

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
	const getOption = async () => {

		const rs = await DonDatApi.getLoaiPhong();
		setOption(rs.data);


	}
	const chonDichVu = (id: any) => {
		getData(id)
	}


	useEffect(() => {
		getOption();
		getData();
	}, []);

	return RoomListView({listData, listOption, chonDichVu});
};

export default RoomList;
