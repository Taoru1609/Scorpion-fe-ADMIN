import { FunctionComponent, useEffect, useState } from "react";
import GiaHanPhongView from "./GiaHanPhong.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const GiaHanPhong: FunctionComponent <({

	idPhongDat?: any,

	onClose: (hasChange: boolean) => void
})> = (props: any) => {
	const { dialogService } = useDialog();

	
	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idPhongDat: [null],
			thoiGianVao: [null, ValidatorExtention.required],
			thoiGianRa: [null, ValidatorExtention.required],
		})
	);

	const save = async () => {
		debugger;
		let formData = myForm.getRawValue();
		if(formData.thoiGianRa){
			formData.thoiGianRa = formData.thoiGianRa;
		}
		console.log(myForm.value)



				await DonDatApi.giaHanPhong(myForm.value);
				await dialogService.alert('Gia hạn phòng thành công');

				closeDialog()

		
	}

	const getData = async () => {

		const rs = await DonDatApi.getChiTietPhong(props.idPhongDat);

		let data = rs.data;

		myForm.patchValue({
			idPhongDat: data.idPhongDat,
			thoiGianVao: data.thoiGianVao,
			thoiGianRa: data.thoiGianRa,
		});
	}

	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}

	// init page
	useEffect(() => {
		getData();
	
	}, []);

	return GiaHanPhongView({myForm,closeDialog, save});
};

export default GiaHanPhong;
