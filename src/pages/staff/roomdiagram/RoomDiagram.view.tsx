import { Col, Row } from "antd";
import React from "react";
import "./RoomDiagram.style.scss";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";

export const RoomDiagramView = (props: any) => {

    return (
        <div className="layout-room-diagram">
        
            {/* statistic temp*/}
          <h2 className="breadcrumb-title">Sơ đồ trạng thái phòng</h2>

            {/* filter */}

            {/*  searching room */}

            {/* display status of rooms */}
            <div className="room-status-room-diagram">
                <div>
                    <div className="medium-text-room-diagram">Phòng Trống()</div>
                </div>

                <div className="room-empty flex-row-room-diagram">
                    
                    {props.emptyRooms.map((room: any, index: any) => (
                        // onClick={() => props.handleOpenDialog(room)}
                        <div key={index} className="rooms" > 
                            <div className="info">
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PHÒNG</div>
                                <div style={{ marginBottom: '5px' }}>{room.tenPhong}</div>
                                <div className="tenLoaiPhong-text"> {room.tenLoaiPhong}</div>
                            </div>
                            <div className="status">Phòng trống</div>
                        </div>
                    ))}
                </div>


                <div>
                    <div className="medium-text-room-diagram">Có Khách()</div>
                </div>
                <div className="room-using flex-row-room-diagram">
                    {props.usedRooms.map((room: any, index: any) => (
                        <div key={index} className="rooms" onClick={() => props.handleOpenDialog(room)}>
                            <div className="info">
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>PHÒNG</div>
                                <div style={{ marginBottom: '5px' }}>{room.tenPhong}</div>
                                <div className="tenLoaiPhong-text">{room.tenLoaiPhong}</div>
                              
                            </div>
                          
                            <div className="status">{room.thoiGianVao} - {room.thoiGianRa}</div>
                           
                          
                           
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RoomDiagramView;
