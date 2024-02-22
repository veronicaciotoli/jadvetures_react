import { atom, useAtom } from 'jotai';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';




export default function Login()
{

    const[guilds, setGuilds] = useState([]);

    const nameIn = useRef(null);
    const pwIn = useRef(null);


    useEffect(
        () => {
            axios.get("/api/guild").then(
                (response) => {
                    setGuilds(response.data);
                }
            )
        },
        []
    );

    function pwValid(name, authentication_seal)
    {
        for(let g of guilds)
        {
            if(g.name==name && g.authentication_seal==authentication_seal)
                return true;
        }
    }

    let navigate = useNavigate();

    function handleLogin() {
        const name = nameIn.current.value;
        const authenticationSeal = pwIn.current.value;

        if (pwValid(name, authenticationSeal)) {
            // Effettua il login e reindirizza alla home page
            navigate('/homepagewithlogin');
        } else {
            // Mostra un messaggio di errore
            alert('Password non valida.');
        }
    }


    return(
        <>
        
        <input type="btn" ref={nameIn} placeholder="GUILD NAME" />
        <input type="btn" ref={pwIn} placeholder="AUTHENTICATION SEAL" />
        
        <button onClick={handleLogin}> LOGIN </button>
        
        </>
    );

}