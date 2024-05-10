import { FunctionComponent, useEffect, useState } from "react";
import ThemLoaiDichVuView from "./ThemLoaiDichVu.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const ThemLoaiDichVu: FunctionComponent<({

	idLoaiDichVu?: any
	onClose: (hasChange: boolean) => void
})>  = (props: any) => {
	const [hasChange, setHasChange] = useState<boolean>(false);
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();


	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			id: [ null],
			tenLoaiDichVu: ['', ValidatorExtention.required('Tên loại dịch vụ không được để trống')],

		})
	);

	const detailLoaiDichVu = async () => {
		
		console.log(myForm)
		if(props.idLoaiDichVu){
			loadingService.openLoading();
			const rs = await DonDatApi.detailLoaiDichVu(props.idLoaiDichVu)
			loadingService.closeLoading();
			myForm.patchValue(rs.data);
		}
		
	}
	const saveLoaiDichVu = async () => {
debugger
		if(myForm.invalid) return;

		if(props.idLoaiDichVu){
			loadingService.openLoading();
			await DonDatApi.updateLoaiDichVu(myForm.value);
			loadingService.closeLoading();
			await dialogService.alert('Cập nhật thành công');
			closeDialog();
			

		}else{
			loadingService.openLoading();
			await DonDatApi.addLoaiDichVu(myForm.value);
			loadingService.closeLoading();
			await dialogService.alert('Thêm thành công');
			closeDialog();
		}
		

	}
	

	const closeDialog = () => {
		props.onClose(hasChange);

		
	}
	useEffect(() => {
		detailLoaiDichVu();
	}, []);


	return ThemLoaiDichVuView({myForm,closeDialog, saveLoaiDichVu});
};

export default ThemLoaiDichVu;
