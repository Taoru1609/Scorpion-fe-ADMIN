import { ReactElement } from "react";

export const BreadcumbView = (props: ({ children: ReactElement<any, any> })) => {
	return (
		<div className="breadcrumb-202404100227 breadcrumb-line breadcrumb-line-light header-elements-md-inline">
			<div className="d-flex">
				<div className="breadcrumb-title">Danh mục</div>
				<div className="breadcrumb">
					<div className="list-control-main">
						{props.children}
					</div>
				</div>
			</div>
		</div>
	);
}

export default BreadcumbView;
