import { FunctionComponent, useEffect, useState } from "react";
import RoomDiagramView from "./RoomDiagram.view";
import axios from "axios";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import RoomDiagramDetail from "./roomdiagram-detail/RoomDiagramDetail";
import { useLoading } from "src/common/services/loading/Loading.provider";

export const RoomDiagram: FunctionComponent = (props: any) => {

    const { dialogService } = useDialog();

    const [isModalUpdateInfoGuest, setModalUpdateInfoGuest] = useState(false);
    const { loadingService } = useLoading();
    const closeModalUpdateInfoGuest = () => {
        setModalUpdateInfoGuest(false);
    }
    const [modalDetail, setModalDetail] = useState(false);
    const closeModal = () => {
        setModalDetail(false);
    }

    // Room data states
    const [emptyRooms, setEmptyRooms] = useState<any[]>([]);
    const [usedRooms, setUsedRooms] = useState<any[]>([]);
    const [dataRoom, setDataRoom] = useState();
    const [service, setService] = useState([]);
    // API endpoints
    const apiEmptyRoom = 'http://localhost:8080/admin/phong/phong-trong';
    const apiUsedRoom = 'http://localhost:8080/admin/phong/phong-dang-o';
    const apiService = 'http://localhost:8080/admin/loai-dich-vu/hien-thi';


    // Fetch empty rooms
    const fetchEmptyRooms = async () => {
        try {
            loadingService.openLoading();
            const response = await axios.get(apiEmptyRoom);
            // const decodedData1 = response.data.map((item) => ({
            //     id: decodeURIComponent(item.id),
            //     tenLoaiDichVu: decodeURIComponent(item.tenLoaiDichVu),
            // }));

	    loadingService.closeLoading();

            setEmptyRooms(response.data);
        } catch (error) {
            console.error('Error fetching empty rooms:', error);
        }
    };

    // Fetch used rooms
    const fetchUsedRooms = async () => {
        try {

            const response = await axios.get(apiUsedRoom);
            // const decodedData2 = response.data.map((item) => ({
            //     id: decodeURIComponent(item.id),
            //     tenLoaiDichVu: decodeURIComponent(item.tenLoaiDichVu),
            // }));
            setUsedRooms(response.data);
        } catch (error) {
            console.error('Error fetching used rooms:', error);
        }
    };


    const handleOpenDialog = (item: any) => {
        
        dialogService.openDialog(option => {

            option.size = DialogSize.medium;
            option.content = (<RoomDiagramDetail idDonDat={item.idDonDat} idPhongDat={item.idPhongDat} idLoaiPhong={item.idLoaiPhong} onClose={(hasChange) => handleCloseDialog(hasChange)} />)

        });  
        
        const handleCloseDialog = (hasChange: boolean) => {
            dialogService.closeDialog();
    
            if (!hasChange) {
                fetchUsedRooms();
            }
        }
    }

    // init page
    useEffect(() => {
        // Call functions to fetch data
        fetchEmptyRooms();
        fetchUsedRooms();
        

    }, []);


    //Handle click Plus
    const getService = async () => {
        console.log("getService called");
        try {
            const response = await axios.get(apiService);
            const decodedDataService = response.data.map((item: any) => ({
                id: decodeURIComponent(item.id),
                tenLoaiDichVu: decodeURIComponent(item.tenLoaiDichVu),
            }));
            setService(decodedDataService);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return RoomDiagramView({ getService, fetchUsedRooms, fetchEmptyRooms, handleOpenDialog, emptyRooms, usedRooms });
};

export default RoomDiagram;
