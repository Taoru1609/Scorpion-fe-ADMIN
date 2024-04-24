import React, { ReactElement } from "react";

export const FormSearchBasicView = (props: ({ children: ReactElement<any, any> })) => {
	return (
		<div className="form-search-basic">
			<div className="list-controls">
				{props.children}
			</div>
		</div>
	);
}

export default FormSearchBasicView;
