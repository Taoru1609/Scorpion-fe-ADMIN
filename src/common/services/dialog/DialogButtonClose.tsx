import { CloseOutlined } from "@ant-design/icons";
import React, { FunctionComponent } from "react";

export const DialogButtonClose: FunctionComponent<({ onClick: () => void })> = (props) => {
	return <div>
		<button
			aria-label="Close"
			className="ant-modal-close ng-star-inserted"
			onClick={() => props.onClick()}
		>
			<CloseOutlined />
		</button>
	</div >
};

export default DialogButtonClose;
