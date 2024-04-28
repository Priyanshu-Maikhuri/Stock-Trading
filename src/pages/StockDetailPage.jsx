import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import alphavantage from '../apis/alphavantage'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'

const formatData = (data, series) => {
  const timeSeries = data[series];
  console.log(`Showing data:      ${series} --------------`)
  return Object.keys(timeSeries).map(date => {
    return {
      x: new Date(date).getTime(),  //timestamp
      y: parseFloat(timeSeries[date]['4. close']) //closeprice
    }
  })
}

function StockDetailPage() {
  const { symbol } = useParams()
  const [intraday, setIntradayData] = useState()
  const [weekly, setWeeklyyData] = useState()
  const [monthly, setMonthlyData] = useState()

  // const data = [{
  //   "Time Series (5min)": {
  //     "2024-04-02 19:55:00": {
  //       "1. open": "188.9900",
  //       "2. high": "188.9900",
  //       "3. low": "188.9900",
  //       "4. close": "188.9900",
  //       "5. volume": "2"
  //     },
  //     "2024-04-02 19:50:00": {
  //       "1. open": "188.9600",
  //       "2. high": "188.9600",
  //       "3. low": "188.9200",
  //       "4. close": "188.9200",
  //       "5. volume": "3"
  //     },
  //     "2024-04-02 19:45:00": {
  //       "1. open": "189.0000",
  //       "2. high": "189.0000",
  //       "3. low": "188.9000",
  //       "4. close": "188.9000",
  //       "5. volume": "201"
  //     },
  //     "2024-04-02 19:40:00": {
  //       "1. open": "188.9900",
  //       "2. high": "188.9900",
  //       "3. low": "188.9000",
  //       "4. close": "188.9000",
  //       "5. volume": "11"
  //     },
  //     "2024-04-02 19:25:00": {
  //       "1. open": "188.9900",
  //       "2. high": "188.9900",
  //       "3. low": "188.8000",
  //       "4. close": "188.8000",
  //       "5. volume": "185"
  //     },
  //     "2024-04-02 19:15:00": {
  //       "1. open": "188.9900",
  //       "2. high": "189.0000",
  //       "3. low": "188.8100",
  //       "4. close": "189.0000",
  //       "5. volume": "108"
  //     },
  //   }
  // },
  // {
  //   "Weekly Time Series": {
  //     "2024-04-02": {
  //       "1. open": "190.0000",
  //       "2. high": "190.4600",
  //       "3. low": "187.6000",
  //       "4. close": "188.8800",
  //       "5. volume": "5052297"
  //     },
  //     "2024-03-28": {
  //       "1. open": "190.2600",
  //       "2. high": "191.9299",
  //       "3. low": "188.5000",
  //       "4. close": "190.9600",
  //       "5. volume": "15383298"
  //     },
  //     "2024-03-22": {
  //       "1. open": "191.7000",
  //       "2. high": "193.9800",
  //       "3. low": "190.0100",
  //       "4. close": "190.8400",
  //       "5. volume": "23968505"
  //     },
  //     "2024-03-15": {
  //       "1. open": "195.0900",
  //       "2. high": "199.1800",
  //       "3. low": "190.7000",
  //       "4. close": "191.0700",
  //       "5. volume": "27466323"
  //     },
  //   }
  // },
  // {
  //   "Monthly Time Series": {
  //     "2024-04-02": {
  //       "1. open": "190.0000",
  //       "2. high": "190.4600",
  //       "3. low": "187.6000",
  //       "4. close": "188.8800",
  //       "5. volume": "5052297"
  //     },
  //     "2024-03-28": {
  //       "1. open": "185.4900",
  //       "2. high": "199.1800",
  //       "3. low": "185.1800",
  //       "4. close": "190.9600",
  //       "5. volume": "99921776"
  //     },
  //     "2024-02-29": {
  //       "1. open": "183.6300",
  //       "2. high": "188.9500",
  //       "3. low": "178.7500",
  //       "4. close": "185.0300",
  //       "5. volume": "88679550"
  //     },
  //     "2024-01-31": {
  //       "1. open": "162.8300",
  //       "2. high": "196.9000",
  //       "3. low": "157.8850",
  //       "4. close": "183.6600",
  //       "5. volume": "128121557"
  //     },
  //     "2023-12-29": {
  //       "1. open": "158.4100",
  //       "2. high": "166.3400",
  //       "3. low": "158.0000",
  //       "4. close": "163.5500",
  //       "5. volume": "87358302"
  //     },
  //   }
  // }
  // ];
  // useEffect(() => {
  //   // console.log('Datasssssssss--------------------')
  //   // console.log(formatData(data[0], "Time Series (5min)"));
  //   setIntradayData(() => formatData(data[0], "Time Series (5min)"));
  //   setWeeklyyData(() => formatData(data[1], "Weekly Time Series"))
  //   setMonthlyData(() => formatData(data[2], "Monthly Time Series"))
  //   // setChartData({
  //   //   intraday: () => formatData(data[0], "Time Series (5min)"),
  //   //   weekly: () => formatData(data[1], "Weekly Time Series"),
  //   //   monthly: () => formatData(data[2], "Monthly Time Series")
  //   // })
  //   console.log('Hereeeee=============');
  //   console.log(intraday);
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          alphavantage.get('/query', {
            params: {
              function: 'TIME_SERIES_INTRADAY',
              symbol,
              interval: '5min'
            }
          }),
          alphavantage.get('/query', {
            params: {
              function: 'TIME_SERIES_WEEKLY',
              symbol,
            }
          }),
          alphavantage.get('/query', {
            params: {
              function: 'TIME_SERIES_MONTHLY',
              symbol,
            }
          })
        ])
        console.log(responses);
        if (!responses[0].data['Information']) {
          // setChartData({
          //   intraday: formatData(responses[0].data, "Time Series (5min)"),
          //   weekly: formatData(responses[1].data, "Weekly Time Series"),
          //   monthly: formatData(responses[2].data, "Monthly Time Series")
          // })
          setIntradayData(() => formatData(responses[0].data, "Time Series (5min)"))
          setWeeklyyData(() => formatData(responses[1].data, "Weekly Time Series"))
          setMonthlyData(() => formatData(responses[2].data, "Monthly Time Series"))
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [])
  console.log("object");
  return <div>
    {
      (intraday && weekly && monthly) ?
        (< div >
          <StockChart intraday={intraday} weekly={weekly} monthly={monthly} symbol={symbol} />
          <StockData symbol={symbol} />
        </div>)
        : <div className='p-5'>
          <center>
            <h3 className='mt-7'>Sad to inform that the API used to show chart data of the stock now has rate limit of 25 requests per day</h3>
            <em>Thank you for using Stock Trading (Alpha Vantage!)</em>
            <StockData symbol={symbol} />
          </center>
        </div>
    }
  </div >
}

export default StockDetailPage