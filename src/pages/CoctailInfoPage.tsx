import { ReactElement } from "react";
import { useCoctailLogic } from "../hooks/useCoctailLogic";

export function CoctailInfoPage(): ReactElement {
    const {randomCoctail} = useCoctailLogic();

    return (
        <section className="infoSection">
            <h1>This is the coctail info page</h1>
            <img src={randomCoctail?.image} alt={randomCoctail?.name} className="coctailImage" />
        </section>
    )
}