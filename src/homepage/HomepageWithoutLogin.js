import Navbar from "../navbar/Navbar"
import { useEffect, useState } from "react";
import axios from "axios";



export default function HomepageWithoutLogin() {
    const [quests, setQuests] = useState([]);


    useEffect(
        () => {
            axios.get("/api/quest").then(
                (response) => {
                    setQuests(response.data);
                }
            )
        },
        []
    );

    function readOnlyCard(q) {
        return (
            <div className="row">
                <div class="card" style={{ backgroundColor: "#E9E9FD" }}>
                    <div class="card-body">
                        <h5 class="card-title"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status}</h6>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="row">
                <div className="col-4 p-4">
                    FILTRI
                </div>
                <div className="col-8 p-4">
                    <div className="row">
                        {quests.map(q => (
                            <div key={q.id} className="col-4 p-2 justify-content-center text-center">
                                <div className="card" style={{ backgroundColor: "#E9E9FD" }}>
                                    <div className="card-body">
                                        <h5 className="card-title"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status}</h6>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )



}
