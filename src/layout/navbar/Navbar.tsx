import { FunctionComponent } from "react";
import NavbarView from "./Navbar.view";

export const Navbar: FunctionComponent<({ open: boolean, onChange: (value: boolean) => void })> = (props) => {
	//init page
	//logic get userService

	return NavbarView(props);
};

export default Navbar;
