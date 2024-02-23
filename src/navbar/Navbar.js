import { Link } from "react-router-dom";
import { currentGuild } from "../App";
import { useAtom } from "jotai";
import axios from "axios";


const Navbar = (props) => {

    const [guild, setGuild] = useAtom(currentGuild);

    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg col-12 p-2" style={{ backgroundColor: "#291f12" }}>
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse justify-content-left">
                            <Link className="navbar-brand text-light" to="/">All Quests</Link>
                        </div>

                        <div className="collapse navbar-collapse justify-content-center ">
                            {guild && <Link className="navbar-brand text-light" to="/guildquests" >My Quests</Link>}
                        </div>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            {!guild && <Link className="nav-link active text-light" aria-current="page" to="/login">LOGIN</Link>}
                            {guild && <h1 className="nav-link active m-3 text-light" aria-current="page" to="/">{guild.name}</h1>}
                            {guild && <Link className="nav-link active" aria-current="page" to="/" onClick={() => setGuild()}>
                                <img src={guild.seal_img_url} alt="Guild Seal" style={{ width: 60, height: 60 }} />
                            </Link>}
                        </div>
                    </div>
                </nav>
            </div>


        </>
    );

}

export default Navbar;