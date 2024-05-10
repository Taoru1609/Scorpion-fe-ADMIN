import { FunctionComponent, useEffect, useState } from "react";
import LoginView from "./Login.view";
import { FormGroup, FormBuilder, Validators } from "react-reactive-form";
import { AuthHttp } from "src/common/api/AuthHttp";
import { useNavigate } from "react-router-dom";
import { useLoading } from "src/common/services/loading/Loading.provider";
import { ValidatorExtention } from "src/common/ValidatorExtention";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { message } from "antd";

export const Login: FunctionComponent = (props: any) => {

	const { loadingService } = useLoading();
	const navigate = useNavigate();
	const { dialogService } = useDialog();
	const [messageApi, contextHolder] = message.useMessage();

	
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
			debugger
			if (response.status === 200) {
				if(!response.data){
					alert('Sai tài khoản hoặc mật khẩu')				
					}else{
					localStorage.setItem('idsUser', JSON.stringify(response.data))
					navigate("/")
				}
				
			}

		} catch (error) {

			console.log("error", error);
		}

	
		
	}

	useEffect(() => {
		checkLogin();
		
		loadingService.closeLoading();
	}, []);

	return LoginView({ myForm, save });
};

export default Login;
