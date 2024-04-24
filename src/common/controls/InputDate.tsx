import { DatePicker } from "antd";
// import dayjs from 'dayjs';
// import customParseFormat from 'dayjs/plugin/customParseFormat';

// dayjs.extend(customParseFormat);

// const { RangePicker } = DatePicker;

// const dateFormat = 'DD/MM/YYYY';

export const InputDate = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {

    if (!props.meta?.placeholder) {
        props.meta = { ...props.meta, placeholder: 'DD/MM/YYYY' }
    }

    return (
        <div className="input-date">
            {props.meta?.label && (<div className="control-label">{props.meta?.label}</div>)}
            <div className="control-item">
                <DatePicker status={props.touched && props.hasError("required") ? 'error' : null} placeholder={props.meta?.placeholder}  {...props.handler()} />
            </div>
            <div className="control-error">
                {props.touched
                    && props.hasError("required")
                    && `Không được để trống`}
            </div>
        </div>
    );
}

export default InputDate;
