import React from "react";

function LieList(){
  return(
    <div className="list row">
    <div className="col-md-6">
      <h4>List of Lies</h4>
      <ul className="list-group">
      <li className="list-group-item">
        Current Lie
      </li>
      </ul>
      <p><button className="submit-button">
         Add a Lie </button></p>

      <p><button className="submit-button">
          List of Lies </button></p>
    </div>

    <div className="col-md-6">
      <h5>Lie details</h5>
        <div><label><strong>Name:</strong>
             </label></div>
        <div><label><strong>Subject:</strong>
             </label></div>
        <div><label><strong>Stuff:</strong>
             </label></div>
        <button className="submit-button">
          Edit </button>
    </div>
    
    </div>
  );
}
  
export default LieList;
