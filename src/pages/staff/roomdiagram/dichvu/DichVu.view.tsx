import { InputNumber, Pagination, Select, Table } from "antd";
import React from "react";
import DialogButtonClose from "src/common/services/dialog/DialogButtonClose";
import "./DichVu.style.scss";
export const DichVuView = (props: any) => {

  const columns = [
    {
      title: 'STT',
      render: (text: any, record: any, index: any) => <span>{index + 1}</span>
    },
    {
      title: 'Tên dịch vụ',

      dataIndex: 'tenDichVu',
      key: 'tenDichVu',

    },
    {
      title: 'Số tiền dịch vụ',
      dataIndex: 'giaTien',
      key: 'giaTien',
      render: (number: number) => {
        return (
          <div>
            {props.formatNumber(number)} <span> VNĐ</span>
          </div>
        );
      }
    },
    
    {
      title: 'Thao tác',
      render: (item: any) => {
        return <div>
          {


            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => props.postAddGioHang(item)}
              >
                Thêm
              </button >
            </div>


          }

        </div>
      }
    },
  ];

  const column2s = [
    
    {
      title: 'Tên dịch vụ',
      dataIndex: 'tenDichVu',
      key: 'tenDichVu',
    },
    {
    	title: 'Số lượng',

    	dataIndex: 'soLuong',
    	key: 'soLuong',
  

    },

  ];
  return (
    <div className="room-detail-2024050314201">
      <div className="content-data1">

        <div className="table-data1">
    

          <Select
            fieldNames={{ label: 'tenLoaiDichVu', value: 'id' }}
            style={{ width: "100%" }}
            onChange={(event) => props.chonDichVu(event)}
            options={props.listOption}
          />

          <hr />

          <Table dataSource={props.listData} columns={columns} pagination={{ pageSize: 5 }} ></Table> <br />



        </div>

      

        <div className="form-data1">

        <h4 className="text-form-2024">
					Giỏ hàng dịch vụ
				</h4>
        <hr />
          <Table dataSource={props.listGioHang} columns={column2s} pagination={{ pageSize: 5 }} ></Table> <br />
  
        </div>
       
      </div>
      <center>

      <div className="list-control-search">
      <button
          type="button"
          className="btn btn-default"
          onClick={() => props.closeDialog()} >

          {props.mode === "view" ? "Đóng" : "Đóng"}
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => props.handleAddDichVu()} >

          {props.mode === "view" ? "Lưu" : "Lưu"}
        </button>

      </div>


      </center>
    </div>
  );
}

export default DichVuView;
