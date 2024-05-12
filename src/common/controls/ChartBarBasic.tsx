import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React from 'react'

interface ChartProps {
  type?: string,
  text?: any,
  yText?: string,
  xData?: any[],
  columnData?: any[]
  height?:any
}

export const ChartBarBasic = ({type, text, yText, xData, columnData, height}: ChartProps) => {

  const styleClass:React.CSSProperties = {
    maxHeight: height,
    overflowY: 'auto'
  }

  const options = {
    chart: {
      type: type,
      height: height 
    },
    title: {
      text: text
    },
    xAxis: {
      categories: xData
    },
    yAxis: {
      title: {
        text: yText
      }
    },
    series: columnData
  }

  // [{
  //   name: 'Jane',
  //   data: [1, 0, 4]
  // }, {
  //   name: 'John',
  //   data: [5, 7, 3]
  // }]

  return (
    <div style={styleClass}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default ChartBarBasic
