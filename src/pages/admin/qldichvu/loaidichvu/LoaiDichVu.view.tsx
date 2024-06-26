import { EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";

export const LoaiDichVuView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		  },
		{
			title: 'Tên loại dịch vụ',

			dataIndex: 'tenLoaiDichVu',
			key: 'tenLoaiDichVu',

		},


		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenDialog(item)}>
						{<EditOutlined />}
						</Button>
					</div>
					{/* <div className="btn-left">
						<Button type="text" onClick={() => props.deleteLoaiDichVu(item)}>
							Xóa
						</Button>
					</div> */}

				</div>
			}
		},

	];
	return (<div>
		<div className="layout-room-diagram">
			<div>


				<h2 className="breadcrumb-title">
					Loại dịch vụ
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
	</div>);
}

export default LoaiDichVuView;
