import { ReactElement } from "react";
import { useCoctailLogic } from "../index";
import { Link } from "react-router-dom";

import "../index";

export function CoctailCard(): ReactElement {
    const { focusedCoctail } = useCoctailLogic();


    return (
        <div className="coctailCardDiv">
            <div className="coctailCard">
                <img className="thumbnail" src={focusedCoctail?.image} alt={focusedCoctail?.name} />
                <div className="infoDiv">
                    <h2 className="randomDrinkName">{focusedCoctail?.name}</h2>
                    <Link to="/info" state={{ focusedCoctail }} className="link">
                        More about this drink
                    </Link>
                </div>
            </div>
        </div>
    )
}