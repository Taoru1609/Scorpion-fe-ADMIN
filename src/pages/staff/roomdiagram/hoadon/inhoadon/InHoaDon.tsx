import { FunctionComponent, useEffect, useState } from "react";
import InHoaDonView from "./InHoaDon.view";
import { useSearchParams } from "react-router-dom";
import { DonDatApi } from "src/common/api/DonDatApi";
import { setTimeout } from "timers/promises";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const InHoaDon: FunctionComponent = (props: any) => {

	const [searchParams] = useSearchParams();

	const [detailData, setdetailData] = useState<any>();
	const [dichVuData, setDichVuData] = useState<any>();
	const [total, setTotal] = useState<any>();

	const { loadingService } = useLoading();

	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};

	const callbackFunction = () => {
		window.print()
	}

	const getInHoaDon = async () => {
		loadingService.openLoading();
		const idHoaDon = searchParams.get('idHoaDon');
		const rs = await DonDatApi.inHoaDon(idHoaDon);
		
		if(rs.status === 200){
			loadingService.closeLoading();
		}

		setdetailData(rs.data);
		setDichVuData(rs.data[0].dichVuDat)
		setTotal(rs.data[0].tongTien)
	}

	useEffect(() => {
		getInHoaDon();
	
	}, []);

	return InHoaDonView({ detailData, dichVuData, total ,formatNumber, callbackFunction});
};

export default InHoaDon;
