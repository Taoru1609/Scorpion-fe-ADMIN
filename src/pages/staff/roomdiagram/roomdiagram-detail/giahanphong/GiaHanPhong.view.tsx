import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import InputDate from "src/common/controls/InputDate";
import InputDateTime from "src/common/controls/InputDateTime";
import InputText from "src/common/controls/InputText";

export const GiaHanPhongView = (props: any) => {
	return (<div>
		
		<FieldGroup
				control={props.myForm}
				render={({ get, invalid }) => (
					<form>

						<div >
							<FieldControl
								name="thoiGianRa"
								meta={{ label: "Thời gian ra" }}
								
								render={InputDate}
							/>
						</div>


					
						<div className="list-control-search">
							<button
								type="button"
								className="btn btn-default"
								onClick={() => props.closeDialog()} >
								<CloseCircleOutlined className="mr-2" />
								{props.mode === "view" ? "Đóng" : "Đóng"}
							</button>

							<button
								type="button"
								className="btn btn-primary"
								onClick={() => props.save()}
								disabled={props.disabled}
							>
								<PlusCircleOutlined className="mr-2" />Lưu
							</button >


						</div >
					</form >
				)}
			/>
	</div>);
}

export default GiaHanPhongView;
