import { useAtom } from "jotai";
import { currentParty } from "../../App";
import Navbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPartyQuests() {

    const [party, setParty] = useAtom(currentParty);
    const [quests, setQuests] = useState([]);

    useEffect(
        () => {
            axios.get(`/party/${party.id}`).then((response) => {
                setParty(response.data);
                setQuests(party.quests);

            }).catch((err) => {

            });
        },
        []
    );

    function readOnlyCard(q) {
        return (
            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status}<br /> Rank: {q.rank}</h6>
                    <button className="btn" onClick={() => handleSucc(q.id)} style={{ color: "#562BA6" }}><strong>SUCCESS</strong></button>
                    <button className="btn" onClick={() => handleFail(q.id)} style={{ color: "#562BA6" }}><strong>FAILED</strong></button>
                </div>
            </div>
        )
    }

    function handleSucc(id) {
        axios.put("/quests/succeding/" + id + "/" + party.id)
            .then(response => {
                let clone = [...quests];
                clone[clone.findIndex(q => q.id == response.data.id)] = response.data;
                setQuests(clone);
            })
            .catch(error => {
                console.error("Errore durante la modifica della quest:", error);
                // Gestisci l'errore e fornisci un feedback all'utente
            });
    }

    function handleFail(id) {
        axios.put("/quests/failing/" + id + "/" + party.id)
            .then(response => {
                let clone = [...party.quests];
                clone[clone.findIndex(q => q.id == response.data.id)] = response.data;
                setQuests(clone);
            })
            .catch(error => {
                console.error("Errore durante la modifica della quest:", error);
                // Gestisci l'errore e fornisci un feedback all'utente
            });
    }


    return (
        <>
            <Navbar />

            <div style={{ minHeight: '100vh', backgroundImage: `url('https://img6.arthub.ai/64b27b4f-1343.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <div className="row" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)", height: '60%' }}>
                    {quests.map(q => (
                        <div key={q.id} className="col-4 p-2" >
                            <div className="card text center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                                {readOnlyCard(q)}
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}
