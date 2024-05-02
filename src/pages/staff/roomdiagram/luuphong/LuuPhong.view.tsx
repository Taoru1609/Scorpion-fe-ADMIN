import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React from "react";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";

export const LuuPhongView = (props: any) => {
	return (
		
		<div>
      <DialogButtonClose onClick={() => props.closeDialog()} />
      <hr />
      <Select
        fieldNames={{ label: 'soPhong', value: 'id' }}
        style={{ width: "100%" }}
        onChange={(event) => props.chonPhong(event)}
        options={props.listData}
      />

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
          onClick={() => props.postDoiPhong()}
          disabled={props.disabled}
        >
          <PlusCircleOutlined className="mr-2" />Lưu
        </button >
      </div >
    </div>
	);
}

export default LuuPhongView;
