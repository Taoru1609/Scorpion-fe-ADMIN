import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputNumber from "src/common/controls/InputNumber";
import InputText from "src/common/controls/InputText";

export const UpdateDichVuView = (props: any) => {
	return (<div>
		
		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (
				<form>

					<div >
						<FieldControl
							name="tenDichVuDat"
							meta={{ label: "Tên dịch vụ" }}
							render={InputText}
							
						/>
					</div>

					<div >
						<FieldControl
							name="soLuong"
							meta={{ label: "Số lượng", min: 0 }}							
							render={InputNumber }
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

export default UpdateDichVuView;
