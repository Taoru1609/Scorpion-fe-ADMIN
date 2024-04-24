import { Col, Row } from "antd";
import React from "react";

export const RoomDiagramView = (props: any) => {

	return (
	
		<div className="layout-room-diagram">
            {/* statistic temp*/}
            <Row className="short-static-rooms">
                <Col className="medium-text-room-diagram" style={{ color: 'green' }}>Phòng Trống()</Col>
                <Col className="medium-text-room-diagram" style={{ color: 'red' }}>Có Khách()</Col>
            </Row>

            {/* filter */}

            {/*  searching room */}

            {/* display status of rooms */}
            <div className="room-status-room-diagram">
                <div>
                    <div className="medium-text-room-diagram">Phòng Trống()</div>
                </div>

                <div className="room-empty flex-row-room-diagram">
                    {props.emptyRooms.map((room : any, index : any) => (
                        <div key={index} className="rooms" onClick={props.handleRoomClick()}>
                            <div className="info">
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>VIP</div>
                                <div style={{ marginBottom: '5px' }}>{room.tenPhong}</div>
                                <div>{room.idPhong}</div>
                            </div>
                            <div className="status">Phòng trống</div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="medium-text-room-diagram">Có Khách()</div>
                </div>
                <div className="room-using flex-row-room-diagram">
                    {props.usedRooms.map((room : any, index: any) => (
                        <div key={index} className="rooms" onClick={() => props.handleRoomClick(room)}>
                            <div className="info">
                                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>VIP</div>
                                <div style={{ marginBottom: '5px' }}>{room.tenPhong}</div>
                                <div>{room.idPhong}</div>
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
