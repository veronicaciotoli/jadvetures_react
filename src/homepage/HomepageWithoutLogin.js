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
            <div class="card" style={{ backgroundColor: "#E9E9FD" }}>
                <div class="card-body">
                    <h5 class="card-title"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status}</h6>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="row">
                <div className="col-4 d-flex justify-content-center text-center">
                    FILTRI
                </div>
                <div className="card" style={{ width: "18rem" }}>
                    {quests.map(q => readOnlyCard(q))}
                </div>
            </div>
        </>
    )



}
