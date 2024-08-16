import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { IDrink, ICoctailContext, IIngredient, IDrinkLite } from "../index";

interface ICoctailProviderProps {
    children: ReactNode;
}

export const CoctailContext = createContext<ICoctailContext>({} as ICoctailContext);

export function CoctailProvider({ children }: ICoctailProviderProps): ReactElement {
    const [coctailList, setCoctailList] = useState<IDrink[]>([]);
    const [coctailsByIngredientList, setCoctailsByIngredientList] = useState<IDrinkLite[]>([]);
    const [favourites, setFavourites] = useState<IDrink[]>([]);
    const [focusedCoctail, setFocusedCoctail] = useState<IDrink>({alcoholic:"",category:"",favourite:false,glass:"",id:"",image:"",ingredients:[],instructions:"",measures:[],name:"",tags:[]});
    const [ingredient, setIngredient] = useState<IIngredient>({ name: "", abv: "", alcoholic: "", description: "", type: "" });

    useEffect(() => {
        const storedData = localStorage.getItem("drinks");
        const oldFocusData = localStorage.getItem("focused");
        let newFavs: IDrink[] = storedData ? JSON.parse(storedData) : [];
        const oldFocus: IDrink = oldFocusData ? JSON.parse(oldFocusData) : { alcoholic: "", category: "", favourite: false, glass: "", id: "", image: "", ingredients: [], instructions: "", measures: [], name: "", tags: [] };
        setFavourites(newFavs);
        setFocusedCoctail(oldFocus);
    }, []);

    function getRandomDrink(): Promise<IDrink> {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        return fetchData(url).then((drinks: IDrink[]) => {
            const rando = drinks[0];
            localStorage.setItem("focused", JSON.stringify(rando))
            return rando;
        }).catch((error) => {
            console.error(`API error fetching drink: `, error);
            throw error;
        });
    }

    function getDrinkById(id:string): Promise<IDrink> {
        const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i="+id;
        console.log("running drinkById with url: ", url)
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

    function getDrinksByIngredient(url: string): Promise<IDrinkLite[]> {
        return fetchDrinksByIngredient(url).then((drinks: IDrinkLite[]) => {
            const drinkList: IDrinkLite[] = Array.from(drinks);
            return drinkList;
        }).catch((error) => {
            console.error(`API error fetching searched by ingredient list: `, error)
            throw error;
        })
    }

    function toggleFavouriteDrink(favourite: IDrink): number {
        if (isInFavourites(favourite.name)) {
            const indexOfFavourite = favourites.findIndex((fav) => fav.name === favourite.name);
            favourites.splice(indexOfFavourite, 1);
            localStorage.removeItem("drinks");
            localStorage.setItem("drinks", JSON.stringify(favourites))
            return localStorage.length;
        } else {
            favourites.push(favourite);
            localStorage.removeItem("drinks");
            localStorage.setItem("drinks", JSON.stringify(favourites))
            return localStorage.length;
        }
    }

    function isInFavourites(find: string): Boolean {
        if (favourites.length < 1) {
            return false;
        } else {
            return favourites.some(drink => drink.name === find)
        }
    }

    async function fetchDrinksByIngredient(url: string): Promise<IDrinkLite[]> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json();
            if (data.drinks === null) {
                return [];
            }
            const coctails: IDrinkLite[] = data.drinks.map((drink: any) => {
                return {
                    name: drink.strDrink,
                    id: drink.idDrink,
                    image: drink.strDrinkThumb
                };
            });
            return coctails;
        }
        catch (error) {
            console.log("fetch went to error")
            console.error(error);
            return [];
        }
    }


    async function fetchIngredient(url: string): Promise<IIngredient | undefined> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();

            const ing = data.ingredients[0];

            const dataIngredient: IIngredient = {
                name: ing.strIngredient,
                alcoholic: ing.strAlcohol,
                type: ing.strType,
                abv: ing.strABV,
                description: ing.strDescription
            };

            return dataIngredient;
        } catch (error) {
            console.log("fetch went to error")
            console.error(error);
        }
    }

    async function fetchData(url: string): Promise<IDrink[]> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const data = await response.json();
            if (data.drinks === null) {
                return [];
            }
            const coctails: IDrink[] = data.drinks.map((drink: any) => {
                return {
                    id: drink.idDrink,
                    name: drink.strDrink,
                    alcoholic: drink.strAlcoholic,
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
        getDrinkById,
        getSearchedDrinks,
        getDrinksByIngredient,
        fetchData,
        fetchIngredient,
        setFocusedCoctail,
        setCoctailList,
        setCoctailsByIngredientList,
        setIngredient,
        focusedCoctail,
        ingredient,
        coctailList,
        coctailsByIngredientList,
        toggleFavouriteDrink,
        isInFavourites,
        favourites
    }

    return <CoctailContext.Provider value={values}>{children}</CoctailContext.Provider>
}

