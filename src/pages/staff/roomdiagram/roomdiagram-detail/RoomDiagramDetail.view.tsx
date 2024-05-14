import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, InputNumber, Pagination, Table } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";
import "./RoomDiagramDetail.style.scss";
import { render } from "@testing-library/react";

export const RoomDiagramDetailView = (props: any) => {
	//column khách 
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


	//column dịch vụ
	const columns2 = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Tên dịch vụ',

			dataIndex: 'tenDichVuDat',
			key: 'tenDichVuDat',

		},

		{
			title: 'Thành tiền',

			dataIndex: 'giaDichVu',
			key: 'giaDichVu',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}
		},

		
		{
			title: 'Số lượng',

			dataIndex: 'soLuong',
			key: 'soLuong',	
		

		},

		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenUpdateDichVu(item)}>
							Sửa
						</Button>
					</div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleDeleteDichVu(item)}>
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
									className=" btn btn-custom btn-primary  "

									onClick={() => props.handleOpenDialog()}
								>
									Đổi phòng
								</button >

								<button
									type="button"
									className=" btn  btn-primary  "

									onClick={() => props.handleGiaHanPhong()}
								>
									Gia hạn phòng
								</button >

							</div></center>


						</form >
					)}
				/>
			</div>

			{/* table thông tin khách  */}
			<div className="table-data">
				<h4 className="text-form-2024">
					Thông tin khách
				</h4>
				<hr />
				<Table rowKey="id" dataSource={props.detailData} columns={columns} pagination={{ pageSize: 2 }} ></Table> <br />
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

		{/* Table Dịch vụ */}

		<div className="table-data2">
				<h4 className="text-form-2024">
					Dịch vụ
				</h4>
				<hr />
				<Table rowKey="id" dataSource={props.listDataDV} columns={columns2}   pagination={{ pageSize: 3 }}></Table> <br />
				<center>
					<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.handleOpenDialogDichVu()}
					>
						Thêm
					</button >
				</center>
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
					onClick={() => props.postCheckOut()}
				>
					Trả phòng
				</button >

			</center>
		</div>

	</div>);
}

export default RoomDiagramDetailView;
