import { FunctionComponent, useEffect, useState } from "react";
import TaiKhoanAdminView from "./TaiKhoanAdmin.view";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import AddTaiKhoanAd from "./addtaikhoan/AddTaiKhoanAd";

export const TaiKhoanAdmin: FunctionComponent = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const { loadingService } = useLoading();
	const { dialogService } = useDialog();

	const getData = async (id?: any) => {

		
		loadingService.openLoading();
		const rs = await DonDatApi.getAllTaiKhoan();
		loadingService.closeLoading();
		setListData(rs.data);

	}
	const handleOpenDialog = ( item: any) => {
		// gan phong
		dialogService.openDialog(option => {
			option.title = item ? "Sửa tài khoản" : "Thêm tài khoản";
			option.size = DialogSize.small;
			option.content = (<AddTaiKhoanAd id={item?.id} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				getData();
			}
			//closeDialog();
		}
	}
	
	const deleteTaiKhoan = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.id) {
			loadingService.openLoading();
			
			await DonDatApi.deleteTaiKhoan(item.id);
			// refesh data

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			await getData();
		}
	}
	useEffect(() => {
		
		getData();
	}, []);
	return TaiKhoanAdminView({listData, handleOpenDialog, deleteTaiKhoan});
};

export default TaiKhoanAdmin;
