import { useContext } from "react";
import { ICoctailContext } from "../interfaces";
import { CoctailContext } from "../context/CoctailProvider";

export function useCoctailLogic(): ICoctailContext{
    return useContext(CoctailContext)
}