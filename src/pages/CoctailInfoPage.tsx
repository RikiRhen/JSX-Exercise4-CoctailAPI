import { ReactElement, useEffect, useState } from "react";
import { useCoctailLogic, IDrink, IIngredient } from "../index";
import { Link, useLocation } from "react-router-dom";

import "../index";

interface ICoctailInfoPageProps {
    focusedCoctail: IDrink | undefined;
}

export function CoctailInfoPage(): ReactElement {
    const location = useLocation();
    const { toggleFavouriteDrink, isInFavourites, ingredient, fetchIngredient, setIngredient } = useCoctailLogic();
    const { focusedCoctail } = location.state as ICoctailInfoPageProps;
    const [isFavourited, setIsFavourited] = useState<Boolean>(isInFavourites(focusedCoctail!.name));
    const [count, setCount] = useState(0);


    const runIngredientFetch = (url: string) => {
        console.log("Running fetch from link")
        const ing = fetchIngredient(url).then((ing: IIngredient | undefined) => {
            setIngredient({
                name: ing!.name,
                alcoholic: ing!.alcoholic,
                type: ing!.type,
                abv: ing!.abv,
                description: ing!.description
            });
            
        }).then(() => {
            console.log("Logging ing: ", ing)
            console.log(ingredient);
        });
        // if (ing) {
        //     console.log("starting update of ingredient with :", ing);
        //     setIngredient(ing);
        //     // setIngredient({
        //     //     name: "Test Ingredient",
        //     //     alcoholic: false,
        //     //     type: "Test Type",
        //     //     abv: "0",
        //     //     description: "Test Description"
        //     // });
        //     setCount(count + 1);
        //     console.log("update of ingredient should be done now. ", ingredient);
        // }
        // console.log("Logging ing: ", ing);
    }
    useEffect(() => {
        console.log("Ingredient state updated: ", ingredient);
        console.log("Count: ", count);
    }, [ingredient, count]);
    useEffect(() => {
        console.log("Component mounted");
        return () => {
            console.log("Component UN-mounted");
        };
    }, []);

    const handleIsFavClick = () => {
        toggleFavouriteDrink(focusedCoctail!);
        setIsFavourited(false);
    }

    const handleIsNotFavClick = () => {
        toggleFavouriteDrink(focusedCoctail!);
        setIsFavourited(true);
    }

    const handleOnLinkClick = (ing: string) => {
        console.log("Running onClick");
        const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?i=";
        console.log("Running runIngredientFetch");
        runIngredientFetch(url + ing);
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
                                {focusedCoctail?.ingredients.map((ing, index) => (
                                    // <li className="ingredientName" key={`ingredient-${index}`} id={`ingredient-${index}`}>{ingredient}</li>
                                    <li className="ingredientName" key={`ingredient-${index}`} id={`ingredient-${index}`}><Link to="/ingredient" state={{ ing:ing }}>{ing}</Link></li>
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