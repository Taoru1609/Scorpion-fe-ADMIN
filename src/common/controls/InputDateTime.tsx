import { DatePicker } from "antd";


export const InputDateTime = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
    if (!props.meta?.placeholder) {
        props.meta = { ...props.meta, placeholder: 'DD/MM/YYYY' }
    }

    return (
        <div className="input-datetime">
            {props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}
            <div className="control-item">
                <DatePicker showTime needConfirm status={props.touched && props.hasError("required") ? 'error' : null} placeholder={props.meta?.placeholder}  {...props.handler()} />
            </div>
            <div className="control-error">
                {props.touched
                    && props.hasError("required")
                    && `Không được để trống`}
            </div>
        </div>
    );
}

export default InputDateTime;
