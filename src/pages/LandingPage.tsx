import { MouseEventHandler, ReactElement, useEffect } from "react";
import { useCoctailLogic, CoctailCard } from "../index";

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
            <h1>This is the landing page</h1>
            <CoctailCard />
            <button className="btn" id="newDrinkButton" onClick={handleOnClick}>New</button>
        </section>
    )
}