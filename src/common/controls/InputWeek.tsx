import { DatePicker } from "antd";
import { ReactElement } from "react";

export const InputWeek = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
    return (
        <div className="input-datetime">
            <DatePicker picker="week" {...props.handler} />
        </div>
    );
}

export default InputWeek;
