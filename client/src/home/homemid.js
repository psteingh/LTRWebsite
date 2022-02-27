import React from "react";

import ltrvault from "../images/ltrvault.png";
import ltrcatalog from "../images/ltrcatalog.png";

function HomeMid(){
    return(
        <div className="headersubtitle-text">
        <p>Coming Soon</p>

        <img src={ltrvault} alt="LTR Vault"
        className="profile-img-card" />

        <img src={ltrcatalog} alt="LTR Catalog"
        className="profile-img-card" />

        </div>
    );
}
    
export default HomeMid;