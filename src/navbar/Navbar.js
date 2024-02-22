import { Link } from "react-router-dom";

const Navbar = (props) => {

    return (
        <>
            <div className="row">
                <nav className="navbar navbar-expand-lg bg-body-tertiary col-12 p-4">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">All Quests</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-link active" aria-current="page" to="/">LOGIN</Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

        </>
    );
}

export default Navbar;