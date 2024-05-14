import { Button, Table } from "antd";
import React from "react";

export const TaiKhoanAdminView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Họ tên',

			dataIndex: 'hoTen',
			key: 'hoTen',

		},

		{
			title: 'Email',

			dataIndex: 'email',
			key: 'email',

		},

		
		{
			title: 'Số căn cước công dân',

			dataIndex: 'cccd',
			key: 'cccd',

		},

		{
			title: 'Số điện thoại',

			dataIndex: 'soDienThoai',
			key: 'soDienThoai',

		},

		{
			title: 'Nick name',

			dataIndex: 'tenTaiKhoan',
			key: 'tenTaiKhoan',

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
						<Button type="text" onClick={() => props.deleteTaiKhoan(item)}>
							Xóa
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
					Tài khoản
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
				<Table dataSource={props.listData}  columns={columns} pagination={{ pageSize: 5 }} ></Table> <br />


			</div>
		</div>
	</div>);
}

export default TaiKhoanAdminView;
