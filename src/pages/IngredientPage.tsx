import { ReactElement, useEffect } from "react";
import { Ingredient, useCoctailLogic, CoctailCardLite } from "../index";
import { useLocation } from "react-router-dom";

import "../index";

export function IngredientPage(): ReactElement {
    const { fetchIngredient, setIngredient, ingredient, coctailsByIngredientList, setCoctailsByIngredientList, getDrinksByIngredient } = useCoctailLogic();
    const location = useLocation();
    const { ing } = location.state;

    const runFetch = async () => {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + ing;
        const ingData = await fetchIngredient(url);
        setIngredient(ingData!);
        const listUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ing;
        const listData = await getDrinksByIngredient(listUrl);
        setCoctailsByIngredientList(listData);
    };

    useEffect(() => {
        runFetch();
    }, []);

    return (
        <section className="ingredientSection">
            <div className="ingredientDiv">
                <h1>{ing}</h1>
                <Ingredient ingredient={ingredient!} />
            </div>
            <h1 className="listHeadline">Other drinks with {ing}:</h1>
            <div className="ingredientSearchResultDiv">
                {coctailsByIngredientList.map((drink) => (
                    <div className="listItem" key={drink.id} id={`drinkByIngrListItem-${drink.id}`}><CoctailCardLite drink={drink} /></div>
                ))}
            </div>
        </section>
    )
}