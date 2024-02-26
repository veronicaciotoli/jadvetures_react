import { useAtom } from "jotai";
import { currentParty } from "../../App";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fromLetterToNumber } from "../../util/util";

export default function PartyQuests() {

    const [party, setParty] = useAtom(currentParty);
    const [quests, setQuests] = useState([]);

    useEffect(
        () => {
            axios.get("/quests").then(
                (response) => {
                    setQuests(response.data);
                }
            )
        },
        []
    );


    function readOnlyCard(q) {
        return (
            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status}  <br /> Rank: {q.rank}</h6>
                    <button className="btn" onClick={() => handleClick(q.id)} style={{ color: "#562BA6" }}><strong>ACCEPT</strong></button>
                </div>
            </div>
        )
    }

    function handleClick(id) {

        // setCurrentQuest(quests.filter(q => q.id == id));
        // let clone = { ...currentQuest } NON FUNZIONA 

        //let clone = quests.find(q => q.id == id);
        // clone.status = "PENDING";
        // clone.party_id = party.id;

        axios.put("/quests/accepting/" + id + "/" + party.id)
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


    return (
        <>
            <Navbar />

            <div style={{ minHeight: '100vh', backgroundImage: `url('https://img6.arthub.ai/64b27b4f-1343.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <div className="row" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)", height: '60%' }}>
                    {quests.filter(q => q.status == "AWAITING" && fromLetterToNumber(q.rank) <= fromLetterToNumber(party.evaluateRank)).map(q => (
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
