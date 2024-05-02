import { FunctionComponent, useEffect, useState } from "react";
import RoomDiagramView from "./RoomDiagram.view";
import axios from "axios";
import { useDialog } from "src/common/services/dialog/Dialog.provider";
import { DialogSize } from "src/common/services/dialog/Dialog.service";
import RoomDiagramDetail from "./roomdiagram-detail/RoomDiagramDetail";

export const RoomDiagram: FunctionComponent = (props: any) => {

    const { dialogService } = useDialog();

    const [hasChange, setHasChange] = useState<boolean>(false);


    const [isModalUpdateInfoGuest, setModalUpdateInfoGuest] = useState(false);
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
      
            const response = await axios.get(apiEmptyRoom);
            // const decodedData1 = response.data.map((item) => ({
            //     id: decodeURIComponent(item.id),
            //     tenLoaiDichVu: decodeURIComponent(item.tenLoaiDichVu),
            // }));

            setEmptyRooms(response.data);
        } catch (error) {
            console.error('Error fetching empty rooms:', error);
        }
    };

    // Fetch used rooms
    const fetchUsedRooms = async () => {
        try {
            debugger;
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
        console.log(item)
		dialogService.openDialog(option => {
			option.title = 'Chi tiết phòng';
			option.size = DialogSize.medium;
			option.content = (<RoomDiagramDetail idPhongDat={item.idPhongDat} idPhong={item.idPhong}  onClose={(event) => handleCloseDialog(event)} />)
         
		});
	}
    	const handleCloseDialog = (hasChange: boolean) => {
		dialogService.closeDialog();

		if(!hasChange){
			getService();
		}
		// closeDialog();
	}


    const closeDialog = () => {
		props.onClose(hasChange);
       
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



    return RoomDiagramView({ getService, fetchUsedRooms, fetchEmptyRooms,handleOpenDialog, handleCloseDialog, emptyRooms, usedRooms });
};

export default RoomDiagram;
