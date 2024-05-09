import { FunctionComponent, useEffect, useState } from "react";
import LoginView from "./Login.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";
import { AuthHttp } from "src/common/api/AuthHttp";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { ValidatorExtention } from "src/common/ValidatorExtention";

export const Login: FunctionComponent = (props: any) => {

	const { loadingService } = useLoading();
	const navigate = useNavigate();
	
	const [myForm] = useState<FormGroup>(
		FormBuilder.group({
			soDienThoai: ['', ValidatorExtention.required('Tài khoản không được để trống')],
			password: ['', ValidatorExtention.required('Mật khẩu không được để trống')]
		})
	);

	const checkLogin = () => {
		let idsUser:any;
			let idsUserStore = localStorage.getItem("idsUser");
			if(idsUserStore){
				idsUser = JSON.parse(idsUserStore);
			}
	
		if(idsUser){
		  navigate("/");
		}
	
	  }

	const save = async (e: any) => {
		// báo lỗi controll nếu lỗi
		myForm.markAllAsTouched();

		if (myForm.invalid) return;
		
		try {

			const response = await AuthHttp.login(myForm.value);
			if (response.status === 200) {
				localStorage.setItem('idsUser', JSON.stringify(response.data))
				navigate("/")
			}

		} catch (error) {
			console.log("error", error);
		}

		// let formData = myForm.getRawValue();

		// call api
		// localStorage.setItem('accessToken', new Date().toISOString())
		
	}

	useEffect(() => {
		checkLogin();
		loadingService.closeLoading();
	}, []);

	return LoginView({ myForm, save });
};

export default Login;
