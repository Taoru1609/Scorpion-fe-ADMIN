import { Input, Select } from "antd";

export const InputSelect = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
	return (
		<div className="input-select">
			{props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}
			<div className="control-item">
			<Select
			    fieldNames={{ label: 'label', value: 'value' }}
				options={props.meta?.options}
				status={props.touched && props.hasError("required") ? 'error' : null} placeholder={props.meta?.placeholder} {...props.handler()}
			/>
			</div>
			<div className="control-error">
				{props.touched
					&& props.hasError("required")
					&& `Không được để trống`}
			</div>
		</div>
	);
}

export default InputSelect;