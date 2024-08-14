import { ReactElement } from "react";
import { useCoctailLogic, IDrink, FavouriteCard } from "../index";
import "../index";


export function FavouritesPage(): ReactElement{
    const { favourites } = useCoctailLogic();

    return (
        <>
        <section className="favouritesSection">
            <div className="titleDiv">
                <h1>Your favourite drinks:</h1>
            </div>
            <div className="favouritesListDiv">
                {favourites.map((drink:IDrink) => (
                    <FavouriteCard key={drink.name} focusedCoctail={drink} />
                ))}
            </div>
        </section>
        </>
    )
}