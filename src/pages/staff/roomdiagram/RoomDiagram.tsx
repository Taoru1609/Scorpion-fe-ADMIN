import { FunctionComponent, useEffect, useState } from "react";
import RoomDiagramView from "./RoomDiagram.view";
import axios from "axios";

export const RoomDiagram: FunctionComponent  = (props: any) => {
	
	const [isModalUpdateInfoGuest, setModalUpdateInfoGuest] = useState(false);
    const closeModalUpdateInfoGuest = () => {
        setModalUpdateInfoGuest(false);
    }
    const [modalDetail, setModalDetail] = useState(false);
    const closeModal = () => {
        setModalDetail(false);
    }

    // Room data states
    const [emptyRooms, setEmptyRooms] = useState([]);
    const [usedRooms, setUsedRooms] = useState([]);
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

    // Handle click on room
    const handleRoomClick = (room: any) => {
        // Logic for handling room click
        setDataRoom(room)
    };

	return RoomDiagramView({props, getService,handleRoomClick , fetchUsedRooms, fetchEmptyRooms , emptyRooms , usedRooms});
};

export default RoomDiagram;
