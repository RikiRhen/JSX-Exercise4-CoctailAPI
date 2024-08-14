import { ReactElement } from "react";
import { IDrink, useCoctailLogic } from "../index";
import { Link } from "react-router-dom";

interface IFavouriteCardProps {
    drink: IDrink;
}

export function FavouriteCard({ drink }: IFavouriteCardProps): ReactElement {
    const { focusedCoctail, setFocusedCoctail } = useCoctailLogic();
    setFocusedCoctail(drink);

    return (
        
        <div className="coctailCardDiv" >
            <div className="coctailCard" >
                <img className="thumbnail" src={drink.image} alt={drink.name} />
                <div className="infoDiv" >
                    <h2 className="randomDrinkName" > {drink.name} </h2>
                    < Link to="/info" state={{ focusedCoctail }
                    } className="link" >
                        Get to mixin'!
                    </Link>
                </div>
            </div>
        </div>

    )
}