import { FunctionComponent, useEffect, useState } from "react";
import AddRoomView from "./AddRoom.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const AddRoom: FunctionComponent<({
	idLoaiPhong: any,
	idPhongDat: any,
	onClose: (hasChange: boolean) => void
})> = (props) => {

	const [listData, setListData] = useState<any[]>([]);
	const [idPhong, setIdPhong] = useState<number | null>(null);
	const { dialogService } = useDialog();

	const [hasChange, setHasChange] = useState<boolean>(false);
	const [disabled, setDisabled] = useState<boolean>(false);

	const postLuuPhong = async () => {

		console.log('postLuuPhong', idPhong);
		const rs = await DonDatApi.postLuuPhong({
			idPhongDat: props.idPhongDat,
			phongIdPhong: {
				id: idPhong
			}
		});
		
		await dialogService.alert('gán phòng thành công');
		getData();
		closeDialog(true); 
		
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
		getData();
		setDisabled(true);
	}, []);

	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	return AddRoomView({ listData, disabled ,postLuuPhong, closeDialog, chonPhong });
};

export default AddRoom;
