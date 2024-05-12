import { Table } from "antd";
import React from "react";
import ChartBarBasic from "src/common/controls/ChartBarBasic";

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
			
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 7 }} ></Table> <br />

				<ChartBarBasic type="bar" text={"Biểu đồ thống kê"} height={800} xData={props.xData} columnData={props.columnData} />
			</div>
		</div>
	</div>);
}

export default ThongKeView;
