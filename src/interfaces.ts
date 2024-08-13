export interface IDrink {
    name: string;
    alcoholic: boolean;
    glass: string;
    image: string;
    ingredients: string[];
    instructions: string;
    category: string;
    tags: string[];
}

export interface ICoctailContext {
    // getDrinksList: (search:string) => void;
    getRandomDrink: () => Promise<IDrink>;
    fetchData: (url:string) => Promise<IDrink[]>;
    setRandomCoctail:(drink:IDrink) => void;
    randomCoctail: IDrink | undefined;
}