import { BrowserRouter, Routes, Route } from 'react-router'
import Login from "./components/Login"
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
