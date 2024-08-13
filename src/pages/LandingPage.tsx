import { MouseEventHandler, ReactElement, useEffect } from "react";
import { useCoctailLogic } from "../index";
import { Link } from "react-router-dom";

export function LandingPage(): ReactElement {
    const { getRandomDrink, setFocusedCoctail, focusedCoctail } = useCoctailLogic();

    const runFetch = async () => {
        const drink = await getRandomDrink();
        setFocusedCoctail(drink);
    };

    useEffect(() => {
        runFetch();
    }, []);

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        runFetch();
    }

    return (
        <section className="landingSection">
            <h1>This is the landing page</h1>
            <img className="thumbnail" src={focusedCoctail?.image} alt={focusedCoctail?.name} />
            <p className="randomDrinkName">{focusedCoctail?.name}</p>
            <button className="btn" id="newDrinkButton" onClick={handleOnClick}>New</button>
            <Link to="/info" state={{ focusedCoctail }} className="link">
                Info
            </Link>
        </section>
    )
}