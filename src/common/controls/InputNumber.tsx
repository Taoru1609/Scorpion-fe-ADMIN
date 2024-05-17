import { InputNumber as NzInputNumber } from 'antd';

export const InputNumber = (props: ({ handler?: any, touched?: any, hasError?: any, errors?: any, meta?: any })) => {
	return (
		<div className="input-number">
			{props.meta.label && (<div className="control-label">{props.meta.label}</div>)}
			<div className="control-item">
				<NzInputNumber<number> status={props.touched && props.hasError("error") ? 'error' : null}
					placeholder={props.meta?.placeholder}
					formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}		
					min={props.meta?.min}			
					{...props.handler()}
				/>
			</div>
			<div className="control-error">
				{props.touched
					&& props.hasError("error")
					&& props.errors.error
				}
			</div>
		</div>
	);
}

export default InputNumber;