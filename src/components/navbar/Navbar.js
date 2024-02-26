import { Link } from "react-router-dom";
import { currentGuild, currentParty } from "../../App";
import { useAtom } from "jotai";
import axios from "axios";


const Navbar = (props) => {

    const [guild, setGuild] = useAtom(currentGuild);
    const [party, setParty] = useAtom(currentParty);

    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg col-12 p-2" style={{ backgroundColor: "#1c100b" }}>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse justify-content-left">
                            <Link className="navbar-brand text-light" to="/">All Quests</Link>
                        </div>

                        <div className="collapse navbar-collapse justify-content-center ">
                            {guild && <Link className="navbar-brand text-light" to="/guildquests" >My Quests</Link>}
                            {party && <Link className="navbar-brand text-light" to="/mypartyquests" >My Quests</Link>}
                        </div>

                        <div className="collapse navbar-collapse justify-content-center ">
                            {party && <Link className="navbar-brand text-light" to="/partyquests" >Available Quests</Link>}
                        </div>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            {!guild && <Link className="nav-link active text-light" aria-current="page" to="/login">LOGIN GUILD</Link>}
                            {guild && <h1 className="nav-link active m-3 text-light" aria-current="page" to="/">{guild.name}</h1>}
                            {guild && <Link className="nav-link active" aria-current="page" to="/" onClick={() => setGuild()}>
                                <img src={guild.seal_img_url} alt="Guild Seal" style={{ width: 60, height: 60 }} />
                            </Link>}

                            {!party && <Link className="nav-link active text-light" aria-current="page" to="/login">LOGIN PARTY</Link>}
                            {party && <h1 className="nav-link active m-3 text-light" aria-current="page" to="/">{party.name}</h1>}
                            {party && <Link className="nav-link active text-light" aria-current="page" to="/" onClick={() => setParty()}>
                                LOG OUT
                            </Link>}
                        </div>
                    </div>
                </nav>
            </div>


        </>
    );

}

export default Navbar;