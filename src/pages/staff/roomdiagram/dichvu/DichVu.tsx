import { FunctionComponent, useEffect, useState } from "react";
import DichVuView from "./DichVu.view";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const DichVu: FunctionComponent<({
  idPhongDat: any,
	idDichVu?: any,
	mode?: string,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {


	const [listOption, setOption] = useState<any[]>([]);

	const [listGioHang, setGioHang] = useState<any[]>([]);

	const [getTotal, setTotal] = useState<number>(0);

	const { dialogService } = useDialog();
	const [listData, setListData] = useState<any[]>([]);

	const getData = async (id?: any) => {

		const rs = await DonDatApi.locTheoDichVu(id);

		setListData(rs.data);

	}
	const formatNumber = (number: any) => {
		if (number !== undefined) {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
		return "";
	};

	const getOption = async () => {

		const rs = await DonDatApi.getLoaiDichVu();
		setOption(rs.data);


	}

	const getItemGioHangDv = () => {
		let gioHangDv = [];
		let giohangDvStore = localStorage.getItem("gioHangDv");
		if(giohangDvStore){
			gioHangDv = JSON.parse(giohangDvStore);
		}
		setGioHang([...gioHangDv])

	}

	const postAddGioHang = async (item: any) => {
		let gioHangDv = [];
		let giohangDvStore = localStorage.getItem("gioHangDv");
		if(giohangDvStore){
			gioHangDv = JSON.parse(giohangDvStore);
		}

		let data = {
			soLuong: 1,
			...item
		}

		let uniq = gioHangDv.find((g:any)=>g.id === item.id);

		if(uniq){
			uniq.soLuong += 1;
	
		}else{
			gioHangDv.push(data)
		}

		localStorage.setItem("gioHangDv", JSON.stringify(gioHangDv));

		getItemGioHangDv();

		// console.log(item)
	}

	// const dataOption = (data: any) => {
	// 	let options:any[] = [];
	// 	data.map((x:any) => {
	// 		options.push(x.loaiDichVuIdLoaiDichVu);
	// 	})
	// 	return options;
	// }

	const handleAddDichVu = async (hasChange: boolean = false) => {

    const mapData = listGioHang.map((item:any) => {
      return { 
        idDichVu: item.id, 
        soLuong: item.soLuong 
      };
    })

		let newData = {
      idPhongDat: props.idPhongDat,
      dichVuList: mapData
    } 

    await DonDatApi.addDatDichVu(newData);
    await dialogService.alert('Lưu dịch vụ thành công');
    localStorage.removeItem("gioHangDv");
		props.onClose(hasChange);
	}

	const chonDichVu = (id: any) => {
		getData(id)
	}
	const closeDialog = (hasChange : any) => {
		props.onClose(hasChange);
	}
	useEffect(() => {
		getData(props.idDichVu);
		getOption();
		getItemGioHangDv();

	}, []);
	return DichVuView({ closeDialog,handleAddDichVu,  listData, listOption, chonDichVu, postAddGioHang, formatNumber, listGioHang});
};

export default DichVu;
