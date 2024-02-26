import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { currentGuild } from '../App';


export default function Login() {

    const [guild, setGuild] = useAtom(currentGuild);

    const nameIn = useRef(null);
    const pwIn = useRef(null);


    let navigate = useNavigate();

    function handleLogin() {

        const requestBody = {
            name: nameIn.current.value,
            authentication_seal: pwIn.current.value
        };


        axios.post("/guilds/login", requestBody)
            .then(response => {
                if (response.data) {
                    setGuild(response.data);
                    // Effettua il login e reindirizza alla home page
                    navigate('/');
                } else {
                    // Mostra un messaggio di errore
                    alert('Password o Username non validi.');
                }
            })
            .catch(error => {
                // Gestisci gli errori
                console.error('Errore nella richiesta di login della gilda:', error);
            });

    }

    return (
        <>
            <div className="d-flex justify-content-center text-center" style={{ minHeight: '100vh', backgroundImage: `url('https://img6.arthub.ai/64b27b4f-1343.webp')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div class="card m-4" style={{ backgroundColor: "r#a49f9d", height: '60%' }}>
                    <div class="card-body m-3 p-4">
                        <h2 class="text-dark">ESEGUI LOGIN</h2>
                        <input className="mb-3 mt-3" type="btn" ref={nameIn} placeholder="GUILD NAME" />
                        <br />
                        <input className="mb-3" type="password" ref={pwIn} placeholder="AUTHENTICATION SEAL" />
                        <br />
                        <button onClick={handleLogin}> LOGIN </button>

                    </div>
                </div>
            </div>


        </>
    );

}