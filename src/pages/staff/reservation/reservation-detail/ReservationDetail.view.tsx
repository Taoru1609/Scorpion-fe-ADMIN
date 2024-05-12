import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { FieldGroup, FieldControl } from "react-reactive-form";
import TableView from "src/common/components/table/Table.view";
import InputNumber from "src/common/controls/InputNumber";
import InputText from "src/common/controls/InputText";

import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";

export const ReservationDetailView = (props: any) => {

	const columns = [
		{
			title: 'Loại Phòng',
			
			dataIndex: 'tenLoaiPhong',
			key: 'tenLoaiPhong',
		},
		{
			title: 'Số lượng',
			
			dataIndex: 'soLuong',
			key: 'soLuong',
		},
	];

	return (
		<div>
			<DialogButtonClose onClick={() => props.closeDialog()} />
			<hr />
		
			<Table dataSource={props.listData} columns={columns} pagination={false} ></Table> <br />
			<h4>Thông tin khách</h4> <hr />

			<FieldGroup
				control={props.myForm}
				render={({ get, invalid }) => (
					<form>
						<div className="row">
							<div className="col-md-4">
								<FieldControl
									name="thoiGianVao"
									meta={{ label: "Thời gian vào" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="thoiGianRa"
									meta={{ label: "Thời gian ra" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="tienPhong"
									meta={{ label: "Tiền phòng" }}
									render={InputNumber} 
								/> 
							</div>
					
							<div className="col-md-4">
								<FieldControl
									name="hoTen"
									meta={{ label: "Họ và tên" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="ngaySinh"
									meta={{ label: "Ngày sinh" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="soDienThoai"
									meta={{ label: "Số điện thoại" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="email"
									meta={{ label: "Email" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="quocTich"
									meta={{ label: "Quốc tịch" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="gioiTinh"
									meta={{ label: "Giới tính" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="diaChi"
									meta={{ label: "Địa chỉ" }}
									render={InputText}
								/>
							</div>

							<div className="col-md-4">
								<FieldControl
									name="ghiChu"
									meta={{ label: "Ghi chú" }}
									render={InputText}
								/>
							</div>
						</div>

						<div className="list-control-search">
							<button
								type="button"
								className="btn btn-default"
								onClick={() => props.closeDialog()} >
								<CloseOutlined className="mr-2" />
								{props.mode === "view" ? "Đóng" : "Đóng"}
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => props.handleOpenDialog()}
							>
								<PlusCircleOutlined className="mr-2" />Check In
							</button >
						</div >
					</form >
				)}
			/>
		</div>
	);
}

export default ReservationDetailView;
