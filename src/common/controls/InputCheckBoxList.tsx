import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ReactElement, useState } from "react";
const CheckboxGroup = Checkbox.Group;

export const InputCheckboxList = (props: ({ plainOptions: any[], defaultCheckedList: any[], children: ReactElement<any, any>, handler?: any, touched?: any, hasError?: any, meta?: any })) => {
    const defaultCheckedList: any[] = [];
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(props.handler.value ?? defaultCheckedList);

    return (
        <div className="input-checkbox">
            <CheckboxGroup options={props.plainOptions} value={checkedList} {...props.handler("checkbox")}>{props.children}</CheckboxGroup>
        </div>
    );
}

export default InputCheckboxList;
