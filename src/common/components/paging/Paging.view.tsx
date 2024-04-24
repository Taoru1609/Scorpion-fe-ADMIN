import { CaretLeftOutlined, CaretRightOutlined, StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { PagingModal } from "src/common/model/PagingModal";

export const PagingView = (props: ({ data: PagingModal, onChange: (page: number) => void })) => {

	let view: number = 5;
	const lstPage: any[] = [];

	if (!props.data || props.data.count < props.data.size) { return <></>; }

	const curentPage = props.data.page;
	const totalPage = Math.ceil(props.data.count / props.data.size);
	const totalItem = props.data.count;
	const itemsPerPage = props.data.size;

	if (totalPage > 0) {
		let showItem = view;
		if (totalPage < view) { showItem = totalPage; }
		// index slot curent page
		let index = curentPage;
		if (showItem === view) {
			// tslint:disable-next-line:radix
			index = showItem % 2 === 0 ? (showItem / 2) : parseInt((showItem / 2).toString()) + 1;
		}

		let fix = curentPage < index ? (index - curentPage) : 0;
		if (curentPage > (totalPage - index) && showItem === view) { fix = (totalPage - index) - curentPage + 1; }
		for (let i = 1; i <= showItem; i++) {
			lstPage.push(curentPage - index + i + fix);
		}
	}

	const onChangePage = (page: number) => {
		props.onChange(page);
	}

	const goLast = () => {
		props.onChange(totalPage);
	}

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	return (
		<div className="paging-wapper paging-202404201533">
			<div className="temp1">
				<div className="paging-title">
					{totalItem > 0 ? (
						<span>
							Có {totalItem} kết quả được tìm thấy
						</span>
					) : (
						<span>
							Không tìm thấy kết quả nào
						</span>
					)}
				</div>
				<ul className="pagination mr-auto">
					<li className={'page-item ' + (curentPage < 2 ? 'disabled' : '')}>
						<a className="page-link" onClick={() => onChangePage(1)} href="javascript:void(0)">
							<StepBackwardOutlined />
						</a>
					</li>
					<li className={'page-item ' + (curentPage === 1 ? 'disabled' : '')}>
						{
							curentPage > 1 && <a className="page-link" onClick={() => onChangePage(curentPage - 1)} href="javascript:void(0)" >
								<CaretLeftOutlined />
							</a>
						}
						{
							curentPage === 1 && <a className="page-link" href="javascript:void(0)" >
								<CaretLeftOutlined />
							</a >
						}
					</li >
					{
						lstPage.map(x => (
							<li className={'page-item ng-star-inserted ' + (x === curentPage ? 'active' : '')}  >
								{x === curentPage && <a className="page-link" onClick={() => onChangePage(x)} href="javascript:void(0)" > {x}</a>}
								{x !== curentPage && <a className="page-link" onClick={() => onChangePage(x)} href="javascript:void(0)" > {x}</a>}
							</li >
						))
					}

					<li className={'page-item ' + (curentPage === totalPage ? 'disabled' : '')}>
						{curentPage < totalPage && <a className="page-link" onClick={() => onChangePage(curentPage + 1)} href="javascript:void(0)" >
							<CaretRightOutlined />
						</a >}
						{curentPage === totalPage && <a className="page-link" href="javascript:void(0)" >
							<CaretRightOutlined />
						</a >}
					</li >
					<li className={'page-item ' + (curentPage >= totalPage ? 'disabled' : '')} >
						<a className="page-link" onClick={() => goLast()} href="javascript:void(0)" >
							<StepForwardOutlined />
						</a >
					</li >
				</ul >
				<div className="paging-size">
					<span>Số hàng mỗi trang: </span>
					<Select
						onChange={handleChange}
						defaultValue={'10'}
						options={[
							{ value: '10', label: '10' },
							{ value: '20', label: '20' },
							{ value: '30', label: '30' }
						]} />
				</div >
			</div >
		</div>
	);
}

export default PagingView;
