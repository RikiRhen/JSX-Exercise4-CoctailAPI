import { ReactElement } from "react";
import { IDrink, useCoctailLogic } from "../index";
import { Link } from "react-router-dom";

interface IFavouriteCardProps {
    focusedCoctail: IDrink;
}

export function FavouriteCard({ focusedCoctail }: IFavouriteCardProps): ReactElement {
    const { setFocusedCoctail } = useCoctailLogic();
    setFocusedCoctail(focusedCoctail);

    return (
        
        <div className="coctailCardDiv" >
            <div className="coctailCard" >
                <img className="thumbnail" src={focusedCoctail.image} alt={focusedCoctail.name} />
                <div className="infoDiv" >
                    <h2 className="randomDrinkName" > {focusedCoctail.name} </h2>
                    < Link to="/info" state={{ focusedCoctail }
                    } className="link" >
                        Get to mixin'!
                    </Link>
                </div>
            </div>
        </div>

    )
}