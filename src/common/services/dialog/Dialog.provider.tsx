import { Modal } from "antd";
import { createContext, useContext, useState } from "react";
import { DialogConfirmDataModal, DialogModal, DialogService, DialogSize } from "./Dialog.service";
import { v4 as uuid } from "uuid";
import "./Dialog.style.scss";
import { DialogAlertView } from "./components/DialogAlert.view";
import DialogConfirmView from "./components/DialogConfirm.view";
import DialogConfirmDataView from "./components/DialogConfirmData.view";

type DialogData = {
	dialogService: DialogService
};

export const DialogContext = createContext<DialogData | undefined>(undefined);

export const useDialog = () => {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error('useData must be used within a DataProvider');
	}
	return context;
};

export const DialogProvider = (props: any) => {
	// implement lớp Dialog Service
	const [dialogService] = useState<DialogService>({
		listDialog: [],
		openDialog: (option) => handlerOpenDialog(option),
		closeDialog: (id) => handlerCloseDialog(id),
		alert: (message) => handlerAlert(message),
		confirm: (message) => handlerConfirm(message),
		confirmData: (message) => handlerConfirmData(message)
	});

	const [modal, contextHolder] = Modal.useModal();

	const handlerOpenDialog = (option: (modal: DialogModal) => void) => {
		return new Promise<any>((resove) => {
			let modalValue: DialogModal = ({
				title: '',
				mode: 'add',
				size: DialogSize.medium,
				content: null
			});
			// custom option
			option(modalValue);

			const installModal = modal.info({
				title: modalValue.title,
				content: modalValue.content,
				footer: null,
				icon: null,
				className: modalValue.size
			});

			dialogService.listDialog.push({
				dialog: installModal,
				id: uuid().toString()
			});

			resove(installModal);//kết thúc promise
		});
	};

	const handlerCloseDialog = (id?: any) => {

		if (dialogService.listDialog.length === 0) return;

		if (!id) {
			// kiểm tra dialog mở sau cùng
			const dialogLast = dialogService.listDialog[dialogService.listDialog.length - 1];
			id = dialogLast?.id;
		}
		const dialogDataIndex = dialogService.listDialog.findIndex(x => x.id === id);
		if (dialogDataIndex !== -1) {
			dialogService.listDialog[dialogDataIndex].dialog.destroy();
			dialogService.listDialog.splice(dialogDataIndex, 1);

			// không cần set lại state vi tránh render lại các component con
			// setDialogService({ ...dialogService });
		}
	}

	const handlerAlert = async (message: string) => {
		return new Promise<void>((resove) => {
			const dialog: any = modal.success({
				title: null,
				icon: null,
				footer: null,
				content: <DialogAlertView message={message} onClose={() => closeAlert()} />
			});

			const closeAlert = () => {
				dialog.destroy();
				resove();//kết thúc promise
			}
		});
	}

	const handlerConfirm = async (message: string) => {
		return new Promise<boolean>((resove) => {
			const dialog: any = modal.success({
				title: null,
				icon: null,
				footer: null,
				content: <DialogConfirmView message={message} onOk={() => okAlert()} onClose={() => closeAlert()} />
			});

			const okAlert = () => {
				dialog.destroy();
				resove(true);//kết thúc promise
			}

			const closeAlert = () => {
				dialog.destroy();
				resove(false);//kết thúc promise
			}
		});
	}

	const handlerConfirmData = async (message: string) => {
		return new Promise<DialogConfirmDataModal>((resove) => {
			const dialog: any = modal.success({
				title: null,
				icon: null,
				footer: null,
				content: <DialogConfirmDataView message={message} onOk={(event) => okAlert(event)} onClose={() => closeAlert()} />
			});

			const okAlert = (data: string) => {
				dialog.destroy();
				resove({ ok: true, data: data });//kết thúc promise
			}

			const closeAlert = () => {
				dialog.destroy();
				resove({ ok: false });//kết thúc promise
			}
		});
	}

	return (
		<DialogContext.Provider value={{ dialogService }}>
			{props.children}
			{contextHolder}
		</DialogContext.Provider>
	);
};