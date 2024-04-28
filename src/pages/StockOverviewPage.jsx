import AutoComplete from '../components/AutoComplete'
import StockList from '../components/StockList'


function StockOverviewPage() {
     return (
          <div>
               <img src={"/tradeKing.jpg"} alt={"Trade King"}
                    className='m-4 justify-content-center'
                    height='8%' width='8%' />
               <AutoComplete />
               <StockList />
          </div >
     )
}

export default StockOverviewPage