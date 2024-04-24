import React, { useState } from "react";
import { FieldControl, FieldGroup, FormBuilder, FormGroup, Validators } from "react-reactive-form";
import InputTextarea from "../../../controls/InputTextarea";

export const DialogConfirmDataView = (props: ({ message: string, onClose: () => void, onOk: (value: string) => void })) => {

	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			data: ['', Validators.required]
		})
	);

	const handleSubmit = (e: any = null) => {
		if (e) e.preventDefault();

		// báo lỗi controll nếu lỗi
		myForm.markAllAsTouched();

		if (myForm.invalid) return;

		props.onOk(myForm.get('data').value);
	}

	return (<div className="success-message message">
		<div className="icon-message">
			<img title="icon" src="/images/confirm-delete.png" />
		</div>
		<div className="content-message">{props.message}</div>
		<div className="content-form">
			<FieldGroup
				control={myForm}
				render={({ get, invalid }) => (
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col-md-12">
								<FieldControl
									name="data"
									meta={{ label: "Nội dung" }}
									render={InputTextarea}
								/>
							</div>
						</div>
					</form>
				)}
			/>
		</div>
		<div className="message-action">
			<button
				type="button"
				className="btn btn-primary mr-2"
				onClick={() => handleSubmit()}
			>
				<i className="isax-close-circle1 mr-2"></i>Đồng ý
			</button>
			<button
				type="button"
				className="btn btn-default"
				onClick={() => props.onClose()}
			>
				<i className="isax-close-circle1 mr-2"></i>Hủy
			</button>
		</div >
	</div>);
}

export default DialogConfirmDataView;
