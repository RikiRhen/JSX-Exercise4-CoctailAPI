export interface IDrink {
    favourite: boolean;
    name: string;
    alcoholic: boolean;
    glass: string;
    image: string;
    ingredients: string[];
    measures: string[];
    instructions: string;
    category: string;
    tags: string[];
}

export interface IIngredient {
    name: string;
    description: string;
    alcoholic: boolean;
    type: string;
    abv: string;
}

export interface ICoctailContext {
    getRandomDrink: () => Promise<IDrink>;
    getSearchedDrinks: (url: string) => Promise<IDrink[]>;
    fetchData: (url: string) => Promise<IDrink[]>;
    fetchIngredient: (url: string) => Promise<IIngredient | undefined>;
    setFocusedCoctail: (drink: IDrink) => void;
    setCoctailList: (drinks: IDrink[]) => void;
    setIngredient: (ingredient: IIngredient) => void;
    focusedCoctail: IDrink | undefined;
    ingredient: IIngredient | undefined;
    coctailList: IDrink[];
    toggleFavouriteDrink: (favourite: IDrink) => number;
    isInFavourites: (find: string) => Boolean;
    favourites: IDrink[];
}