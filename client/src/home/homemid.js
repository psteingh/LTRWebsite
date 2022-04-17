import React from "react";
import ltrcatalog from "../images/ltrcatalog.png";
import ltrvault from "../images/ltrvault.png";


function HomeMid(){
    return(
        <div>

        <img src={ltrcatalog} alt="LTR Catalog" />

        <img src={ltrvault} alt="LTR Vault" />

        </div>
    );
}
    
export default HomeMid;