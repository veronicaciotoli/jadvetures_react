import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/homepage/Login';
import { atom } from 'jotai';
import Homepage from './components/homepage/Homepage';
import MyQuest from './components/guildquests/MyQuest';
import QuestDetail from './components/guildquests/QuestDetail';
import PartyQuests from './components/partyquests/PartyQuests';
import MyPartyQuests from './components/partyquests/MyPartyQuests';

export const currentGuild = atom();

export const currentP = atom(JSON.parse(localStorage.getItem('party')) ?? null) //per non perdere dati al refresh

export const currentParty = atom(
  (get) => get(currentP),
  (get, set, newStr) => {
    set(currentP, newStr)
    localStorage.setItem('party', JSON.stringify(newStr))
  },
)


function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/guildquests" element={<MyQuest />} />
          <Route path="/questdetail/:quest_id" element={<QuestDetail />} />
          <Route path="/partyquests" element={<PartyQuests />} />
          <Route path="mypartyquests" element={<MyPartyQuests />} />

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
