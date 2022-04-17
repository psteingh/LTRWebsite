import React from "react";

function LieList(){
  return(
    <div className="list row lielist-sec">
      <div className="lielisttext-sec">
        After signing up...
      </div>


    <div className="col-md-6">
      <h4>List of Lies</h4>
      <ul className="list-group">
      <li className="list-group-item">
        boss
      </li>
      </ul>
      <p><button className="submit-button">
         Add a Lie </button></p>

      <p><button className="submit-button">
          List of Lies </button></p>
    </div>

    <div className="col-md-6">
    <div>
      <h5>Lie details</h5>
        <div className="form-group">
        <label><strong>Name:</strong>
        </label> boss</div>
        <div><label><strong>Subject:</strong>
        </label> am sick today</div>
        <div><label><strong>Stuff:</strong>
        </label> work, Apr 4, 2022</div>
        <div><label><strong>Status:</strong>
        </label> Private</div>
        <button className="submit-button">
          Edit </button>
    </div>
    </div>
    
    </div>
  );
}
  
export default LieList;
