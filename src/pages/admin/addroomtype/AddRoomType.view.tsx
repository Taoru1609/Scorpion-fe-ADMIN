import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputNumber from "src/common/controls/InputNumber";
import InputText from "src/common/controls/InputText";

export const AddRoomTypeView = (props: any) => {
	return (<div>
		
		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (
				<form>

					<div >
						<FieldControl
							name="tenLoaiPhong"
							meta={{ label: "Tên loại phòng" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="huongNhin"
							meta={{ label: "Hướng nhìn" }}
							render={InputText}
						/>
					</div>


					<div >
						<FieldControl
							name="soNguoi"
							meta={{ label: "Số người" }}
							render={InputNumber}
						/>
					</div>


					<div >
						<FieldControl
							name="dienTich"
							meta={{ label: "Diện tích" }}
							render={InputNumber}
						/>
					</div>


					<div >
						<FieldControl
							name="giaTien"
							meta={{ label: "Giá tiền" }}
							render={InputNumber}
						/>
					</div>

					<div >
						<FieldControl
							name="moTa"
							meta={{ label: "Mô tả" }}
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
							onClick={() => props.saveLoaiPhong()}
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

export default AddRoomTypeView;
