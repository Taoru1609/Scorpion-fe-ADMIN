
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputNumber from "src/common/controls/InputNumber";
import InputText from "src/common/controls/InputText";

export const DichVuAddView = (props: any) => {
	return (<div>
		<label htmlFor="">Chọn loại dịch vụ</label>
		
		<Select
			value={props.selectedDichVu.value}
			fieldNames={{ label: 'tenLoaiDichVu', value: 'id' }}
			style={{ width: "100%" }}
			onChange={(event) => props.chonDichVu(event)}
			options={props.listOption.value}
		/>
		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (

				<form>

					<div >
						<FieldControl
							name="tenDichVu"
							meta={{ label: "Tên dịch vụ" }}
							render={InputText}
						/>
					</div>


					<div >
						<FieldControl
							name="giaTien"
							meta={{ label: "Giá tiền" }}
							render={InputNumber}
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
							onClick={() => props.saveDichVu()}
							disabled={props.disabled}
						>
							<PlusCircleOutlined className="mr-2" />Lưu
						</button >


					</div >
				</form >
			)}
		/>
	</div>
	);
}

export default DichVuAddView;
