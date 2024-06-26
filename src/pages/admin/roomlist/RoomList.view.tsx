import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Button, Select, Table } from "antd";
import React from "react";

export const RoomListView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Số phòng',

			dataIndex: 'soPhong',
			key: 'soPhong',

		},

		{
			title: 'Số tầng',

			dataIndex: 'soTang',
			key: 'soTang',

		},

		{
			title: 'Tên loại phòng',

			render (text:any , record:any){
				return record.loaiPhongIdLoaiPhong?.tenLoaiPhong
			},
			key: 'tenLoaiPhong',

		},
	


		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenDialog(item)}>
						<EditOutlined />
						</Button>
					</div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.deletePhong(item)}>
						<DeleteOutlined />
						</Button>
					</div>

				</div>
			}
		},

	];
	return (<div>
		
		<div className="layout-room-diagram">
			<div>


				<h2 className="breadcrumb-title">
					Danh sách phòng
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
				<label>Lọc theo loại phòng</label>
				<Select
					fieldNames={{ label: 'tenLoaiPhong', value: 'id' }}
					style={{ width: "100%" }}
					onChange={(event) => props.chonDichVu(event)}
					options={props.listOption}
					defaultValue={null}
				/>

				<hr />
				<Table dataSource={props.listData}  columns={columns} pagination={{ pageSize: 8 }} ></Table> <br />


			</div>
		</div>
	</div>);
}

export default RoomListView;
