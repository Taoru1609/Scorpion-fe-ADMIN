import { FunctionComponent, useEffect, useState } from "react";
import ThongKeView from "./ThongKe.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useLoading } from "src/common/services/loading/Loading.provider";


export const ThongKe: FunctionComponent = (props: any) => {
	const [listData, setListData] = useState<any[]>([]);
	const { loadingService } = useLoading();

	const getData = async () => {
		loadingService.openLoading();
		const rs = await DonDatApi.getBangThongKe();
		loadingService.closeLoading();
		setListData(rs.data);
	}


	useEffect(() => {
		getData();
	}, []);
	return ThongKeView({listData});
};

export default ThongKe;
