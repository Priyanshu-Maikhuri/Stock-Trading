import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import finnhub from '../apis/finnHub';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import { WatchListContext } from '../context/watchListContext';

function StockList() {
     const { watchList, deleteStock } = useContext(WatchListContext)
     const [stock, setStock] = useState([])
     const navigate = useNavigate()

     const changeColor = (change) => {
          return change > 0 ? "success" : "danger"
     }

     const renderIcons = (change) => {
          return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
     }

     useEffect(() => {
          let isMounted = true //component
          const fetchData = async () => {
               try {
                    const responses = await Promise.all(watchList.map((stock) => {
                         return finnhub.get("/quote", {
                              params: {
                                   symbol: stock
                              }
                         })
                    }))
                    const data = responses.map((res) => {
                         return {
                              data: res.data,
                              symbol: res.config.params.symbol
                         }
                    });
                    if (isMounted) {
                         setStock(data)
                    }
               }
               catch (e) {
                    console.log(e);
               }
          }
          fetchData()
          return () => (isMounted = false)
     }, [watchList])

     const handleStockSelect = (stockSymbol) => {
          navigate(`detail/${stockSymbol}`)
     }

     return (
          <div>
               <table className='table hover mt-5'>
                    <thead style={{ color: 'rgb(79,89,102' }}>
                         <tr>
                              <th scope='col'>Name</th>
                              <th scope='col'>Last</th>
                              <th scope='col'>Chg</th>
                              <th scope='col'>Chg%</th>
                              <th scope='col'>High</th>
                              <th scope='col'>Low</th>
                              <th scope='col'>Open</th>
                              <th scope='col'>Pclose</th>
                         </tr>
                    </thead>
                    <tbody>
                         {
                              stock.map((stockData) => {
                                   return (
                                        <tr className='table-row'
                                             key={stockData.symbol}
                                             style={{ cursor: "pointer" }}
                                             onClick={() => handleStockSelect(stockData.symbol)}>
                                             <th scope='row'>{stockData.symbol}</th>
                                             <td>{stockData.data.c}</td>
                                             <td className={`text-${changeColor(stockData.data.d)}`}>
                                                  {stockData.data.d} {renderIcons(stockData.data.dp)}</td>
                                             <td className={`text-${changeColor(stockData.data.d)}`}>
                                                  {stockData.data.dp} {renderIcons(stockData.data.dp)}</td>
                                             <td>{stockData.data.h}</td>
                                             <td>{stockData.data.l}</td>
                                             <td>{stockData.data.o}</td>
                                             <td>{stockData.data.pc}
                                                  <button
                                                       className='btn btn-danger ml-3 btn-sm delete-btn'
                                                       onClick={(e) => {
                                                            e.stopPropagation() //preventing bubbling
                                                            deleteStock(stockData.symbol)
                                                       }}>
                                                       Remove</button>
                                             </td>
                                        </tr>
                                   )
                              })
                         }
                    </tbody>
               </table>
          </div>
     )
}

export default StockList