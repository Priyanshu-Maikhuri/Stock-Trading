import { useState, useEffect, useContext } from 'react'
import finnHub from '../apis/finnHub'
import { WatchListContext } from '../context/watchListContext'

function AutoComplete() {
     const [search, setSearch] = useState("")
     const [result, setResult] = useState([])
     const { addStock } = useContext(WatchListContext)

     const renderDropDown = () => {
          var showDropdown = search ? "show" : null
          return (
               <ul className={`dropdown-menu ${showDropdown}`}
                    style={{
                         height: '500px',
                         overflowY: 'scroll',
                         overflowX: 'hidden',
                         cursor: 'pointer'
                    }}>
                    {result.map((res) => {
                         return (<li
                              key={res.symbol}
                              className='dropdown-item'
                              onClick={() => {
                                   addStock(res.symbol)
                                   setSearch("")
                              }}>
                              {res.description} ({res.displaySymbol})
                         </li>
                         )
                    })}
               </ul>
          )
     }

     useEffect(() => {
          let isMounted = true //component
          const fetchData = async () => {
               try {
                    const response = await finnHub.get('/search', {
                         params: {
                              q: search
                         }
                    })
                    console.log(response)
                    if (isMounted) {
                         setResult(response.data.result)
                    }
               } catch (e) {
                    console.log(e);
               }
          }
          if (search.length > 0) {
               fetchData()
          }
          else setResult([])
     }, [search])
     return (
          <div className='pd-5 w-50 rounded mx-auto'>
               <div className="form-floating dropdown">
                    <input type="text"
                         style={{ backgroundColor: 'rgba(145, 158, 171, 0.04' }}
                         id='search'
                         className='form-control'
                         placeholder='Search'
                         autoComplete='off'
                         value={search}
                         onChange={(e) => {
                              setSearch(e.target.value)
                         }} />
                    <label htmlFor="search">Search</label>
                    {renderDropDown()}
               </div>
          </div>
     )
}

export default AutoComplete