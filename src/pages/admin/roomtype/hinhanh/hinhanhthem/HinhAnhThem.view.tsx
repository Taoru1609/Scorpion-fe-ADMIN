import { CloseCircleOutlined } from "@ant-design/icons";
import React from "react";

export const HinhAnhThemView = (props: any) => {
	return (<div>
		<form >
			<input type="file" onChange={props.addFile} />

		</form>

		<div className="list-control-search">
			<button
				type="button"
				className="btn btn-default"
				onClick={() => props.closeDialog()} >
				<CloseCircleOutlined className="mr-2" />
				{props.mode === "view" ? "Đóng" : "Đóng"}
			</button>

			<button
				type="button"
				className="btn btn-primary"
				onClick={() => props.save()}
			>
				Upload
			</button >

		</div >
	</div>);
}

export default HinhAnhThemView;
