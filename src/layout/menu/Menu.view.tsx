import { Link } from "react-router-dom";
import "./Menu.style.scss";
import { Menu, MenuProps } from "antd";
import { useLocation } from 'react-router-dom';

export const MenuView = (props: ({
	listMenu: any[]
})) => {
	const location = useLocation();

	// clone data tránh reference object
	let listMenuArray: any[] = JSON.parse(JSON.stringify(props.listMenu));

	// map label and icon tempalte
	for (const item of listMenuArray) {

		item.label = (
			<Link to={item.url}>
				<span>{item.label}</span>
			</Link>
		);
		item.icon = (<i className={item.icon}></i>);
		item.key = item.id + '';
	}

	// xử lý convert từ danh sách sang tree
	listMenuArray.forEach((item: any) => {
		const children = listMenuArray.filter(x => x.parent === item.id);
		children.length > 0 ? item.children = children : item.children = null;
	});
	const menuTree = listMenuArray.filter(x => x.parent === null);

	const selectKey: any[] = [];
	const openKey: any[] = [];

	const autoOpenMenuByUrl = (source: any[], url: string, level: number = 0) => {
		let result = false;
		for (const item of source) {
			item.level = level;
			let queryParam = "";
			if (item.params) {
				let objParams = JSON.parse(item.params);
				for (const key in objParams) {
					const value = objParams[key];
					if (queryParam.indexOf('?') === -1) {
						queryParam += "?";
					} else {
						queryParam += "&";
					}
					queryParam += `${key}=${value}`;
				}
			}

			if (item.children) {
				const rs: any = autoOpenMenuByUrl(item.children, url, level + 1);
				if (rs) {
					// item.isOpen = true;
					openKey.push(item.key);
					result = rs;
				}
			} else if (`${item.url}${queryParam}` === url) {
				// item.isSelect = true;
				selectKey.push(item.key);
				result = true;
			}
		}
		return result;
	}

	autoOpenMenuByUrl(menuTree, location.pathname, 0);

	// const selectKey = listMenuArray.filter(x => x.isSelect).map(x => x.key);
	// const openKey = listMenuArray.filter(x => x.isOpen).map(x => x.key);

	// set tree to listMenu
	let listMenu: MenuProps['items'] = menuTree;

	return (
		<Menu className="menu-202404201007"
			mode="inline"
			defaultSelectedKeys={selectKey}
			defaultOpenKeys={openKey}
			items={listMenu}
		/>
	);
}

export default MenuView;
