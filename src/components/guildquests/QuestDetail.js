import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import { useAtom } from "jotai";
import { currentGuild } from "../../App";



export default function QuestDetail() {
    let navigate = useNavigate();
    const [currentQuest, setCurrentQuest] = useState({});
    let { quest_id } = useParams();

    const [guild, setGuild] = useAtom(currentGuild);

    useEffect(
        () => {
            axios.get(`/quests/${quest_id}`).then((response) => {
                setCurrentQuest(response.data);

            }).catch((err) => {

            });
        },
        []
    );

    function synchronize(e) {
        setCurrentQuest({ ...currentQuest, [e.target.name]: e.target.value });
    }

    function modifyCard(q) {
        return (
            <div className="d-flex justify-content-center text-center" style={{ backgroundColor: '#180434', minHeight: '100vh' }}>
                <div class="card m-3" style={{ backgroundColor: "#E9E9FD" }}>
                    <div class="card-body">
                        <h2>MODIFICA/ELIMINA QUEST</h2>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Date Created</span>
                            <input type="date" class="form-control" name="date_created" value={currentQuest.date_created} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Status</span>
                            <input type="text" class="form-control" name="status" value={currentQuest.status} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Rank</span>
                            <input type="text" class="form-control" name="rank" value={currentQuest.rank} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Reward</span>
                            <input type="number" class="form-control" name="reward" value={currentQuest.reward} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Area</span>
                            <input type="text" class="form-control" name="area" value={currentQuest.area} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Date Completed</span>
                            <input type="date" class="form-control" name="date_completed" value={currentQuest.date_completed} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Map Url</span>
                            <input type="text" class="form-control" name="map_url" value={currentQuest.map_url} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Description</span>
                            <input type="text" class="form-control" name="description" value={currentQuest.description} onChange={synchronize} />
                        </div>
                        <div class="input-group mb-3 card-title">
                            <span class="input-group-text" >Type</span>
                            <input type="text" class="form-control" name="type" value={currentQuest.type} onChange={synchronize} />
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }

    function readCard(q) {
        return (
            <div className="d-flex justify-content-center text-center" style={{ backgroundColor: '#180434', minHeight: '100vh' }}>
                <div className="card m-3" style={{ backgroundColor: "#E9E9FD" }}>
                    <div className="card-body">
                        <h2>DETTAGLI QUEST</h2>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Date Created</span>
                            <span className="form-control">{currentQuest.date_created}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Status</span>
                            <span className="form-control">{currentQuest.status}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Rank</span>
                            <span className="form-control">{currentQuest.rank}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Reward</span>
                            <span className="form-control">{currentQuest.reward}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Area</span>
                            <span className="form-control">{currentQuest.area}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Date Completed</span>
                            <span className="form-control">{currentQuest.date_completed}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Map Url</span>
                            <span className="form-control">{currentQuest.map_url}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Description</span>
                            <span className="form-control">{currentQuest.description}</span>
                        </div>
                        <div className="input-group mb-3 card-title">
                            <span className="input-group-text">Type</span>
                            <span className="form-control">{currentQuest.type}</span>
                        </div>
                    </div>
                </div>
            </div>


        )
    }

    function modifyQuest(id) {
        axios.put("/quests/" + id, currentQuest)
            .then(response => {
                setCurrentQuest(response.data);
                let cloneG = { ...guild };
                let pos = cloneG.posted_quests.findIndex(q => q.id == id);
                cloneG.posted_quests[pos] = response.data;
                setGuild(cloneG);
            })
            .catch(error => {
                console.error("Errore durante la modifica della quest:", error);
                // Gestisci l'errore e fornisci un feedback all'utente
            });
        navigate("/guildquests")
    }

    function deleteQuest(id) {
        axios.delete("/quests/" + id).then(
            () => {
                setCurrentQuest({})
                let cloneG = { ...guild };
                let pos = cloneG.posted_quests.findIndex(q => q.id == id);
                cloneG.posted_quests.splice(pos, 1);
                setGuild(cloneG);
                navigate("/guildquests")
            }
        )

    }


    return (

        <>
            <Navbar />
            <div className="card justify-content-center" style={{ width: 800, height: 600, margin: "auto" }}>
                {currentQuest.status == "AWAITING" &&
                    <div className="card" style={{ backgroundColor: "#E9E9FD" }} >
                        {modifyCard(currentQuest)}
                        <button className="btn" onClick={() => modifyQuest(quest_id)} style={{ color: "#562BA6" }}><strong>SAVE</strong></button>
                        <button className="btn" onClick={() => deleteQuest(quest_id)} style={{ color: "#562BA6" }}><strong>DELETE</strong></button>
                    </div>
                }
                {!(currentQuest.status == "AWAITING") &&
                    <div className="card" style={{ backgroundColor: "#E9E9FD" }} >
                        {readCard(currentQuest)}
                    </div>
                }
            </div>
        </>
    );
}