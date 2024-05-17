import { CloseCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import React from "react";


export const HinhAnhView = (props: any) => {
	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Hình ảnh',
	
			render:(item: any) => {
				return <div>

					<img src={item.hinhAnhLoaiPhong} width={200} alt="" />
				</div>
			}
		},
		
	
		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>
				
					<div className="btn-left">
						<Button type="text" onClick={() => props.deleteHinhAnh(item)}>
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
					Hình ảnh
				</h2>
				<hr />
				<button
						type="button"
						className="btn btn-primary"
						onClick={() => props.handleThemHinhAnh()}
					>
						Thêm
					</button >
					<hr />
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 3 }} ></Table> <br />


			</div>
		</div>
		
		<div className="list-control-search">
						<button
							type="button"
							className="btn btn-default"
							onClick={() => props.closeDialog()} >
							<CloseCircleOutlined className="mr-2" />
							{props.mode === "view" ? "Đóng" : "Đóng"}
						</button>

					
					</div >
	</div>);
}

export default HinhAnhView;
