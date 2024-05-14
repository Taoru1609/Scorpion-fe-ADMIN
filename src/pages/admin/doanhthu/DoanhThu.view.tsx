import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Select, Table } from "antd";
import React from "react";
import { FieldControl, FieldGroup } from "react-reactive-form";
import ChartBarBasic from "src/common/controls/ChartBarBasic";
import InputText from "src/common/controls/InputText";


export const DoanhThuView = (props: any) => {

  const columns = [


    {
      title: 'Tổng doanh thu',

      dataIndex: 'tongDoanhThu',
      key: 'tongDoanhThu',
      render: (number: number) => {
        return (
          <div>
            {props.formatNumber(number)} <span> VNĐ</span>
          </div>
        );
      }

    },
  ];

  return (<div>
    <div className="layout-room-diagram" style={{paddingRight: "2rem"}}>
    <h2 className="breadcrumb-title">
					Doanh thu
				</h2>
		
  
      <label>Lọc doanh thu theo : </label>
      <Select
        fieldNames={{ label: 'text', value: 'value' }}
        style={{ width: "100%" }}
        onChange={(event) => props.chonDichVu(event)}
        options={props.dropdown}

        defaultValue={1}

      />
      <Table dataSource={props.listData} columns={columns} pagination={false} ></Table> <br />

      <ChartBarBasic type="column" text={"Biểu đồ doanh thu"} height={600} xData={props.xData} columnData={props.columnData} />
    </div>
    



  </div>);
}

export default DoanhThuView;
