import { MouseEventHandler, ReactElement, useEffect } from "react";
import { useCoctailLogic } from "../hooks/useCoctailLogic";
import { Link } from "react-router-dom";

export function LandingPage(): ReactElement {
    const { getRandomDrink, setRandomCoctail, randomCoctail } = useCoctailLogic();

    const runFetch = async () => {
        const drink = await getRandomDrink();
        setRandomCoctail(drink);
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
            <img className="thumbnail" src={randomCoctail?.image} alt={randomCoctail?.name} />
            <p className="randomDrinkName">{randomCoctail?.name}</p>
            <button className="btn" id="newDrinkButton" onClick={handleOnClick}>New</button>
            <Link to="/info" className="link">
                Info
            </Link>
        </section>
    )
}