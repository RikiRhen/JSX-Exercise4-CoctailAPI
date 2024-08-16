import { MouseEventHandler, ReactElement } from "react";
import { IDrink, useCoctailLogic } from "../index";
import { useNavigate } from "react-router-dom";

interface ICoctailCardProps {
    drink: IDrink;
}

export function CoctailCard({drink}:ICoctailCardProps): ReactElement {
    const { setFocusedCoctail } = useCoctailLogic();
    const navigate = useNavigate();

    const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (e) =>{
        e.preventDefault();
        setFocusedCoctail(drink);
        localStorage.removeItem("focused");
        localStorage.setItem("focused", JSON.stringify(drink))
        navigate("/info");
    }

    return (
        
        <div className="coctailCardDiv" >
            <div className="coctailCard" >
                <img className="thumbnail" src={drink.image} alt={drink.name} />
                <div className="infoDiv" >
                    <h2 className="randomDrinkName" > {drink.name} </h2>
                    <button className="btn" onClick={handleOnClick}>More info</button>
                </div>
            </div>
        </div>

    )
}