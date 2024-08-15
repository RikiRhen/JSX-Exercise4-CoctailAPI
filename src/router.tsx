import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App, CoctailInfoPage, FavouritesPage, LandingPage, SearchPage, IngredientPage } from "./index";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="info" element={<CoctailInfoPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="ingredient" element={<IngredientPage />} />
        </Route>
    )
)