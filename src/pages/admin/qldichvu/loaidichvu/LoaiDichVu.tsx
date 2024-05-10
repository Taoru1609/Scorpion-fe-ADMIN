import { FunctionComponent, useEffect, useState } from "react";
import LoaiDichVuView from "./LoaiDichVu.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import ThemLoaiDichVu from "./themloaidichvu/ThemLoaiDichVu";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const LoaiDichVu: FunctionComponent = (props: any) => {
	const [listData, setListData] = useState<any[]>([]);
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();


	const handleOpenDialog = ( item: any) => {
		// gan phong
		dialogService.openDialog(option => {
			option.title = item ? "Sửa loại dịch vụ" : "Thêm loại dịch vụ";
			option.size = DialogSize.small;
			option.content = (<ThemLoaiDichVu idLoaiDichVu={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});

		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
			//closeDialog();
		}
	}
	
	
	const deleteLoaiDichVu = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.id) {
			loadingService.openLoading();
			
			await DonDatApi.deleteLoaiDichVu(item.id);
			// refesh data

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			await getData();
		}
	}
	const getData = async () => {
		loadingService.openLoading();

		const rs = await DonDatApi.getLoaiDichVu();
		loadingService.closeLoading();

		setListData(rs.data);
	}


	useEffect(() => {
		getData();
	}, []);
	return LoaiDichVuView({listData, handleOpenDialog, deleteLoaiDichVu});
};

export default LoaiDichVu;
