import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Table, InputNumber, Select } from "antd";
import { FieldGroup, FieldControl } from "react-reactive-form";
import InputText from "src/common/controls/InputText";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";

export const AddRoomView = (props: any) => {

	return (
	  <div>
			<DialogButtonClose onClick={() => props.closeDialog()} />
    <hr />

      <Select
        defaultValue=""
        fieldNames={{label: 'soPhong', value: 'id'}}
        style={{ width: "100%" }}
        options={props.listData}
      />

      <FieldGroup
        control={props.myForm}
        render={({ get, invalid }) => (
          <form>

            <div className="list-control-search">
              <button
                type="button"
                className="btn btn-default"
                onClick={() => props.closeDialog()} >
                <CloseOutlined className="mr-2" />
                {props.mode === "view" ? "Đóng" : "Đóng"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.handleOpenDialog()}
              >
                <PlusCircleOutlined className="mr-2" />Lưu
              </button >
            </div >
          </form >
        )}
      />
    </div>
  );
}

export default AddRoomView;
