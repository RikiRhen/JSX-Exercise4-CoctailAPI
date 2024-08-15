import { ReactElement } from "react";

import "../index";

export function LoadingCard(): ReactElement {
    
    return (
        <div className="loadingCardDiv">
            <div className="loadingCard">
                <div className="loadingThumbnail">
                    <span className="material-symbols-outlined">
                        hourglass
                    </span>
                </div>
                <div className="infoDiv">
                    <h2 className="randomDrinkName">Loading...</h2>
                </div>
            </div>
        </div>
    )
}