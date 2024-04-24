export interface DialogService {
  // định nghĩa thành phần lớp service
  listDialog: DialogIntance[];
  openDialog(option: (modal: DialogModal) => void): Promise<any>;
  closeDialog(id?: any): void;
  alert(message: string): Promise<void>;
  confirm(message: string): Promise<boolean>;
  confirmData(message: string): Promise<DialogConfirmDataModal>;
}

export interface DialogIntance {
  id: string;
  dialog: any;
}

export interface DialogModal {
  title?: string;
  mode: string;
  size: string;
  content: React.ReactNode;
}

export interface DialogConfirmDataModal {
  ok: boolean;
  data?: string;
}

export enum DialogSize {
  tab = "modal-tab",
  medium = "modal-medium",
  small = "modal-small",
}
