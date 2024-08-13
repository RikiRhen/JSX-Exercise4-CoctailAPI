import { ReactElement} from "react";
import { useCoctailLogic } from "../index";
import { Link } from "react-router-dom";

export function CoctailCard(): ReactElement {
    const { focusedCoctail } = useCoctailLogic();


    return (
        <div className="coctailCard">
            <img className="thumbnail" src={focusedCoctail?.image} alt={focusedCoctail?.name} />
            <p className="randomDrinkName">{focusedCoctail?.name}</p>
            <Link to="/info" state={{ focusedCoctail }} className="link">
                More about this drink
            </Link>
        </div>
    )
}