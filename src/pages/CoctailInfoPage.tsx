import { ReactElement } from "react";
import { useCoctailLogic } from "../hooks/useCoctailLogic";
import "../css/index.css";

export function CoctailInfoPage(): ReactElement {
    const { randomCoctail } = useCoctailLogic();

    return (
        <section className="infoSection">
            <h1>This is the coctail info page</h1>
            <div className="infoBody">
                <div className="imageDiv">
                    <img src={randomCoctail?.image} alt={randomCoctail?.name} className="coctailImage" />
                </div>
                <div className="infoDiv">
                    <h1>{randomCoctail?.name}</h1>
                    <div className="extraInfo">
                        <p>Served in a {randomCoctail?.glass}</p>
                        <p>Category: {randomCoctail?.category}</p>
                        <p>Tags: {randomCoctail?.tags.join(", ")}</p>
                        <div className="ingredients">
                            <ul className="ingredientList">
                                {randomCoctail?.ingredients.map((ingredient, index) => (
                                    <li className="ingredientName" id={`ingredient-${index}`}>{ingredient}</li>
                                ))}
                            </ul>
                            <ul className="measurementList">
                                {randomCoctail?.measures.map((measurement, index) => (
                                    <li className="measurement" id={`measurement-${index}`}>{measurement}</li>
                                ))}
                            </ul>
                        </div>
                        <h1>Instructions</h1>
                        <p>{randomCoctail?.instructions}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}