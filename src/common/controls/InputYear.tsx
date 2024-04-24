import { DatePicker } from "antd";
import { ReactElement } from "react";

export const InputYear = (props: ({ handler?: any, touched?: any, hasError?: any, meta?: any })) => {
    return (
        <div className="input-datetime">
            <DatePicker picker="year" {...props.handler} />
        </div>
    );
}

export default InputYear;
