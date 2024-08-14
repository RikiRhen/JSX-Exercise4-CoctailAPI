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

export interface ICoctailContext {
    getRandomDrink: () => Promise<IDrink>;
    getSearchedDrinks: (url: string) => Promise<IDrink[]>;
    fetchData: (url: string) => Promise<IDrink[]>;
    setFocusedCoctail: (drink: IDrink) => void;
    setCoctailList: (drinks: IDrink[]) => void;
    focusedCoctail: IDrink | undefined;
    coctailList: IDrink[];
    toggleFavouriteDrink: (favourite: IDrink) => number;
    isInFavourites: (find: string) => Boolean;
    favourites: IDrink[];
}