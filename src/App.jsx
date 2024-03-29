import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from "./components/Header";
import Coins from "./components/Coins"
import Exchanges from "./components/Exchanges"
import Home from "./components/Home"
import CoinDetails from "./components/CoinDetails"
//main part
function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/coins' element= {<Coins/>}/>
        <Route path='/exchanges' element= {<Exchanges/>}/>
        <Route path='/coindetails/:id' element= {<CoinDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
