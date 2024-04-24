import { Result, Button } from "antd";
import "./Error403.style.scss";

export const Error403View = (props: any) => {
	return (
		<Result
			status="403"
			title="403"
			subTitle="Bạn không có quyền sử dụng chức năng này"
			extra={<Button type="primary">Trở về trang login</Button>}
		/>
	);
}

export default Error403View;
