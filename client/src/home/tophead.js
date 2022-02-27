import React from "react";
import Carousel from "./carousel";
import Subtitle from "./subtitle";

function Tophead(){
    return(
    <header className="dblue header-sec">
        <div className="headertitle-sec">
        <h1 className="headertitle-text">Lies To Remember</h1>
        </div>
        <div>
            <Carousel />
        </div>
        <div>
            <Subtitle />
        </div>
    </header>

    );
}
    
export default Tophead;
