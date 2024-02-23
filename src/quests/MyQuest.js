import { currentGuild } from "../App";
import { useAtom } from "jotai";
import Navbar from "../navbar/Navbar";
import QuestForm from "./QuestForm";
import { Link } from "react-router-dom";

export default function MyQuest() {
    const [guild, setGuild] = useAtom(currentGuild);




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


    return (
        <>
            <Navbar />

            <div className="row">
                <div className="col-4 p-4 text-center">
                    <div className="p-3">
                        <QuestForm />

                    </div>
                </div >
                <div className="col-8 p-4">
                    <div className="row">
                        {guild && guild.posted_quests.map(q => (
                            <div key={q.id} className="col-4 p-2 ">
                                <div className="card" style={{ backgroundColor: "#E9E9FD" }}>
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