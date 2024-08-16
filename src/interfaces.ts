export interface IDrink {
    id:string;
    favourite: boolean;
    name: string;
    alcoholic: string;
    glass: string;
    image: string;
    ingredients: string[];
    measures: string[];
    instructions: string;
    category: string;
    tags: string[];
}

export interface IDrinkLite{
    name:string;
    image:string;
    id:string;
}

export interface IIngredient {
    name: string;
    description: string;
    alcoholic: string;
    type: string;
    abv: string;
}

export interface ICoctailContext {
    getRandomDrink: () => Promise<IDrink>;
    getDrinkById: (id:string) => Promise<IDrink>;
    getSearchedDrinks: (url: string) => Promise<IDrink[]>;
    getDrinksByIngredient: (url:string) => Promise<IDrinkLite[]>;
    fetchData: (url: string) => Promise<IDrink[]>;
    fetchIngredient: (url: string) => Promise<IIngredient | undefined>;
    setFocusedCoctail: (drink: IDrink) => void;
    setCoctailList: (drinks: IDrink[]) => void;
    setCoctailsByIngredientList: (drinks: IDrinkLite[]) => void;
    setIngredient: (ingredient: IIngredient) => void;
    focusedCoctail: IDrink;
    ingredient: IIngredient | undefined;
    coctailList: IDrink[];
    coctailsByIngredientList: IDrinkLite[];
    toggleFavouriteDrink: (favourite: IDrink) => number;
    isInFavourites: (find: string) => Boolean;
    favourites: IDrink[];
}