import { DatePicker } from "antd";
import { ReactElement } from "react";

export const InputMonth = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
    return (
        <div className="input-datetime">
            <DatePicker picker="month" {...props.handler} />
        </div>
    );
}

export default InputMonth;
