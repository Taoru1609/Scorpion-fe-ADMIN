import { Select, Table } from "antd";
import React from "react";

export const InHoaDonView = (props: any) => {
	const columns = [

		{
			title: 'Loại phòng',

			dataIndex: 'loaiPhong',
			key: 'loaiPhong'

		},

		{
			title: 'Số phòng',

			dataIndex: 'tenPhong',
			key: 'tenPhong',


		},


		{
			title: 'Thời gian vào',

			dataIndex: 'thoiGianVao',
			key: 'thoiGianVao'

		},

		{
			title: 'Thời gian ra',

			dataIndex: 'thoiGianRa',
			key: 'thoiGianRa',


		},
		{
			title: 'Tiền Phòng',
			dataIndex: 'tienPhong',
			key: 'tienPhong',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}
		},

	];
	const columns2 = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},

		{
			title: 'Tên dịch vụ',

			dataIndex: 'tenDichVu',
			key: 'tenDichVu'

		},

		{
			title: 'Số lượng',

			dataIndex: 'soLuong',
			key: 'soLuong',


		},
		{
			title: 'Giá tiền',
			dataIndex: 'soTien',
			key: 'soTien',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}
		},



	];
	return (<div>

		<div className="room-detail-2024050314201">
			<div className="content-data1">
				<div className="table-data1">

					<h4 className="text-form-2024">
						Hóa đơn
					</h4>
					<hr />

					<Table dataSource={props.detailData} columns={columns} pagination={false} ></Table> <br />



					<h4 className="text-form-2024">
						Dịch vụ thanh toán
					</h4>
					<hr />

					<Table dataSource={props.dichVuData} columns={columns2} pagination={false} ></Table> <br />

				</div>




			</div>
			<center>
				<h4 className="text-form-2024">Tổng tiền: {props.formatNumber(props.total)} VNĐ</h4>

				<button type="button" className="btn btn-primary" onClick={() => props.callbackFunction()} > Xuất hóa đơn </button>
			</center>
		</div>
	</div>);	
}

export default InHoaDonView;
