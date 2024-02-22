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

    function isShowable(q, type, minRank, maxRank, minReward, area, status) {
        if (
            type &&
            (
                !q.type.toLowerCase().includes(type.toLowerCase())
            )
        )
            return false;

        if (
            area &&
            (
                !q.area.toLowerCase().includes(area.toLowerCase())
            )
        )
            return false;

        if (
            status &&
            (
                !q.status.toLowerCase().includes(status.toLowerCase())
            )
        )
            return false;

        let minValue = 0;

        switch (minRank) {
            case "S":
                minValue = 5;
                break;

            case "A":
                minValue = 4;
                break;

            case "B":
                minValue = 3;
                break;

            case "C":
                minValue = 2;
                break;

            case "D":
                minValue = 1;
                break;
        }

        let maxValue = 0;

        switch (maxRank) {
            case "S":
                maxValue = 5;
                break;

            case "A":
                maxValue = 4;
                break;

            case "B":
                maxValue = 3;
                break;

            case "C":
                maxValue = 2;
                break;

            case "D":
                maxValue = 1;
                break;
        }

        if (q.min < minPrice || p.price > maxPrice)
            return false;

        return true;

    }


    return (
        <>
            <div className="row">
                <div className="col-4 p-4 text-center">
                    FILTRI
                </div>
                <div className="col-8 p-4">
                    <div className="row">
                        {quests.map(q => (
                            <div key={q.id} className="col-4 p-2 ">
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
