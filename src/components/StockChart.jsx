import { useState } from 'react'
import Chart from 'react-apexcharts'

function StockChart({ intraday, weekly, monthly, symbol }) {
     const [dataFormat, setDataFormat] = useState("day")

     const determineTimeFormat = () => {
          switch (dataFormat) {
               case "day":
                    return intraday
               case "week":
                    return weekly
               case "month":
                    return monthly
               default:
                    return intraday
          }
     }

     const color = (determineTimeFormat().at(-1).y -
          determineTimeFormat()[0].y) < 0 ? "#26C281" : "#ed3419"

     const options = {
          colors: [color],
          title: {
               text: symbol,
               align: 'center',
               style: {
                    fontSize: "24px"
               }
          },
          chart: {
               id: "stock data",
               animations: {
                    speed: 1500
               }
          },
          dataLabels: {
               enabled: false
          },
          xaxis: {
               type: 'datetime',
               labels: {
                    datetimeUTC: false
               }
          },
          tooltip: {
               x: {
                    format: "dd MMM HH:MM"
               }
          }
     }

     const series = [{
          name: symbol,
          data: determineTimeFormat()
     }]

     const renderButtonSelect = (button) => {
          var classes = "btn m-1 "
          classes += (button === dataFormat) ? "btn-primary" : "btn-outline-primary"
          return classes;
     }
     return (
          <div className='mt-5 p-4 shadow-sm bg-white'>
               <Chart options={options} series={series} type='area' width='100%' height='250%' />
               <div>
                    <button
                         className={renderButtonSelect("day")}
                         onClick={() => setDataFormat("day")}
                    >intraday</button>
                    <button
                         className={renderButtonSelect("week")}
                         onClick={() => setDataFormat("week")}
                    >weekly</button>
                    <button
                         className={renderButtonSelect("month")}
                         onClick={() => setDataFormat("month")}
                    >monthly</button>
               </div>
          </div>
     )
}

export default StockChart
