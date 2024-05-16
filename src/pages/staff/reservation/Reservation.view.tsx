import { EditOutlined } from "@ant-design/icons";
import { Button, Pagination, Table } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { render } from "react-dom";
import { FieldGroup, FieldControl } from "react-reactive-form";
import AuthorView from "src/common/components/author/Author.view";
import BreadcumbView from "src/common/components/breadcrumb/Breadcrumb.view";
import FormSearchBasicView from "src/common/components/form-search-basic/FormSearchBasic.view";
import PagingView from "src/common/components/paging/Paging.view";
import TableView from "src/common/components/table/Table.view";
import InputText from "src/common/controls/InputText";

export const ReservationView = (props: any) => {

	const clickEdit = (item: any)=>{
		props.handleOpenDialog('view', item);
	}

	const columns = [
		{
			title: 'STT',
			render: (text: any, record: any, index: any) => <span>{index + 1}</span>
		},
		{
			title: 'Mã đặt phòng',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Tên',
			dataIndex: 'hoTen',
			key: 'hoTen',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'soDienThoai',
			key: 'soDienThoai',
		},
		{
			title: 'Thời gian vào',
			dataIndex: 'thoiGianVao',
			key: 'thoiGianVao',
		},
		{
			title: 'Thời gian ra',
			dataIndex: 'thoiGianRa',
			key: 'thoiGianRa',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'trangThai',
			key: 'trangThai',
		},

		{
			title: 'Thao tác',
			render: (item: any) => {
				return <div>

					{
						item.tenPhong !== null && item.trangThai !== "HUY DON DAT" &&  (
							<div>
					<Button type="text" onClick={() => clickEdit(item)}>
						{<EditOutlined />}
					</Button>
				</div>
						)
					}

				</div>
			}
		},
	];

	const changePage = (page: number) => {
		props.setPaging({ ...props.paging, page: page });
		props.getData();
	}

	return (
		<div>
			<div className="layout-room-diagram">
			<h2 className="breadcrumb-title">Danh sách đơn đặt</h2>

			</div>
			<Content>
				<p>Tìm kiếm theo số điện thoại hoặc mã đặt phòng</p>
					<FieldGroup
						control={props.formSearch}
						render={({ get, invalid }) => (
							<form onSubmit={props.handleSubmit}>
								<FieldControl
									name="q"
									render={InputText}
								/>
								<button className="hide" type="submit" />
							</form>
						)}
					/>
		
				<Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 8 }} ></Table>
				<PagingView data={props.paging} onChange={(page) => changePage(page)}></PagingView>
			</Content>
		</div >
	);
}

export default ReservationView;
