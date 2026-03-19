import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RegisterVendor from './pages/RegisterVendor'
import VendorShop from './pages/VendorShop'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterVendor />} />
        <Route path="/shop/:id" element={<VendorShop />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
