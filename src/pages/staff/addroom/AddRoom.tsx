import { FunctionComponent, useEffect, useState } from "react";
import AddRoomView from "./AddRoom.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { DonDatApi } from "src/common/api/DonDatApi";
import { Select } from "antd";

export const AddRoom: FunctionComponent <({
	id?: string,
	mode?: string,
	onClose: (hasChange: boolean) => void
})> =  (props: any)  => {

	const { dialogService } = useDialog();
	const [listData, setListData] = useState<any[]>([]);
	const [hasChange, setHasChange] = useState<boolean>(false);


	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			tenLoaiPhong: [null, Validators.required],
			soPhong: [null, Validators.required],
	
		})
		
	);
  
	const getData = async () => {
		debugger;
		const rs = await DonDatApi.getChonPhong(props.id);
		console.log('getData', rs);
		setListData(rs.data);
	}
	
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	  };

	useEffect(() => {	
		getData();
	}, []);

	const closeDialog = () => {
		props.onClose(hasChange);
	
	}
	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		//closeDialog();
	}

	const handleOpenDialog = () => {
	
		dialogService.openDialog(option => {
			option.title = 'Gán phòng';
			option.size = DialogSize.small;
			option.content = (<AddRoom id={props.id}  onClose={(event) => handleCloseDialog(event)} />)
		});
	}


	return AddRoomView({ mode: props.mode, myForm, listData, handleChange,  closeDialog, handleOpenDialog });
};

export default AddRoom;
