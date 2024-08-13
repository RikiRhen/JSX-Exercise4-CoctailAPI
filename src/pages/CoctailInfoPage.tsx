import { ReactElement } from "react";
import "../css/index.css";
import { IDrink } from "../interfaces";
import { useLocation } from "react-router-dom";

interface ICoctailInfoPageProps{
    focusedCoctail: IDrink | undefined;
}

export function CoctailInfoPage(): ReactElement {
    const location = useLocation();
    const {focusedCoctail} = location.state as ICoctailInfoPageProps;

    return (
        <section className="infoSection">
            <h1>This is the coctail info page</h1>
            <div className="infoBody">
                <div className="imageDiv">
                    <img src={focusedCoctail?.image} alt={focusedCoctail?.name} className="coctailImage" />
                </div>
                <div className="infoDiv">
                    <h1>{focusedCoctail?.name}</h1>
                    <div className="extraInfo">
                        <p>Served in a {focusedCoctail?.glass}</p>
                        <p>Category: {focusedCoctail?.category}</p>
                        <p>Tags: {focusedCoctail?.tags.join(", ")}</p>
                        <div className="ingredients">
                            <ul className="ingredientList">
                                {focusedCoctail?.ingredients.map((ingredient, index) => (
                                    <li className="ingredientName" id={`ingredient-${index}`}>{ingredient}</li>
                                ))}
                            </ul>
                            <ul className="measurementList">
                                {focusedCoctail?.measures.map((measurement, index) => (
                                    <li className="measurement" id={`measurement-${index}`}>{measurement}</li>
                                ))}
                            </ul>
                        </div>
                        <h1>Instructions</h1>
                        <p>{focusedCoctail?.instructions}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}