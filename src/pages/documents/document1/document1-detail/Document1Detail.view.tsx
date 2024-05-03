
import { FieldControl, FieldGroup } from "react-reactive-form";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";
import InputText from "src/common/controls/InputText";
import InputNumber from "src/common/controls/InputNumber";

export const Document1DetailView = (props: any) => {
	return (<div>
		<DialogButtonClose onClick={() => props.closeDialog()} />

		<FieldGroup
			control={props.myForm}
			render={({ get, invalid }) => (
				<form onSubmit={props.handleSubmit}>
					<div className="row">
						<div className="col-md-6">
							<FieldControl
								name="code"
								meta={{ label: "Mã" }}
								render={InputText}
							/>
						</div>

						<div className="col-md-6">
							<FieldControl
								name="name"
								meta={{ label: "Tên" }}
								render={InputText}
							/>
						</div>

						<div className="col-md-6">
							<FieldControl
								name="age"
								meta={{ label: "Tuổi" }}
								render={InputNumber}
							/>
						</div>
					</div>

					<div className="list-control-search">
						<button
							type="button"
							className="btn btn-default"
							onClick={() => props.closeDialog()} >
							<CloseOutlined className="mr-2" />
							{props.mode === "view" ? "Đóng" : "Hủy"}
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={() => props.handleSubmit()}
						>
							<PlusCircleOutlined className="mr-2" />Lưu và đóng
						</button >
					</div >
				</form >
			)}
		/>
	</div >);
}

export default Document1DetailView;
