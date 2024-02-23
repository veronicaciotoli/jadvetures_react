import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { atom } from 'jotai';
import { useAtom } from 'jotai';

export default function Login() {
    const [error, setError] = useState('');
    const nameIn = useRef(null);
    const pwIn = useRef(null);
    const navigate = useNavigate();

    const guildGlob = atom({});
    const [guild, setGuild] = useAtom(guildGlob);

    function handleLogin() {
        const name = nameIn.current.value;
        const authenticationSeal = pwIn.current.value;

        axios.get(`/api/guild/${name}`)
            .then(response => {
                const guildData = response.data;
                setGuild(response.data);
                if (guildData.name === name && guildData.authentication_seal === authenticationSeal) {
                    navigate('/homepagewithlogin');
                } else {
                    setError('Credenziali non valide. Si prega di riprovare.');
                }
            })
            .catch(error => {
                console.error('Errore durante il recupero dei dati:', error);
                setError('Si è verificato un errore durante il login. Il nome utente o la pw sono errati.');
            });


    }

    return (
        <>
            <input type="btn" ref={nameIn} placeholder="GUILD NAME" />
            <input type="password" ref={pwIn} placeholder="AUTHENTICATION SEAL" />
            <button onClick={handleLogin}> LOGIN </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    );
}