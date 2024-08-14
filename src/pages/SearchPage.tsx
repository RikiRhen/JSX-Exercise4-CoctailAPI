import { ChangeEventHandler, MouseEventHandler, ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import { useCoctailLogic } from "../index";

const MAX_ITEMS_PER_PAGE = 10;

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

    //Pagination stuff
    const [currentPage, setCurrentPage] = useState<number>(1);
    const indexOfLastItem = currentPage * MAX_ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - MAX_ITEMS_PER_PAGE;
    const itemsOnPage = coctailList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(coctailList.length / MAX_ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    }


    return (
        <>
            <section className="searchSection">
                <h1>Find your favourite drink!</h1>
                <form className="searchForm">
                    <p>Coctail name:</p>
                    <input type="text" className="searchByNameInputField" placeholder="Cocktail..." onChange={handleSearchByNameChange} value={inputValue} />
                    <button className="btn" id="submitSearchButton" onClick={handleOnSubmit}>Search!</button>
                </form>
            </section>
            <section className="listSection">
                <div className="searchResultDiv">
                    <ul className="searchResults">
                        {itemsOnPage.map((focusedCoctail, index) => (
                            <li className="searchResultDrink" key={`searchDrink-${index}`} id={`searchDrink-${index}`}>
                                <Link to="/info" state={{ focusedCoctail }} className="link">{focusedCoctail.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="paginationDiv">
                    {/*This pagination is 100% from chatGPT. No way I could have figured this out on my own. 
                    If I understand it correctly, it just creates sub-arrays that are at most MAX_ITEMS_PER_PAGE long and displays these
                    with the use of the pagination buttons and variables. Quite clever honestly.*/}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index} onClick={() => handlePageChange(index + 1)} className={index + 1 === currentPage ? 'active' : ''}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>

        </>
    )
}