import { DatePicker } from "antd";
import dayjs from 'dayjs';

export const InputDate = (props: ({ handler?: any, touched?: any, hasError?: any, errors?: any, meta?: any })) => {

    const dateFormat = 'DD/MM/YYYY';

    if (!props.meta?.placeholder) {
        props.meta = { ...props.meta, placeholder: 'DD/MM/YYYY' }
    }

    let data = props.handler();

    if (data.value) {
        data.value = dayjs(data.value, dateFormat);
    }

    return (
        <div className="input-date">
            {props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}

            <div className="control-item">
                <DatePicker
                    format={dateFormat} placeholder={props.meta?.placeholder}
                    status={props.touched && props.hasError("error") ? 'error' : null}
                    {...data} />
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

export default InputDate;
