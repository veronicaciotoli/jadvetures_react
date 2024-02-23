import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './homepage/Login';
import { atom } from 'jotai';
import Homepage from './homepage/Homepage';
import MyQuest from './quests/MyQuest';
import QuestDetail from './quests/QuestDetail';

export const currentGuild = atom();


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/guildquests" element={<MyQuest />}/>
          <Route path="/questdetail/:quest_id" element={<QuestDetail/>} />

          

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
