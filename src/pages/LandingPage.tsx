import { MouseEventHandler, ReactElement, useEffect } from "react";
import { useCoctailLogic, CoctailCard } from "../index";

import "../index";

export function LandingPage(): ReactElement {
    const { getRandomDrink, setFocusedCoctail } = useCoctailLogic();

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
            <h1>Your randomly chosen coctail is:</h1>
            <CoctailCard />
            <button className="btn" id="newDrinkButton" onClick={handleOnClick}>Another drink!</button>
        </section>
    )
}