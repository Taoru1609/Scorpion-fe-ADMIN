import { CloseOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table, InputNumber, Button } from "antd";
import React from "react";
import { FieldGroup, FieldControl } from "react-reactive-form";
import InputText from "src/common/controls/InputText";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";

export const CheckInView = (props: any) => {

	const clickEdit = (item: any) => {
		
		props.getPhongDaChon(item);
	}

	const columns = [
		{
			title: 'Tên loại phòng',

			dataIndex: 'tenLoaiPhong',
			key: 'tenLoaiPhong',

		},
		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<Button type="text" onClick={() => clickEdit(item)}>
						{<EditOutlined />}
					</Button>
				</div>
			}
		},
	];
	return (
		<div>
			<DialogButtonClose onClick={() => props.closeDialog()} />

			<h4>
				Thông tin phòng
			</h4>
			<hr />
			<Table dataSource={props.listData} columns={columns} pagination={false} ></Table> <br />

			<FieldGroup
				control={props.myForm}
				render={({ get, invalid }) => (
					<form>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => props.handleOpenDialog()}
						>
							<PlusCircleOutlined className="mr-2" />Gán phòng
						</button >
					
						<div className="col-md-6">
							<FieldControl
								name="tenLoaiPhong"
								meta={{ label: "Tên loại phòng" }}
								render={InputText}
							/>
						</div>

						<div className="col-md-6">
							<FieldControl
								name="thoiGianVao"
								meta={{ label: "Thời gian vào" }}
								render={InputText}
							/>
						</div>


						<div className="col-md-6">
							<FieldControl
								name="thoiGianRa"
								meta={{ label: "Thời gian ra" }}
								render={InputText}
							/>
						</div>


						<div className="col-md-6">
							<FieldControl
								name="tienLoaiPhong"
								meta={{ label: "Giá phòng" }}
								render={InputText}
							/>
						</div>

						<div className="list-control-search">
							<button
								type="button"
								className="btn btn-default"
								onClick={() => props.closeDialog()} >
								<CloseOutlined className="mr-2" />
								{props.mode === "view" ? "Đóng" : "Đóng"}
							</button>
							
						</div >
					</form >
				)}
			/>
		</div>

	);
}

export default CheckInView;
