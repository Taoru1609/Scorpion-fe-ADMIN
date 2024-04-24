export interface LoadingService {
    // định nghĩa thành phần lớp service
    isOpen: boolean;
    openCount: number;
    openLoading(): void;
    closeLoading(): void;
}