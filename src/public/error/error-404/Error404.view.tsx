import { Result, Button } from "antd";
import "./Error404.style.scss";

export const Error404View = (props: any) => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Trang web không tồn tại"
			extra={<Button type="primary" >Trở về trang login </Button>}
		/>
	);
}

export default Error404View;
