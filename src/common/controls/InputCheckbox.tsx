import { Checkbox } from "antd";
import { ReactElement } from "react";

export const InputCheckbox = (props: ({ children: ReactElement<any, any>, handler?: any, touched?: any, hasError?: any, meta?: any })) => {
	return (
		<div className="input-checkbox">
			<Checkbox {...props.handler("checkbox")}>{props.children}</Checkbox>
		</div>
	);
}

export default InputCheckbox;
