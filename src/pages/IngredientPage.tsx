import { ReactElement, useEffect } from "react";
import { Ingredient, useCoctailLogic } from "../index";
import { useLocation } from "react-router-dom";

export function IngredientPage(): ReactElement {
    const { fetchIngredient, setIngredient, ingredient } = useCoctailLogic();
    const location = useLocation();
    const { ing } = location.state;

    const runFetch = async () => {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=" + ing;
        const ingData = await fetchIngredient(url);
        setIngredient(ingData!);
    };

    useEffect(() => {
        runFetch();
    }, []);

    return (
        <section className="ingredientSection">
            <div className="ingredientDiv">
                <h1>This is the ingredient info page</h1>
                <Ingredient ingredient={ingredient!}/>
            </div>
        </section>
    )
}