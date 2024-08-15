import { MouseEventHandler, ReactElement, useEffect, useState } from "react";
import { useCoctailLogic, LoadingCard, CoctailCard } from "../index";

import "../index";

export function LandingPage(): ReactElement {
    const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true);
        runFetch();
    }

    return (
        <section className="landingSection">
            <h1>Your randomly chosen coctail is:</h1>
            {isLoading ?
                (setTimeout(() => { setIsLoading(false); }, 500), <LoadingCard/>) :
                (<CoctailCard focusedCoctail={focusedCoctail!} />)}
            <button className="btn" id="newDrinkButton" onClick={handleOnClick}>Another drink!</button>
        </section>
    )
}