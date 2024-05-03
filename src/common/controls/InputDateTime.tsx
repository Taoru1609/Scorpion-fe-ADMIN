import { DatePicker } from "antd";
import dayjs from 'dayjs';


export const InputDateTime = (props: ({ handler?: any, touched?: any, hasError?: any, errors?: any, meta?: any })) => {
    const dateFormat = 'DD/MM/YYYY HH:mm:ss';

    if (!props.meta?.placeholder) {
        props.meta = { ...props.meta, placeholder: 'DD/MM/YYYY hh:mm:ss' }
    }

    let data = props.handler();
    if (data.value) {
        data.value = dayjs(data.value, dateFormat);
    }

    return (
        <div className="input-datetime">
            {props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}
            <div className="control-item">
                <DatePicker showTime needConfirm status={props.touched && props.hasError("error") ? 'error' : null} placeholder={props.meta?.placeholder}  {...data} />
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

export default InputDateTime;
