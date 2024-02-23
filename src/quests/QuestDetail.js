import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";



export default function QuestDetail()
{
    const [currentQuest, setCurrentQuest] = useState({});
    let {quest_id} = useParams();

    useEffect(
        ()=> {
            axios.get(`/quests/${quest_id}`).then((response) => 
            {
                setCurrentQuest(response.data);
                
            }).catch((err) => 
            {
                
            });
        },
        []
    );

    function synchronize(e)
    {
        setCurrentQuest({...currentQuest,[e.target.name]:e.target.value});
    }

    function readOnlyCard(q) {
        return (
            <div className="d-flex justify-content-center text-center" style={{backgroundColor: '#180434', minHeight: '100vh'}}>
            <div class="card m-3" style={{ backgroundColor: "#E9E9FD", height:'60%'}}>
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
                            <input type="text" class="form-control" name="description"value={currentQuest.description}  onChange={synchronize} />
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

    return(

        <>
        <Navbar/>
            <div className="card justify-content-center" style={{width:800, height:600, margin:"auto"}}> 
                    {currentQuest.status=="SUCCESS"&&currentQuest(
                                <div key={quest_id} className="col-4 p-2 ">
                                    <div className="card" style={{ backgroundColor: "#E9E9FD" }}>
                                        {readOnlyCard(currentQuest)} 
                                    </div>
                                </div>
                            )}
            </div>
        </>
    );
}