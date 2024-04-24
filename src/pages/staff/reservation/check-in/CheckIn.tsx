import { FunctionComponent, useEffect, useState } from "react";
import CheckInView from "./CheckIn.view";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { DonDatApi } from "src/common/api/DonDatApi";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import AddRoom from "../../addroom/AddRoom";

export const CheckIn: FunctionComponent <({

	id?: string,
	onClose: (hasChange: boolean) => void
})> = (props) => {
	const { dialogService } = useDialog();

	const { dataShareService } = useDataShare();

	const [listData, setListData] = useState<any[]>([]);

	const [hasChange, setHasChange] = useState<boolean>(false);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			tenLoaiPhong: [null, Validators.required],
			thoiGianVao: [null, Validators.required],
			thoiGianRa: [null, Validators.required],
			tienLoaiPhong: [null, Validators.required],	
				
		})
	);


	const closeDialog = () => {
		props.onClose(hasChange);
	
	}
	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		//closeDialog();
	}

	const handleOpenDialog = () => {
	
		dialogService.openDialog(option => {
			option.title = 'Check In';
			option.size = DialogSize.small;
			option.content = (<AddRoom id={props.id}  onClose={(event) => handleCloseDialog(event)} />)
		});
	}



	const getPhongDaChon = async (item: any) => {
	
		const rs = await DonDatApi.getDetailPhongDat(item.idPhongDat);
		console.log('getData', rs);
		let data = {
			tienLoaiPhong: calculatePrice(convertDate(rs.data.thoiGianRa), convertDate(rs.data.thoiGianVao), rs.data.tienLoaiPhong),
			...rs.data
		};
		myForm.patchValue(data);
		

	}
	const formatDate = (date : any) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day < 10 ? "0" + day : day}/${
		  month < 10 ? "0" + month : month
		}/${year}`;
	  };

	const convertDate = (dateString:any) => {
		const parts = dateString?.split("/");
		if (parts?.length === 3) {
		  const [day, month, year] = parts;
		  // Đảo ngược thứ tự và nối lại với dấu "-"
		  return `${year}-${month}-${day}`;
		} else {
		  return null; // Trả về null nếu định dạng không hợp lệ
		}
	  };
	

	const calculatePrice = (checkInDate : any, checkOutDate : any, pricePerDay : any) => {

		const startDate = new Date(checkInDate);
		const endDate = new Date(checkOutDate);
	
		// Chuyển đổi ngày thành timestamp (milliseconds)
		const startTimestamp = startDate.getTime();
		const endTimestamp = endDate.getTime();
	
		// Số mili giây trong 1 ngày
		const oneDay = 1000 * 60 * 60 * 24;
	
		// Tính số ngày giữa hai ngày
		const numberOfDays = Math.round((endTimestamp - startTimestamp) / oneDay);
	
		// Tính tổng giá tiền
		const totalPrice = numberOfDays * pricePerDay;
	
		return totalPrice;
	  };
	
	  
	const getData = async () => {
		const rs = await DonDatApi.getPhongDat(props.id);

		console.log('getData', rs);
	
		setListData(rs.data);
	}
	
	
	useEffect(() => {	
		getData();
	}, []);

	return CheckInView({ listData, myForm,  closeDialog, getPhongDaChon, handleOpenDialog  });
};

export default CheckIn;
