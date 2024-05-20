import "./Navbar.style.scss";
import { Header } from "antd/es/layout/layout";
import Button from "antd/es/button";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavbarView = (props: ({ open: boolean, onChange: (value: boolean) => void })) => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("idsUser");
		navigate("/public/login");
	}

	useEffect(() => {
		
	}, []);

	

	return (
		<Header className="navbar-202494191120">
			<Button
				className="btn-menu-collaps"
				type="text"
				icon={props.open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				onClick={() => props.onChange(!props.open)}
			/>
			<div className="demo-logo" > <img src="/images/c529f161-a050-4cd9-9904-d7508a610055.png" width={'80'} alt="" />    Quản lý đặt phòng khách sạn Scorpio</div>
			<div style={{position: "absolute", right: 35, cursor: "pointer"}} onClick={() => logout()}>Đăng xuất</div>
		</Header>
	);
}

export default NavbarView;
