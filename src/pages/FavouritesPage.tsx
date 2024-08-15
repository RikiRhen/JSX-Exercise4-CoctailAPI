import { ReactElement } from "react";
import { IDrink, CoctailCard } from "../index";

import "../index";


export function FavouritesPage(): ReactElement {
    const storedData = localStorage.getItem("drinks");
    let favourites: IDrink[] = storedData ? JSON.parse(storedData) : [];

    return (
        <>
            <section className="favouritesSection">
                <div className="titleDiv">
                    <h1>Your favourite drinks:</h1>
                </div>
                <div className="favouritesListDiv">
                    {
                        favourites.map((drink: IDrink) => (
                            <CoctailCard key={drink.name} focusedCoctail={drink} />
                        ))}
                </div>
            </section>
        </>
    )
}