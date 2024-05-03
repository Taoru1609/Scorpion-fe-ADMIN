import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";
import "./RoomDiagramDetail.style.scss";

export const RoomDiagramDetailView = (props: any) => {

	const columns = [
		{
			title: 'Tên khách',

			dataIndex: 'tenKhachO',
			key: 'tenKhachO',

		},

		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenGuest(item)}>
							Sửa
						</Button>
					</div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.deleteKhach(item)}>
							Xóa
						</Button>
					</div>

				</div>
			}
		},

	];

	return (<div className="room-detail-202405031420">
		<div className="content-data">
			<div className="form-data">
				<FieldGroup
					control={props.myForm}
					render={({ get, invalid }) => (
						<form>


							<h4 className="text-form-2024">Thông tin phòng</h4>
							<hr />
							<div className="col-md-12">
								<FieldControl
									name="tenPhong"
									meta={{ label: "Số phòng" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-12">
								<FieldControl
									name="tenLoaiPhong"
									meta={{ label: "Tên loại phòng" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-12">
								<FieldControl
									name="thoiGianVao"
									meta={{ label: "Thời gian vào" }}
									render={InputText}
								/>
							</div>


							<div className="col-md-12">
								<FieldControl
									name="thoiGianRa"
									meta={{ label: "Thời gian ra" }}
									render={InputText}
								/>
							</div>


							<div className="col-md-12">
								<FieldControl
									name="soTienPhong"
									meta={{ label: "Giá phòng" }}
									render={InputText}
								/>
							</div>
							<br />
							<center><div>

								<button
									type="button"
									className=" btn btn-primary  "

									onClick={() => props.handleOpenDialog()}
								>
									Đổi phòng
								</button >

							</div></center>


						</form >
					)}
				/>
			</div>
			<div className="table-data">
				<h4 className="text-form-2024">
					Thông tin khách
				</h4>
				<hr />
				<Table rowKey="id" dataSource={props.detailData} columns={columns} pagination={false} ></Table> <br />
				<center>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.handleOpenGuest()}
					>
						Thêm
					</button >
				</center>
			</div>
		</div>

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
