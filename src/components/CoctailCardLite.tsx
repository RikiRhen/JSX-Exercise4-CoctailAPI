import { MouseEventHandler, ReactElement } from "react";
import { IDrink, IDrinkLite, useCoctailLogic } from "../index";
import { useNavigate } from "react-router-dom";

interface ICoctailCardLiteProps {
    drink: IDrinkLite;
}

export function CoctailCardLite({ drink }: ICoctailCardLiteProps): ReactElement {
    const { setFocusedCoctail, getDrinkById } = useCoctailLogic();
    const navigate = useNavigate();

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        const newDrink: IDrink = await getDrinkById(drink.id);
        setFocusedCoctail(newDrink);
        navigate("/info");
    }

    return (
        <div className="coctailCardLiteDiv" >
            <div className="coctailCardLite" >
                <img className="thumbnail" src={drink.image} alt={drink.name} />
                <div className="infoDiv" >
                    <h2 className="randomDrinkName" > {drink.name} </h2>
                    <button className="btn" onClick={handleOnClick}>More info</button>
                </div>
            </div>
        </div>

    )
}