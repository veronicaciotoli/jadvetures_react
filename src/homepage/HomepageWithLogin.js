import NavbarWithMyQuests from "../navbar/NavbarWithMyQuests"
import { useEffect, useState, useRef } from "react";
import axios from "axios";




export default function HomepageWithoutLogin() {
    const [quests, setQuests] = useState([]);
    const [minRank, setMin] = useState(0);
    const [maxRank, setMax] = useState(6);
    const [flicker, setFlicker] = useState(false);

    const typeIn = useRef(null)
    const minIn = useRef(null);
    const maxIn = useRef(null);
    const rewardIn = useRef(null);
    const areaIn = useRef(null);



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
                    <h6 class="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status} Rank: {q.rank}</h6>
                </div>
            </div>
        )
    }

    function fromLetterToNumber(letter) {
        let value;

        switch (letter) {
            case "S":
                value = 5;
                break;

            case "A":
                value = 4;
                break;

            case "B":
                value = 3;
                break;

            case "C":
                value = 2;
                break;

            case "D":
                value = 1;
                break;

            default:
                value = -1
        }
        return value;

    }

    function isShowable(q, type, minRank, maxRank, minReward, area, status) {
        console.log(q)
        console.log(type)
        console.log(minRank)
        console.log(maxRank)
        console.log("----")

        if (type &&
            (
                !q.type.toLowerCase().includes(type.toLowerCase()))
        )
            return false;

        if (area &&
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

        let numMinRank = fromLetterToNumber(minRank) == -1 ? 1 : fromLetterToNumber(minRank)
        let quest_rank = fromLetterToNumber(q.rank)
        let numMaxRank = fromLetterToNumber(maxRank) == -1 ? 5 : fromLetterToNumber(maxRank)


        if (quest_rank < numMinRank || quest_rank > numMaxRank)
            return false;

        if (q.reward < minReward)
            return false;

        return true;

    }


    return (
        <>
        <NavbarWithMyQuests/>
            <div className="row">
                <div className="col-4 p-4 text-center">
                    <div className="p-3">
                        <input type="btn" ref={typeIn} placeholder="Type" />
                        <br />
                        <label for="customRange1" class="form-label">Rank Min: </label>
                        <input type="btn" ref={minIn} className="form-range" id="customRange1" onChange={(e) => setMin(e.target.value)} />
                        <label for="customRange1" class="form-label">Rank Max: </label>
                        <input type="btn" ref={maxIn} className="form-range " id="customRange1" onChange={(e) => setMax(e.target.value)} />
                        <input type="btn" ref={rewardIn} placeholder="Reward" />
                        <input type="btn" ref={areaIn} placeholder="Area" />
                        <br />
                        <button onClick={() => setFlicker(!flicker)}> FILTRA </button>
                    </div>
                </div >
                <div className="col-8 p-4">
                    <div className="row">
                        {quests.filter(q => isShowable(q, typeIn.current.value, minIn.current.value, maxIn.current.value, rewardIn.current.value, areaIn.current.value)).map(q => (
                            <div key={q.id} className="col-4 p-2 ">
                                <div className="card" style={{ backgroundColor: "#E9E9FD" }}>
                                    {readOnlyCard(q)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )



}