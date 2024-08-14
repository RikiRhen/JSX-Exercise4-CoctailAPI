import { createContext, ReactElement, ReactNode, useState } from "react";
import { IDrink, ICoctailContext } from "../interfaces";

interface ICoctailProviderProps {
    children: ReactNode;
}

export const CoctailContext = createContext<ICoctailContext>({} as ICoctailContext);

export function CoctailProvider({ children }: ICoctailProviderProps): ReactElement {
    const [coctailList, setCoctailList] = useState<IDrink[]>([]);
    const [focusedCoctail, setFocusedCoctail] = useState<IDrink>();
    const [favourites] = useState<IDrink[]>([]);

    function getRandomDrink(): Promise<IDrink> {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        return fetchData(url).then((drinks: IDrink[]) => {
            const rando = drinks[0];
            return rando;
        }).catch((error) => {
            console.error(`API error fetching drink: `, error);
            throw error;
        });
    }

    function getSearchedDrinks(url: string): Promise<IDrink[]> {
        return fetchData(url).then((drinks: IDrink[]) => {
            const drinkList: IDrink[] = Array.from(drinks);
            return drinkList;
        }).catch((error) => {
            console.error(`API error fetching searched list: `, error)
            throw error;
        })
    }

    function toggleFavouriteDrink(favourite: IDrink): number {
        if (isInFavourites(favourite.name)) {
            const indexOfFavourite = favourites.indexOf(favourite);
            favourites.splice(indexOfFavourite, 1);
            return favourites.length;
        } else {
            return favourites.push(favourite);
        }
    }

    function isInFavourites(find: string): Boolean {
        if (favourites.length < 1) {
            return false;
        } else {
            return favourites.some(drink => drink.name === find)
        }
    }

    async function fetchData(url: string): Promise<IDrink[]> {
        try {

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();

            const coctails: IDrink[] = data.drinks.map((drink: any) => {
                return {
                    name: drink.strDrink,
                    alcoholic: drink.strAlcoholic === "Alcoholic",
                    glass: drink.strGlass,
                    image: drink.strDrinkThumb,
                    ingredients: [drink.strIngredient1,
                    drink.strIngredient2,
                    drink.strIngredient3,
                    drink.strIngredient4,
                    drink.strIngredient5,
                    drink.strIngredient6,
                    drink.strIngredient7,
                    drink.strIngredient8,
                    drink.strIngredient9,
                    drink.strIngredient10,
                    drink.strIngredient11,
                    drink.strIngredient12,
                    drink.strIngredient13,
                    drink.strIngredient14,
                    drink.strIngredient15,].filter(Boolean),
                    measures: [drink.strMeasure1,
                    drink.strMeasure2,
                    drink.strMeasure3,
                    drink.strMeasure4,
                    drink.strMeasure5,
                    drink.strMeasure6,
                    drink.strMeasure7,
                    drink.strMeasure8,
                    drink.strMeasure9,
                    drink.strMeasure10,
                    drink.strMeasure11,
                    drink.strMeasure12,
                    drink.strMeasure13,
                    drink.strMeasure14,
                    drink.strMeasure15].filter(Boolean),
                    instructions: drink.strInstructions,
                    category: drink.strCategory,
                    tags: drink.strTags ? drink.strTags.split(",") : [],
                    favourite: isInFavourites(drink.strDrink)
                };
            });
            return coctails;

        } catch (error) {
            console.log("fetch went to error")
            console.error(error);
            return [];
        }
    }

    const values: ICoctailContext = {
        getRandomDrink,
        getSearchedDrinks,
        fetchData,
        setFocusedCoctail,
        setCoctailList,
        focusedCoctail,
        coctailList,
        toggleFavouriteDrink,
        isInFavourites,
        favourites
    }

    return <CoctailContext.Provider value={values}>{children}</CoctailContext.Provider>
}

