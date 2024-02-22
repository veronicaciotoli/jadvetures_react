import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomepageWithoutLogin from './homepage/HomepageWithoutLogin';
import Navbar from './navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.css';



function App() {
  return (
   <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route index element={<HomepageWithoutLogin />} />

        </Routes>
      </BrowserRouter>
   </>
   
  );
}

export default App;
