import { CloseCircleOutlined } from "@ant-design/icons";

export const InputTextarea = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
	return (
		<div className="input-textarea">
			{props.meta.label && (<div className="control-label">{props.meta.label}</div>)}
			<div className="control-item">
				<textarea rows={2} className={`${props.touched ? 'touched' : ''} ${props.hasError("required") ? 'has-error' : ''} `} placeholder={props.meta?.placeholder} {...props.handler()}
				// addonAfter={(<div className="clear-text">
				// 	<CloseCircleOutlined />
				// </div>)}
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

export default InputTextarea;