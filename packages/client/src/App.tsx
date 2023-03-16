import { useEffect } from 'react';
import './assets/styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { LoadingProvider } from './components/LoaderComponent';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <>
      <LoadingProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </>
  );
}

export default App;
