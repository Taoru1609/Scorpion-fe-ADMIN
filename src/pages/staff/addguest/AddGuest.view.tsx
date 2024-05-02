import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";

export const AddGuestView = (props: any) =>{
	return (
		<div>

		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (
				<form>

					<div >
						<FieldControl
							name="hoTen"
							meta={{ label: "Họ và tên" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="soGiayTo"
							meta={{ label: "Số giấy tờ" }}
							render={InputText}
						/>
					</div>


					<div >
						<FieldControl
							name="tenGiayTo"
							meta={{ label: "Tên giấy tờ" }}
							render={InputText}
						/>
					</div>


					<div >
						<FieldControl
							name="quocTich"
							meta={{ label: "Quốc tịch" }}
							render={InputText}
						/>
					</div>

					<div className="list-control-search">
						<button
							type="button"
							className="btn btn-default"
							onClick={() => props.closeDialog()} >
							<CloseCircleOutlined className="mr-2" />
							{props.mode === "view" ? "Đóng" : "Đóng"}
						</button>
						
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => props.save()}
							disabled={props.disabled}
						>
							<PlusCircleOutlined className="mr-2" />Lưu
						</button >


					</div >
				</form >
			)}
		/>
	</div>);
}

export default AddGuestView;
