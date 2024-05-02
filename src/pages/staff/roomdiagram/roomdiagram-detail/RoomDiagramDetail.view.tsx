import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";

export const RoomDiagramDetailView = (props: any) => {
	
	const columns = [
		{
			title: 'Tên khách',

			dataIndex: 'tenKhach',
			key: 'tenKhach',

		},

		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.getPhongDaChon(item)}>
							Sửa
						</Button>
					</div>


				</div>
			}
		},
	];

	return (<div>
		<FieldGroup
				control={props.myForm}
				render={({ get, invalid }) => (
					<form>

						<div>
						
						<button
							type="button"
							className="btn btn-primary"
							
							onClick={() => props.handleOpenDialog()}
						>
							Đổi phòng
						</button >
					
						</div>
					
					

						<div className="col-md-6">
							<FieldControl
								name="tenPhong"
								meta={{ label: "Số phòng" }}
								render={InputText}
							/>
						</div>

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
								name="soTienPhong"
								meta={{ label: "Giá phòng" }}
								render={InputText}
							/>
						</div>

						
					</form >
				)}
			/>
				<h4>
				Thông tin khách
			</h4>
			<hr />
			
			<Table dataSource={props.listData} columns={columns} pagination={false} ></Table> <br />
		<hr />
		

		<div className="list-control-search">
		<center>
		<button
			type="button"
			className="btn btn-default"
			onClick={() => props.handleCloseDialog()} >
			<CloseOutlined className="mr-2" />
			{props.mode === "view" ? "Đóng" : "Đóng"}
		</button>

		<button
            
			type="button"
			className="btn btn-primary"
			onClick={() => props.handleOpenDialog()}
		>
			Trả phòng
		</button >
		</center>
		</div>
		

	</div>);
}

export default RoomDiagramDetailView;
