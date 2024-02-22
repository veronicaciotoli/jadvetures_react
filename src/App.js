import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomepageWithoutLogin from './homepage/HomepageWithoutLogin';
import HomepageWithLogin from './homepage/HomepageWithLogin';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './homepage/Login';


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route index element={<HomepageWithoutLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepagewithlogin" element={<HomepageWithLogin />} />

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
