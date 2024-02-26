import { useState } from "react";
import { currentGuild } from "../../App";
import { useAtom } from "jotai";
import axios from "axios";


export default function QuestForm() {
    const [guild, setGuild] = useAtom(currentGuild);

    const [tempQuest, setTempQuest] = useState({
        patron_id: guild.id,
        date_created: "",
        status: "",
        rank: "",
        reward: "",
        area: "",
        date_completed: "",
        map_url: "",
        description: "",
        type: ""
    });


    function synchronize(e) {
        setTempQuest({ ...tempQuest, [e.target.name]: e.target.value });
    }

    function insert() {
        axios.post(`/quests/${guild.id}`, tempQuest)
            .then((response) => {

                let clone = { ...guild };
                clone.posted_quests.push(response.data);
                setGuild(clone);
                clear();
            })
            .catch(error => {
                // Gestione degli errori, se necessario
                console.error("Si è verificato un errore durante la richiesta POST:", error);
            });

    }


    function clear() {
        setTempQuest({
            patron_id: guild.id,
            date_created: "",
            status: "",
            rank: "",
            reward: "",
            area: "",
            date_completed: "",
            map_url: "",
            description: "",
            type: ""
        })
    }

    return (
        <>
            <div className="d-flex justify-content-center text-center" style={{ backgroundColor: '#180434', minHeight: '100vh' }}>
                <div class="card m-3" style={{ backgroundColor: "#E9E9FD", height: '60%' }}>
                    <div class="card-body">
                        <h2>AGGIUNGI QUEST</h2>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Date Created</span>
                            <input type="date" class="form-control" name="date_created" value={tempQuest.date_created} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Status</span>
                            <input type="text" class="form-control" name="status" value={tempQuest.status} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Rank</span>
                            <input type="text" class="form-control" name="rank" value={tempQuest.rank} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Reward</span>
                            <input type="number" class="form-control" name="reward" value={tempQuest.reward} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Area</span>
                            <input type="text" class="form-control" name="area" value={tempQuest.area} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Date Completed</span>
                            <input type="date" class="form-control" name="date_completed" value={tempQuest.date_completed} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Map Url</span>
                            <input type="text" class="form-control" name="map_url" value={tempQuest.map_url} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Description</span>
                            <input type="text" class="form-control" name="description" value={tempQuest.description} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Type</span>
                            <input type="text" class="form-control" name="type" value={tempQuest.type} onChange={synchronize} />
                        </div>
                        <div>
                            <button className="btn" onClick={clear} style={{ color: "#562BA6" }}><strong>CANCEL</strong></button>
                            <button className="btn" onClick={insert} style={{ color: "#562BA6" }}><strong>SAVE</strong></button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}