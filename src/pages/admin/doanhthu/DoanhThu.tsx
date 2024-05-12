import { FunctionComponent, useEffect, useState } from "react";
import DoanhThuView from "./DoanhThu.view";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { DonDatApi } from "src/common/api/DonDatApi";

interface DoanhThuNode {
	xData: any[],
	columnData: any[]
}

export const DoanhThu: FunctionComponent = (props: any) => {
	const [listOption, setOption] = useState<any[]>([]);
	const [listData, setListData] = useState<any[]>([]);

	const [xData, setXData] = useState<any>();
	const [columnData, setColumnData] = useState<any>();

	const dropdownItems = [
		{ text: "Tuần", value: 1},
		{ text: "Tháng", value: 2},
		{ text: "Năm", value: 3},
	]
	
	const [dropdown, setDropdown] = useState<any[]>(dropdownItems);

	const { dialogService } = useDialog();
	const { loadingService } = useLoading();

	const getData = async (id?: any) => {
		loadingService.openLoading();
		const rs = await DonDatApi.locDoanhThu(id ? id : 1);
		loadingService.closeLoading();

		const { doanhThu } = rs.data[0];

		const { xData, columnData } = defineNode(doanhThu, id);

		setXData(xData)
		setColumnData(columnData);

		setListData(rs.data);

	}

	const defineNode = (doanhThu:any[], id:any) => {
		let nodeData:DoanhThuNode = {
			xData: [],
			columnData: []
		};
		
		if(doanhThu.length > 0){

			let text:any = "";
			let xData:any = [];
			let tongDoanhThu:any = [];

			doanhThu.forEach((x:any) => {
				xData.push(x.thoiGian);
				tongDoanhThu.push(x.tongDoanhThu);
			})

			const mergeData: any[] = xData.map((day:any, index:any) => ({ day, value: tongDoanhThu[index] }));

			const defineData: any[] = mergeData.sort((a, b) => {
				return xData.indexOf(a.day) - xData.indexOf(b.day);
			});

			const thoiGian = defineData.map((x:any) => {
				if(id === 2){text = "Tuần "}else 
				if(id === 3){text = "Tháng "}

				return `${text }${x.day}`
			})

			const value = defineData.map((x:any) => {
				return x.value
			})

			
	
			let nodeValue = [
				{
					name: `Doanh thu`,
					data: value,
				},
			]

			nodeData = {
				xData: thoiGian,
				columnData: nodeValue
			};
			
		}
		
		return nodeData;
		
	}

	const getOption = async () => {
		const rs = await DonDatApi.getLoaiDichVu();
		setOption(rs.data);
	}

	const chonDichVu = (id: any) => {
		getData(id)
	}

	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};

	useEffect(() => {
		getOption();
		getData();
	}, []);
	return DoanhThuView({chonDichVu, formatNumber, listData, listOption, dropdown, xData, columnData});
};

export default DoanhThu;
