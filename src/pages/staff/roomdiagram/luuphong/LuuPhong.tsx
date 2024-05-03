import { FunctionComponent, useEffect, useState } from "react";
import LuuPhongView from "./LuuPhong.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";

export const LuuPhong: FunctionComponent <({
	idLoaiPhong: any,
	idPhongDat: any,
	item?: any,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const { dataShareService } = useDataShare();
	const [listData, setListData] = useState<any[]>([]);
	const [idPhong, setIdPhong] = useState<number | null>(null);
	const { dialogService } = useDialog();
	const [disabled, setDisabled] = useState<boolean>(false);

	const postDoiPhong = async () => {
		
		console.log('postDoiPhong', idPhong);

		await DonDatApi.postDoiPhong({
			idPhongDat: props.idPhongDat,
			phongIdPhong: {
				id: idPhong
			}
		});
		
		await dialogService.alert('Đổi phòng thành công');
		getData();

		dataShareService.setValue('hasChange02', true);
		closeDialog(); 
	}

	const chonPhong = (event: number) => {
		if(event){
			setDisabled(false)
			setIdPhong(event);
		}
	}

	const getData = async () => {
		const rs = await DonDatApi.getChonPhong(props.idLoaiPhong);
		setListData(rs.data);
	}

	useEffect(() => {
		dataShareService.setValue('hasChange02', false);
		getData();
		setDisabled(true);
	}, []);

	const closeDialog = () => {
		props.onClose(dataShareService.getValue<boolean>('hasChange02'));
	}
	return LuuPhongView({ listData, disabled ,postDoiPhong, closeDialog, chonPhong });
};

export default LuuPhong;
