import { CloseOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table, InputNumber, Button } from "antd";
import React from "react";
import { FieldGroup, FieldControl } from "react-reactive-form";

import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";
import "./CheckIn.style.scss";
import InputText from "src/common/controls/InputText";

export const CheckInView = (props: any) => {

	const columns = [
		{
			title: 'Tên loại phòng',

			dataIndex: 'tenLoaiPhong',
			key: 'tenLoaiPhong',

		},
		{
			title: 'Số phòng đã chọn',

			dataIndex: 'tenPhong',
			key: 'tenPhong',

		},
		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.getPhongDaChon(item)}>
							{<EditOutlined />}
						</Button>
					</div>


					{
						item.tenPhong !== null && item.trangThai !== "Checkin" && item.trangThai !== "Checkout" && (
							<div className="btn-right">
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => props.postCheckIn(item)}
								>
									Check In
								</button >
							</div>
						)
					}

				</div>
			}
		},
	];

	const columns1 = [
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

	return (
		<div style={{ display: "flex", justifyContent: "space-around" }}>
			<div style={{ width: "45%" }}>
				<DialogButtonClose onClick={() => props.closeDialog()} />

				<h4>
					Thông tin phòng 
				</h4>
				<hr />
				<Table dataSource={props.listData} columns={columns} pagination={false} ></Table> <br />

			</div>


			<FieldGroup
				control={props.myForm}
				render={({ get, invalid }) => (
					<form style={{ borderLeft: "1px solid gray", paddingLeft: "55px" }}>
						<h4>Gán phòng</h4>
						<hr />

						{props.getStatus === 'Checkout' ?
							null
							: <button
								type="button"
								className="btn btn-primary"
								onClick={() => props.handleOpenDialog(props.item)}


							>
								<PlusCircleOutlined className="mr-2" />Gán phòng
							</button >
						}

						<div style={{ display: "flex", justifyContent: "space-around" }}>
							<div>
								<FieldControl
									name="tenLoaiPhong"
									meta={{ label: "Tên loại phòng" }}
									render={InputText}

								/>
							</div>


							<div style={{ marginLeft: "10px" }}>
								<FieldControl
									name="soTienPhong"
									meta={{ label: "Giá phòng" }}
									render={InputText}
								/>
							</div>
						</div>

						<div style={{ display: "flex", justifyContent: "space-around" }}>
							<div >
								<FieldControl
									name="thoiGianVao"
									meta={{ label: "Thời gian vào" }}
									render={InputText}
								/>
							</div>


							<div style={{ marginLeft: "10px" }}>
								<FieldControl
									name="thoiGianRa"
									meta={{ label: "Thời gian ra" }}
									render={InputText}
								/>
							</div>
						</div>
						<h4>

							<br />
							Thông tin khách
						</h4>
						<hr />

						{props.getStatus === 'Checkout' ?

							null

							: <button
								type="button"
								className="btn btn-primary"
								onClick={() => props.handleOpenGuest()}

							>
								Thêm
							</button >
						}

						<br />

						<Table dataSource={props.detailListData} columns={columns1} pagination={false} ></Table> <br />

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