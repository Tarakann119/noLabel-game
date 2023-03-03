import { useEffect } from 'react'
import './App.css'
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Layout from './Layout';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
