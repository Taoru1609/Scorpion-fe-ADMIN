import React, { ReactElement, useEffect, useState } from "react";
import { useDataShare } from "src/common/services/data-share/DataShare.provider";

//code: danh sách mã quyền được chấp nhận
//contrary: false => logic chứa : true => logic khác
export const AuthorDisable = (props: ({ code: string[], contrary: boolean | undefined, children: ReactElement<any, any> })) => {

	const { dataShareService } = useDataShare();

	const [isDisable, setisDisable] = useState<boolean>(true);

	// init 
	useEffect(() => {
		const authData = dataShareService.getValue<string[]>('auth-data');
		if (props.code) {
			if (props.contrary) {
				// check not exist 
				const notExist = !authData.some(x => props.code.some(y => y === x));
				setisDisable(notExist);
			} else {
				// check exist
				const exist = authData.some(x => props.code.some(y => y === x));
				setisDisable(!exist);
			}
		}
	}, []);

	const disabledChildren = React.Children.map(props.children, child => {
		return React.cloneElement(child, { disabled: true });
	});

	const enabledChidren = <>
		{props.children}
	</>;

	return isDisable ? disabledChildren : enabledChidren;
}

export default AuthorDisable;
