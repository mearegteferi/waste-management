import { BrowserRouter, Routes, Route } from 'react-router'
import Login from "./components/Login"

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
