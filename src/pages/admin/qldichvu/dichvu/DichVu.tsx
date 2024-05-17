import { FunctionComponent, useEffect, useState } from "react";
import DichVuView from "./DichVu.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import DichVuAdd from "./dichvuadd/DichVuAdd";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const DichVu: FunctionComponent = (props: any) => {

	const [listOption, setOption] = useState<any[]>([]);
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();

	const [listData, setListData] = useState<any[]>([]);
	
	const getData = async (id?: any) => {
		loadingService.openLoading();
		const rs = await DonDatApi.locTheoDichVu(id);
		loadingService.closeLoading();
		setListData(rs.data);

	}
	const handleOpenDialog = ( item: any) => {
		// gan phong
		dialogService.openDialog(option => {
			option.title = item ? "Sửa dịch vụ" : "Thêm dịch vụ";
			option.size = DialogSize.small;
			option.content = (<DichVuAdd id={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
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

		
		const rs = await DonDatApi.getLoaiDichVu();
		let newOption = [
			{
				tenLoaiDichVu: "Tất cả",
				id: null
			},
			...rs.data
		];

		setOption(newOption);


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

	return DichVuView({listData,listOption,chonDichVu,  formatNumber, handleOpenDialog});

};

export default DichVu;
