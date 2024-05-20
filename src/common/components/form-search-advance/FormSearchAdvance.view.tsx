import React, { ReactElement } from "react";

export const FormSearchAdvanceView = (props: ({ children: ReactElement<any, any> })) => {
	return (
		<div className="form-search-advance">
			{props.children}
		</div>
	);
}

export default FormSearchAdvanceView;
