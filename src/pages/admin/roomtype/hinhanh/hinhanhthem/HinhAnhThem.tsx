import { FunctionComponent, useState } from "react";
import HinhAnhThemView from "./HinhAnhThem.view";
import { DonDatApi } from "src/common/api/DonDatApi";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const HinhAnhThem: FunctionComponent<({

	id?: any,
	idLoaiPhong?: any
	onClose: (hasChange: boolean) => void
})> = (props: any) => {
	const { dialogService } = useDialog();
	const { loadingService } = useLoading();
	const [hasChange, setHasChange] = useState<boolean>(false);
	const [file, setFile] = useState<any>();


	const addFile = async (e: any) => {
		
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			setFile(file);

		}
	}

	const save = async () => {

		const formData = new FormData();
		formData.append('image', file);
		formData.append('id', props.idLoaiPhong);
		try {
			loadingService.openLoading();
			const response = await DonDatApi.addHinhAnh(formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			loadingService.closeLoading();
			console.log('Upload successful:', response.data);
			// Hiển thị thông báo hoặc thực hiện các thao tác khác sau khi upload thành công
		} catch (error) {
			console.error('Error uploading image:', error);
			// Hiển thị thông báo hoặc thực hiện các thao tác khác khi có lỗi
		}
		await dialogService.alert('Thêm thành công');
		closeDialog();
	}

	const closeDialog = () => {
		props.onClose(hasChange);

	}
	return HinhAnhThemView({ closeDialog, addFile, save });
};

export default HinhAnhThem;
