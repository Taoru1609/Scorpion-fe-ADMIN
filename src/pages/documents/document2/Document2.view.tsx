import { Content } from "antd/es/layout/layout";
import { FieldControl, FieldGroup } from "react-reactive-form";
import AuthorView from "src/common/components/author/Author.view";
import BreadcumbView from "src/common/components/breadcrumb/Breadcrumb.view";
import FormSearchBasicView from "src/common/components/form-search-basic/FormSearchBasic.view";
import PagingView from "src/common/components/paging/Paging.view";
import TableView from "src/common/components/table/Table.view";
import InputText from "src/common/controls/InputText";

export const Document2View = (props: any) => {

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
	];

	const changePage = (page: number) => {
		props.setPaging({ ...props.paging, page: page });
		props.getData();
	}

	return (
		<div>
			<BreadcumbView>
				<>
					<AuthorView code={['001-add']}>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => props.handleOpenDialog()}
						>
							<i className="isax-add-circle1 mr-2"></i>Thêm danh mục
						</button>
					</AuthorView>

					{/* <button
						type="button"
						className="btn btn-primary ml-2"
					>
						<i className="isax-add-circle1 mr-2"></i>Import
					</button> */}
				</>
			</BreadcumbView>
			<Content>
				<FormSearchBasicView>
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
				</FormSearchBasicView>
				<TableView dataSource={props.listData} columns={columns}></TableView>
				<PagingView data={props.paging} onChange={(page) => changePage(page)}></PagingView>
			</Content>
		</div >
	);
}

export default Document2View;
