import { FunctionComponent, useEffect, useState } from "react";
import RoomTypeView from "./RoomType.view";
import { Table, Button } from "antd";

export const RoomType: FunctionComponent = (props: any) => {
	
	return RoomTypeView(props);
};

export default RoomType;
