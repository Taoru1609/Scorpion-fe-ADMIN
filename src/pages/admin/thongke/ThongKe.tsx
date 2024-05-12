import { FunctionComponent, useEffect, useState } from "react";
import ThongKeView from "./ThongKe.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useLoading } from "src/common/services/loading/Loading.provider";

interface ThongKeNode {
	xData: any[],
	columnData: any[]
}

export const ThongKe: FunctionComponent = (props: any) => {
	const [listData, setListData] = useState<any[]>([]);
	const [xData, setXData] = useState<any>();
	const [columnData, setColumnData] = useState<any>();

	const { loadingService } = useLoading();

	const getData = async () => {
		loadingService.openLoading();
		const rs = await DonDatApi.getBangThongKe();
		loadingService.closeLoading();

		const { xData, columnData } = defineNode(rs.data)
		
		setListData(rs.data);
		setXData(xData)
		setColumnData(columnData);
	}

	const defineNode = (data:any) => {
		let nodeData:ThongKeNode = {
			xData: [],
			columnData: []
		};

		if(data.length > 0){
			let xData = data.map((x:any) => {
				return x.thoiGian;
			}) 
	
			let soLuongPhongDaDung = data.map((x:any) => {
				return x.soLuongPhongDaDung;
			})

			let soLuongPhongTrong = data.map((x:any) => {
				return x.soLuongPhongTrong;
			})
	
			let nodeValue = [
				{
					name: "Phòng đã sử dụng",
					data: soLuongPhongDaDung,
				},
				{
					name: "Phòng chưa sử dụng",
					data: soLuongPhongTrong,
				},
			]

			nodeData = {
				xData: xData,
				columnData: nodeValue
			};
		}
		
		return nodeData;
		
	}


	useEffect(() => {
		getData();
	}, []);

	return ThongKeView({listData, xData, columnData});
};

export default ThongKe;
