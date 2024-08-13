import { createContext, ReactElement, ReactNode, useState } from "react";
import { IDrink, ICoctailContext } from "../interfaces";

interface ICoctailProviderProps {
    children: ReactNode;
}

export const CoctailContext = createContext<ICoctailContext>({} as ICoctailContext);

export function CoctailProvider({ children }: ICoctailProviderProps): ReactElement {
    const [coctailList, setCoctailList] = useState<IDrink[]>([]);
    const [randomCoctail, setRandomCoctail] = useState<IDrink>();

    //THINGS TO STORE LOCALLY: 1x Random drink, 1x Array of search results

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
                    ingredients: [drink.strIngredient1, drink.strMeasure1, drink.strIngredient2, drink.strMeasure2, drink.strIngredient3, drink.strMeasure3, drink.strIngredient4, drink.strMeasure4, drink.strIngredient5, drink.strMeasure5, drink.strIngredient6, drink.strMeasure6, drink.strIngredient7, drink.strMeasure7, drink.strIngredient8, drink.strMeasure8, drink.strIngredient9, drink.strMeasure9, drink.strIngredient10, drink.strMeasure10, drink.strIngredient11, drink.strMeasure11, drink.strIngredient12, drink.strMeasure12, drink.strIngredient13, drink.strMeasure13, drink.strIngredient14, drink.strMeasure14, drink.strIngredient15, drink.strMeasure15].filter(Boolean),
                    instructions: drink.strInstructions,
                    category: drink.strCategory,
                    tags: drink.strTags ? drink.strTags.split(",") : []
                };
            });
            return coctails;

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const values: ICoctailContext = {
        getRandomDrink,
        fetchData,
        setRandomCoctail,
        randomCoctail
    }

    return <CoctailContext.Provider value={values}>{children}</CoctailContext.Provider>
}

// function getDrinksList(search: string): Promise<IDrink[]> {
//     let url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
//     url = url.concat(search);
//     console.log(url);
//     return fetchData(url);
// }
