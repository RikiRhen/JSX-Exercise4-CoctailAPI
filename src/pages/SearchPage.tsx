import { ChangeEventHandler, MouseEventHandler, ReactElement, useState } from "react";
import { useCoctailLogic } from "../index";

export function SearchPage(): ReactElement {
    const [inputValue, setInputNameValue] = useState<string>("");
    const { getSearchedDrinks, setCoctailList, coctailList } = useCoctailLogic();

    const runFetch = async (url: string) => {
        const drinks = await getSearchedDrinks(url);
        const newDrinkList = Array.from(drinks);
        setCoctailList(newDrinkList);
    };

    const handleOnSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        const url: string = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
        runFetch(url);
    }

    const handleSearchByNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputNameValue(e.target.value);
    }


    return (
        <section className="searchSection">
            <h1>This is the search page</h1>
            <form className="searchForm">
                <div className="byNameDiv">
                    <p>Coctail name:</p>
                    <input type="text" className="searchByNameInputField" placeholder="Cocktail..." onChange={handleSearchByNameChange} value={inputValue} />
                </div>
                <button className="btn" id="submitSearchButton" onClick={handleOnSubmit}>Search!</button>
            </form>
        </section>
    )
}