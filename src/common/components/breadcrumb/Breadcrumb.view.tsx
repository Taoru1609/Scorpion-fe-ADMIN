import Breadcrumb from "antd/es/breadcrumb";
import { ReactElement } from "react";

export const BreadcumbView = (props: ({ items: any[], children: ReactElement<any, any> })) => {
	return (
		<div className="breadcrumb-202404100227 breadcrumb-line breadcrumb-line-light header-elements-md-inline">
			<div className="d-flex">
				<Breadcrumb
					items={props.items}
				/>
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
