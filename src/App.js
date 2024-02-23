import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './homepage/Login';
import { atom } from 'jotai';
import Homepage from './homepage/Homepage';

 export const currentGuild = atom();


function App() {
  return (
   <>
      <BrowserRouter>
        
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />}/>
          

        </Routes>
      </BrowserRouter>
   </>
   
  );
}

export default App;
