import { Link } from "react-router-dom";
import { currentGuild } from "../App";
import { useAtom } from "jotai";
import axios from "axios";


const Navbar = (props) => {
    
    const[guild, setGuild] = useAtom(currentGuild);

    
   
    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary col-12 p-4">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">All Quests</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="container-fluid">
                        {guild&&<Link className="navbar-brand" to="/guildquests">My Quests</Link>}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                {!guild&&<Link className="nav-link active" aria-current="page" to="/login">LOGIN</Link>}
                                {guild&&<h1 className="nav-link active" aria-current="page" to="/">{guild.name}</h1>}
                                {guild&&<Link className="nav-link active" aria-current="page" to="/" onClick={()=>setGuild()}>
                                            <img src={guild.seal_img_url} alt="Guild Seal" />
                                            </Link> }
                            </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            

        </>
    );
    
}

export default Navbar;