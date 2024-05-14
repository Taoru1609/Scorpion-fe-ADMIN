import { Button, Table } from "antd";
import React from "react";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";


export const RoomTypeView = (props: any) => {



	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		  },
		{
			title: 'Tên loại phòng',

			dataIndex: 'tenLoaiPhong',
			key: 'tenLoaiPhong',

		},

		{
			title: 'Giá tiền',

			dataIndex: 'giaTien',
			key: 'giaTien',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}

		},


		{
			title: 'Số lượng người ở',

			dataIndex: 'soLuongNguoiO',
			key: 'soLuongNguoiO',
		
		},

		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenDialog(item)}>
							Sửa
						</Button>
					</div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.deleteLoaiPhong(item)}>
							Xóa
						</Button>
					</div>

				</div>
			}
		},

		{
			title: 'Ảnh',
			render: (item: any) => {
				return <div>
					
					
							<div className="btn-left">
								<button
									type="button"
									className="btn btn-primary"
									onClick={() => props.handleOpenHinhAnh(item)}
								>
									Ảnh
								</button >
							</div>
					

				</div>
			}
		},


	];
	return (
		<div className="layout-room-diagram">
			<div>


				<h2 className="breadcrumb-title">
					Thông tin loại phòng
				</h2>
				<hr />
				<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.handleOpenDialog()}
					>
						Thêm
					</button >
					<hr />
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 5 }} ></Table> <br />


			</div>
		</div>

	);
}

export default RoomTypeView;
