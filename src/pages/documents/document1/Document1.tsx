import { FunctionComponent, useState, useEffect } from "react";
import Document1View from "./Document1.view";
import { FormBuilder, FormGroup } from "react-reactive-form";
import Document1Detail from "./document1-detail/Document1Detail";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { Document1Api } from "src/common/api/Document1Api";
import { PagingModal } from "src/common/model/PagingModal";

export const Document1: FunctionComponent = (props: any) => {

	// use các service cần sử dụng
	const { dialogService } = useDialog();

	const { loadingService } = useLoading();

	// const { dataShareService } = useDataShare();

	const [listData, setListData] = useState<any[]>([]);

	const [paging, setPaging] = useState<PagingModal>(new PagingModal());

	const [formSearch] = useState<FormGroup>(
		FormBuilder.group({
			q: ['']
		})
	);

	const getData = async () => {
		if (formSearch.invalid) return;
		const formData = formSearch.getRawValue();

		loadingService.openLoading();
		const rs = await Document1Api.getPaging({ ...formData, ...paging });
		setListData(rs.items);
		setPaging(rs.paging);
		loadingService.closeLoading();
	}

	const handleSubmit = (e: any) => {
		e.preventDefault();
		// báo lỗi controll nếu lỗi
		formSearch.markAllAsTouched();
		if (formSearch.invalid) return;

		// refesh về trang 1
		paging.page = 1;
		getData();
	}

	const handleOpenDialog = (mode: string = 'add', item: any = null) => {
		dialogService.openDialog(option => {
			option.title = mode === 'view' ? 'Xem dữ liệu' : 'Thêm dữ liệu';
			if (mode === 'edit') option.title = 'Sửa dữ liệu';
			option.mode = mode;
			option.size = DialogSize.small;
			option.content = (<Document1Detail onClose={(event) => handleCloseDialog(event)} />)
		});
	}

	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();
		if (hasChange) {
			// có thay đổi dữ liệu refesh data tại trang hiện tại
			getData();
		}
	}

	// init page
	useEffect(() => {
		getData();
	}, []);

	return Document1View({ formSearch, listData, paging, getData, handleSubmit, handleOpenDialog, handleCloseDialog, setPaging });
};

export default Document1;
