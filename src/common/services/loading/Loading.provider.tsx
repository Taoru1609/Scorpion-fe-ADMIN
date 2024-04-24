import { createContext, useContext, useState } from "react";
import { LoadingService } from "./loading.service";

type LoadingData = {
	loadingService: LoadingService
};

export const LoadingContext = createContext<LoadingData | undefined>(undefined);

export const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useData must be used within a LoaingProvider');
	}
	return context;
};

export const LoaingProvider = (props: any) => {
	// implement lớp Dialog Service
	const [loadingService] = useState<LoadingService>({
		isOpen: false,
		openCount: 0,
		openLoading: () => handlerOpenLoading(),
		closeLoading: () => handlerCloseLoading()
	});

	const handlerOpenLoading = () => {
		loadingService.openCount++;
		changeStateLoading();
	}

	const handlerCloseLoading = () => {
		if (loadingService.openCount > 0) {
			loadingService.openCount--;
			changeStateLoading();
		}
	}

	const changeStateLoading = () => {
		loadingService.isOpen = loadingService.openCount > 0;
		if (loadingService.isOpen) {
			document.body.classList.add('open-loading');
		} else {
			document.body.classList.remove('open-loading');
		}
	}

	// css và html hiệu ứng loading đang khởi tạo tại trang /public/index.html (lý do tái sử dụng hiệu ứng init loading page)
	return (
		<LoadingContext.Provider value={{ loadingService }}>
			{props.children}
		</LoadingContext.Provider>
	);
}

export default LoaingProvider;
