import { Table } from "antd";
import React from "react";

export const ThongKeView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		  },

		  {
			title: 'Ngày',

			dataIndex: 'thoiGian',
			key: 'thoiGian',
		

		},

		{
			title: 'Số lượng phòng đã dùng',

			dataIndex: 'soLuongPhongDaDung',
			key: 'soLuongPhongDaDung',

		},

		
		{
			title: 'Số lượng phòng trống',

			dataIndex: 'soLuongPhongTrong',
			key: 'soLuongPhongTrong',

		},
		{
			title: 'Tổng số phòng',

			dataIndex: 'tongSoPhong',
			key: 'tongSoPhong',

		},



	
	];
	return (<div>
		
		<div className="layout-room-diagram">
			<div>


				<h2 className="breadcrumb-title">
					Thống kê
				</h2>
				<hr />
			
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 8 }} ></Table> <br />


			</div>
		</div>
	</div>);
}

export default ThongKeView;
