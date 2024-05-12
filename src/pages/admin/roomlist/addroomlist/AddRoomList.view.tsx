import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputNumber from "src/common/controls/InputNumber";

export const AddRoomListView = (props: any) => {
	return (<div>
		<label htmlFor="">Chọn loại dịch vụ</label>
		
		<Select
			value={props.selectedPhong}
			fieldNames={{ label: 'tenLoaiPhong', value: 'id' }}
			style={{ width: "100%" }}
			onChange={(event) => props.chonLoaiPhong(event)}
			options={props.listOption}
		/>

		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (

				<form>

					<div >
						<FieldControl
							name="soPhong"
							meta={{ label: "Số phòng" }}
							render={InputNumber}
						/>
					</div>


					<div >
						<FieldControl
							name="soTang"
							meta={{ label: "Số tầng" }}
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
							onClick={() => props.savePhong()}
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

export default AddRoomListView;
