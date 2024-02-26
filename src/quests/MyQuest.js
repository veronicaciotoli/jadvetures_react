import { currentGuild } from "../App";
import { useAtom } from "jotai";
import Navbar from "../navbar/Navbar";
import QuestForm from "./QuestForm";
import { Link } from "react-router-dom";

export default function MyQuest() {
    const [guild, setGuild] = useAtom(currentGuild);




    function readOnlyCard(q) {
        return (
            <div className="card text-center" style={{ backgroundColor: "rgba(233, 233, 253, 0.5)"}}>
                <div className="card-body text-center">
                    <h5 className="card-title text-center"> Type: {q.type} <br /> Reward: {q.reward}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Area: {q.area} <br /> Status: {q.status} Rank: {q.rank}</h6>
                </div>
            </div>
        )
    }


    return (
        <>
            <Navbar />

            <div className="row" style={{ minHeight: '100vh', backgroundImage: `url('https://img6.arthub.ai/64b27b4f-1343.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="col-4 p-4 text-center">
                    <div className="p-3">
                        <QuestForm />

                    </div>
                </div >
                <div className="col-8 p-4">
                    <div className="row">
                        {guild && guild.posted_quests.map(q => (
                            <div key={q.id} className="col-4 p-2 ">
                                <div className="card text center" style={{ backgroundColor: "rgba(233, 233, 253, 0)" }}>
                                    <Link className="text-decoration-none" to={`/questdetail/${q.id}`}>{readOnlyCard(q)} </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </>
    )
}