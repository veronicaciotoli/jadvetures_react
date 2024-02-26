
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";




export default function Homepage() {
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
            <div class="card" >
                <div class="card-body" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
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
            <Navbar />
            <div className=" row d-flex justify-content-center text-center" style={{ minHeight: '100vh', backgroundImage: `url('https://spg-images.s3.us-west-1.amazonaws.com/5224f821-e178-4b0e-9371-02f1f0d71d4a')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <div className="col-4 p-4 text-center ">
                    <div className="card justify-content-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)", height: '60%' }}>
                        <div className="p-3">
                            <h2>FILTRI</h2>
                            <br />
                            <input className="mb-2 text-center" type="btn" ref={typeIn} placeholder="Type" />
                            <br/>
                            <input className="mb-2 text-center" type="btn" placeholder="Min Rank" ref={minIn} onChange={(e) => setMin(e.target.value)} />
                            <br/>
                            <input className="mb-2 text-center" type="btn" placeholder="Max Rank" ref={maxIn} onChange={(e) => setMax(e.target.value)} />
                            <br/>
                            <input className="mb-2 text-center" type="btn" ref={rewardIn} placeholder="Min Reward" />
                            <br/>
                            <input className="mb-2 text-center" type="btn" ref={areaIn} placeholder="Area" />
                            <br/>
                            <br />
                            <button onClick={() => setFlicker(!flicker)}> FILTRA </button>
                        </div>
                    </div>
                </div >
                <div className="col-8 p-4">
                    <div className="row" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)", height: '60%' }}>
                        {quests.filter(q => isShowable(q, typeIn.current.value, minIn.current.value, maxIn.current.value, rewardIn.current.value, areaIn.current.value)).map(q => (
                            <div key={q.id} className="col-4 p-2 ">
                                <div className="card" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)" }}>
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