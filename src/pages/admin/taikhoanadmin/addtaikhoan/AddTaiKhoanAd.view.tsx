import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";

export const AddTaiKhoanAdView = (props: any) => {
	return (<div>
		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (

				<form>

					<div >
						<FieldControl
							name="hoTen"
							meta={{ label: "Họ tên" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="email"
							meta={{ label: "Email" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="cccd"
							meta={{ label: "Căn cước công dân" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="soDienThoai"
							meta={{ label: "Số điện thoại" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="tenTaiKhoan"
							meta={{ label: "Nick name" }}
							render={InputText}
						/>
					</div>

					<div >
						<FieldControl
							name="matKhau"
							meta={{ label: "Mật khẩu" }}
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
							onClick={() => props.saveTaiKhoan()}
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

export default AddTaiKhoanAdView;
