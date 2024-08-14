import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Navbar(): ReactElement {
    return (
        <header className="navbar">
            <h1 className="headline">Coctail database</h1>
            <div className="links">
                <Link to="/" className="link">
                    Landing
                </Link>
                <Link to="favourites" className="link">
                    Favourites
                </Link>
                <Link to="/search" className="link">
                    Search
                </Link>
            </div>
        </header>
    )
}