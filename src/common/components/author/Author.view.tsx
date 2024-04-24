import React, { ReactElement, useEffect, useState } from "react";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";

//code: danh sách mã quyền được chấp nhận
//contrary: false => logic chứa : true => logic khác
export const AuthorView = (props: ({ code: string[], contrary?: boolean, children: ReactElement<any, any> })) => {

	const { dataShareService } = useDataShare();

	const [isView, setIsView] = useState<boolean>(false);

	// init 
	useEffect(() => {
		const authData = dataShareService.getValue<string[]>('auth-data');
		if (props.code) {
			if (props.contrary) {
				// check not exist 
				const notExist = !authData.some(x => props.code.some(y => y === x));
				setIsView(!notExist);
			} else {
				// check exist
				const exist = authData.some(x => props.code.some(y => y === x));
				setIsView(exist);
			}
		}
	}, []);

	const htmlView = (
		<>
			{props.children}
		</>
	);
	return isView ? htmlView : <></>;
}

export default AuthorView;
