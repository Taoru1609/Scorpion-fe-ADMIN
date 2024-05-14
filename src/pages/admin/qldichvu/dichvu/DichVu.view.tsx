import { Button, Select, Table } from "antd";
import React from "react";

export const DichVuView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Tên dịch vụ',

			dataIndex: 'tenDichVu',
			key: 'tenDichVu',

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
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
					<div className="btn-left">
						<Button type="text" onClick={() => props.handleOpenDialog(item)}>
							Sửa
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
					Dịch vụ
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
				<label>Lọc theo loại dịch vụ</label>
				<Select
					fieldNames={{ label: 'tenLoaiDichVu', value: 'id' }}
					style={{ width: "100%" }}
					onChange={(event) => props.chonDichVu(event)}
					options={props.listOption}
					defaultValue={null}
				/>

				<hr />
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 8 }} ></Table> <br />


			</div>
		</div>
	</div>);
}

export default DichVuView;
