import React, { createContext, useContext, useState } from "react";
import { DataShareService } from "./DataShare.service";

type DataShareData = {
	dataShareService: DataShareService
};

export const DataShareContext = createContext<DataShareData | undefined>(undefined);

export const useDataShare = () => {
	const context = useContext(DataShareContext);
	if (!context) {
		throw new Error('useData must be used within a LoaingProvider');
	}
	return context;
};

export const DataShareProvider = (props: any) => {

	// implement lớp share data memory Service
	const [dataShareService] = useState<DataShareService>({
		data: [],
		subriceEvent: [],
		getValue: (key) => handlerGetValue(key),
		getValueChange: (key, subrice) => handlerGetValueChange(key, subrice),
		setValue: (key, value) => handlerSetValue(key, value)
	});

	const handlerGetValue = (key: string): any => {
		let findData = dataShareService.data.find(x => x.key === key);
		return findData?.value;
	}

	const handlerSetValue = (key: string, value: any) => {
		let findData = dataShareService.data.find(x => x.key === key);
		if (!findData) {
			findData = ({ key: key, value: value });
			dataShareService.data.push(findData);
		} else {
			findData.value = value;
		}

		// check subrice and push emit
		const listSubrice = dataShareService.subriceEvent.filter(x => x.key === key);

		for (const item of listSubrice) {
			item.sub(value);
		}
	}

	const handlerGetValueChange = (key: string, subrice: (value: any) => void) => {
		dataShareService.subriceEvent.push({
			key: key,
			sub: subrice
		});
	}

	return (
		<DataShareContext.Provider value={{ dataShareService }}>
			{props.children}
		</DataShareContext.Provider>
	);
}

export default DataShareProvider;
