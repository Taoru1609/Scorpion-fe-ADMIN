import { FunctionComponent, useEffect, useState } from "react";
import LuuPhongView from "./LuuPhong.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const LuuPhong: FunctionComponent <({
	idPhong: any,
	idPhongDat: any,
	item?: any,
	onClose: (hasChange: boolean) => void
})> = (props: any) => {

	const [listData, setListData] = useState<any[]>([]);
	const [idPhong, setIdPhong] = useState<number | null>(null);
	const { dialogService } = useDialog();

	const [hasChange, setHasChange] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);



	const postDoiPhong = async () => {
		
		console.log('postDoiPhong', idPhong);

		await DonDatApi.postDoiPhong({
			idPhongDat: props.idPhongDat,
			phongIdPhong: {
				id: idPhong
			}
		});
		
		setHasChange(true);
		
		await dialogService.alert('Đổi phòng thành công');
		getData();
		closeDialog(); 
		
	}

	const chonPhong = (event: number) => {
		if(event){
			setDisabled(false)
			setIdPhong(event);
		}
	}

	const getData = async () => {
		debugger;
		const rs = await DonDatApi.getChonPhong(props.idPhong);
		setListData(rs.data);
	}

	useEffect(() => {
		getData();
		setDisabled(true);
	}, []);

	const closeDialog = () => {
		props.onClose(hasChange);
	}
	return LuuPhongView({ listData, disabled ,postDoiPhong, closeDialog, chonPhong });
};

export default LuuPhong;
