import { FunctionComponent, useEffect, useState } from "react";
import UpdateDichVuView from "./UpdateDichVu.view";
import { FormBuilder, FormGroup, Validators } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";

export const UpdateDichVu: FunctionComponent <({
		item: any
	  onClose: (hasChange: boolean) => void
  })> = (props: any) => {
	const { dialogService } = useDialog();
	const [hasChange, setHasChange] = useState<boolean>(false);

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			idDichVuDat : [props.item.idDichVuDat],
			tenDichVuDat: [null],
			soLuong: [null, ValidatorExtention.required('Không được để trống')],


		})
	);

	const save =  async () => {
		if(myForm.invalid) {
			return
		}
			await DonDatApi.updateDatDichVu(myForm.value);
			await dialogService.alert('Cập nhật thành công');
			closeDialog();
	}

	const fillData = () => {
		myForm.controls["tenDichVuDat"].disable();
		myForm.patchValue(props.item)
	}


	const closeDialog = (hasChange: boolean = false) => {
		props.onClose(hasChange);
	}
	useEffect(() => {
		
		fillData();
	
	}, []);
	return UpdateDichVuView({myForm, closeDialog, save});
};

export default UpdateDichVu;
