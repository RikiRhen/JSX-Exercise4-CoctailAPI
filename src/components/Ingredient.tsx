import { ReactElement} from "react";
import { IIngredient } from "../index";

interface IIngredientPageProps {
    ingredient: IIngredient;
}


export function Ingredient({ ingredient }: IIngredientPageProps): ReactElement {

    return (
        <section className="ingredientSection">
            <div className="ingredientBody">
                <div className="ingredientBaseInfoDiv">
                    <p className="ingredientAlcoholic">Alcoholic: {ingredient.alcoholic}</p>
                    <p className="ingredientABV">ABV: {ingredient.abv}</p>
                    <p className="ingredientType">Type: {ingredient.type}</p>
                </div>
                <div className="ingredientDescriptionDiv">
                    <p className="ingredientDescription">{ingredient.description}</p>
                </div>
            </div>
        </section>
    )
}