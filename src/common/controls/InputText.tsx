import { Input } from "antd";

export const InputText = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
	return (
		<div className="input-text">
			{props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}
			<div className="control-item">
				<Input status={props.touched && props.hasError("required") ? 'error' : null} placeholder={props.meta?.placeholder} {...props.handler()}
					allowClear
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

export default InputText;