import { ReactElement, useState } from "react";
import { IDrink } from "../interfaces";
import { useCoctailLogic } from "../index";
import { useLocation } from "react-router-dom";
import "../css/index.css";

interface ICoctailInfoPageProps {
    focusedCoctail: IDrink | undefined;
}

export function CoctailInfoPage(): ReactElement {
    const location = useLocation();
    const { focusedCoctail } = location.state as ICoctailInfoPageProps;
    const { toggleFavouriteDrink, isInFavourites } = useCoctailLogic();
    const [isFavourited, setIsFavourited] = useState<Boolean>(isInFavourites(focusedCoctail!.name));

    const handleIsFavClick = () => {
        toggleFavouriteDrink(focusedCoctail!);
        // console.log(toggleFavouriteDrink(focusedCoctail!));
        setIsFavourited(false);
    }

    const handleIsNotFavClick = () => {
        toggleFavouriteDrink(focusedCoctail!);
        // console.log(toggleFavouriteDrink(focusedCoctail!));
        setIsFavourited(true);
    }

    return (
        <section className="infoSection">
            <h1>This is the coctail info page</h1>
            <div className="infoBody">
                <div className="imageDiv">
                    <img src={focusedCoctail?.image} alt={focusedCoctail?.name} className="coctailImage" />
                </div>
                <div className="infoDiv">
                    {isFavourited ?
                        (<button className="btn" id="isFavourited" onClick={handleIsFavClick}><span className="material-symbols-outlined">
                            heart_check </span></button>) :
                        (<button className="btn" id="isNotFavourited" onClick={handleIsNotFavClick}><span className="material-symbols-outlined">
                            heart_plus  </span></button>)}
                    <div className="titleDiv">
                        <h1>{focusedCoctail?.name}</h1>
                    </div>
                    <div className="extraInfo">
                        <p>Served in a {focusedCoctail?.glass}</p>
                        <p>Category: {focusedCoctail?.category}</p>
                        <p>Tags: {focusedCoctail?.tags.join(", ")}</p>
                        <div className="ingredients">
                            <ul className="ingredientList">
                                {focusedCoctail?.ingredients.map((ingredient, index) => (
                                    <li className="ingredientName" key={`ingredient-${index}`} id={`ingredient-${index}`}>{ingredient}</li>
                                ))}
                            </ul>
                            <ul className="measurementList">
                                {focusedCoctail?.measures.map((measurement, index) => (
                                    <li className="measurement" key={`ingredient-${index}`} id={`measurement-${index}`}>{measurement}</li>
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