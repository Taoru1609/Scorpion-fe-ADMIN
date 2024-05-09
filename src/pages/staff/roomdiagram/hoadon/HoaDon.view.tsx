import { CloseOutlined } from "@ant-design/icons";
import { Select, Space, Table } from "antd";
import React from "react";
import "./HoaDon.style.scss";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputText from "src/common/controls/InputText";

export const HoaDonView = (props: any) => {

	const columns = [

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
		{
			title: 'Tiền dịch vụ',

			dataIndex: 'tienDichVu',
			key: 'tienDichVu',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}


		},

		{
			title: 'Thời gian vào',

			dataIndex: 'thoiGianVaoPD',
			key: 'thoiGianVaoPD'

		},

		{
			title: 'Thời gian ra',

			dataIndex: 'thoiGianRaPD',
			key: 'thoiGianRaPD',


		},

	];
	const columns2 = [
		{
			title: 'Tổng tiền',
			dataIndex: 'tongTien',
			key: 'tongTien',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}
		},
		{
			title: 'Tiền đã thanh toán',
			dataIndex: 'tienDaThanhToan',
			key: 'tienDaThanhToan',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}
		},
		{
			title: 'Tiền phải trả',

			dataIndex: 'tienPhaiTra',
			key: 'tienPhaiTra',
			render: (number: number) => {
				return (
					<div>
						{props.formatNumber(number)} <span> VNĐ</span>
					</div>
				);
			}


		},



	];
	return (

		<div className="room-detail-2024050314201">
			<div className="content-data1">
				<div className="table-data1">

					<h4 className="text-form-2024">
						Hóa đơn
					</h4>
					<hr />

					<Table dataSource={props.detailData} columns={columns} pagination={false} ></Table> <br />



					<h4 className="text-form-2024">
						Thanh toán
					</h4>
					<hr />

					<Table dataSource={props.detailData} columns={columns2} pagination={false} ></Table> <br />




				</div>




				<div className="form-data1">

					<h4 className="text-form-2024">
						Hình thức thanh toán
					</h4>
					<hr />
					<Select
						fieldNames={{ label: 'tenHinhThucTra', value: 'id' }}
						style={{ width: "100%" }}
						onChange={(event) => props.chonPhong(event)}
						options={props.detailDataHt}
						

					/>

				</div>

			</div>
			<center>

				<div className="list-control-search">
					<button
						type="button"
						className="btn btn-default"
						onClick={() => props.closeDialog()} >

						{props.mode === "view" ? "Đóng" : "Đóng"}
					</button>

					<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.handleAddHoaDon()} >

						{props.mode === "view" ? "Thanh toán" : "Thanh toán"}
					</button>

					<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.inHoaDon()} >

						{props.mode === "view" ? "In hóa đơn" : "In hóa đơn"}
					</button>
				</div>


			</center>
		</div>);
}

export default HoaDonView;
