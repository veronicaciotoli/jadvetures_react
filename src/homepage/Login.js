import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { currentGuild } from '../App';


export default function Login()
{

    const[guild, setGuild] = useAtom(currentGuild);

    const nameIn = useRef(null);
    const pwIn = useRef(null);

    
    let navigate = useNavigate();

    function handleLogin() {
    
        const requestBody = {
            name: nameIn.current.value,
            authentication_seal: pwIn.current.value
        };
        
        
        axios.post("/api/guildlogin", requestBody)
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

    return(
        <>
        
            <input type="btn" ref={nameIn} placeholder="GUILD NAME" />
            <input type="btn" ref={pwIn} placeholder="AUTHENTICATION SEAL" />
            
            <button onClick={handleLogin}> LOGIN </button>
                    
        </>
    );

}