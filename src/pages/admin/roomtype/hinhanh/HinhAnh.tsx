import { FunctionComponent, useEffect, useState } from "react";
import HinhAnhView from "./HinhAnh.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import HinhAnhThem from "./hinhanhthem/HinhAnhThem";

export const HinhAnh: FunctionComponent<({

	id?: any
	idLoaiPhong?: any
	onClose: (hasChange: boolean) => void
})> = (props: any) => {
	const [listData, setListData] = useState<any[]>([]);


	const { dialogService } = useDialog();

	const { loadingService } = useLoading();

	const [hasChange, setHasChange] = useState<boolean>(false);

	const detailHinhAnh = async () => {


		const rs = await DonDatApi.detailHinhAnh(props.idLoaiPhong)
		const data = rs.data

		for (const item of data) {
			item.hinhAnhLoaiPhong = `data:image/png;base64,${item.hinhAnhLoaiPhong}`
		}
		console.log(data)
		setListData(data);

	}


	const handleThemHinhAnh = (item: any) => {
		console.log(props.idLoaiPhong)
		// gan phong
		dialogService.openDialog(option => {


			option.size = DialogSize.small;
			option.content = (<HinhAnhThem idLoaiPhong={props.idLoaiPhong} onClose={(hasChange: boolean) => handleCloseDialog(hasChange)} />)
		});


		const handleCloseDialog = (hasChange: boolean) => {
			dialogService.closeDialog();

			if (!hasChange) {
				detailHinhAnh();
			}
			//closeDialog();
		}
	}
	const deleteHinhAnh = async (item?: any) => {
		const result = await dialogService.confirm('Bạn có chắc chắn muốn xóa không?');
		if (!result) {
			return;
		}
		if (item.id) {
			loadingService.openLoading();
			
			await DonDatApi.deleteHinhAnh(item.id);
			// refesh data

			loadingService.closeLoading();

			await dialogService.alert('Xóa thành công');
			await detailHinhAnh();
		}
	}

	const closeDialog = () => {
		props.onClose(hasChange);

	}
	useEffect(() => {
		detailHinhAnh();
	}, []);


	return HinhAnhView({ listData, closeDialog, deleteHinhAnh,handleThemHinhAnh });
};

export default HinhAnh;
