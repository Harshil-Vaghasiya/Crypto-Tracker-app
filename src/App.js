import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';



function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        const data = await res.json()
        console.log(data);
        setCoins(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    // axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    //   .then(res => {
    //     setCoins(res.data)
    //     console.log(res.data)
    //   }).catch(error => console.log('there is some error ocured'))

    getData();
  }, [])

 
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Search a Currency</h1>
          <form>
            <input type="text" className='coin-input' placeholder='Search' onChange={(e)=>setSearch(e.target.value)} />
          </form>
        </div>
        {filteredCoins.map((coin) => {
          return <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        })
        }
      </div>
    </>
  );
}

export default App;
