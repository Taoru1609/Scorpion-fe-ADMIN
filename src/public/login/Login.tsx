import { FunctionComponent, useState } from "react";
import LoginView from "./Login.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";

export const Login: FunctionComponent = (props: any) => {
	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		})
	);

	const handleSubmit = async (e: any) => {
		if (e) e.preventDefault();

		// báo lỗi controll nếu lỗi
		myForm.markAllAsTouched();

		if (myForm.invalid) return;

		let formData = myForm.getRawValue();
		console.log("Form values", formData);

		// call api
		localStorage.setItem('accessToken', new Date().toISOString())
	}

	return LoginView({ myForm, handleSubmit });
};

export default Login;
