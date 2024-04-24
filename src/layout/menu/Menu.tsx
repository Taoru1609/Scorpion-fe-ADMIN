import { FunctionComponent } from "react";
import MenuView from "./Menu.view";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";

export const Menu: FunctionComponent = () => {
	// const listMenu = [
	// 	{
	// 		id: 1,
	// 		icon: 'isax-chart-square',
	// 		label: 'TRANG CHỦ',
	// 		url: '/',
	// 		parentId: null
	// 	},
	// 	{
	// 		id: 2,
	// 		icon: 'isax-document-text1',
	// 		label: 'CODE MẪU',
	// 		url: null,
	// 		parentId: null
	// 	},
	// 	{
	// 		id: 3,
	// 		icon: 'isax-clipboard-text1',
	// 		label: 'MẪU CƠ BẢN',
	// 		url: '/document/document1',
	// 		parentId: 2,
	// 	},
	// 	{
	// 		id: 4,
	// 		icon: 'isax-task-square1',
	// 		label: 'MẪU NÂNG CAO',
	// 		url: '/document/document2',
	// 		parentId: 2,
	// 	},
	// ];

	const { dataShareService } = useDataShare();

	let listMenu = dataShareService.getValue<any[]>('menu-data');

	return MenuView({ listMenu });
};

export default Menu;
