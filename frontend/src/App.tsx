import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Strategies from './pages/Strategies'
import StrategyBuilder from './pages/StrategyBuilder'
import Backtest from './pages/Backtest'
import PaperTrading from './pages/PaperTrading'
import LiveTrading from './pages/LiveTrading'
import Marketplace from './pages/Marketplace'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="strategies" element={<Strategies />} />
          <Route path="builder" element={<StrategyBuilder />} />
          <Route path="backtest" element={<Backtest />} />
          <Route path="paper-trading" element={<PaperTrading />} />
          <Route path="live-trading" element={<LiveTrading />} />
          <Route path="marketplace" element={<Marketplace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
