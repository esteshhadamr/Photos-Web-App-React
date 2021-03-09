import React from "react";
import avatar from "../assets/avatar.png";

// AddPhoto Component.
const AddPhoto = props => {
    let src = props.src ? `uploads/${props.src}` : avatar;
    return <div>
        <h4>Need Create Form to add photo</h4>
        <img src={props.file || src} className="img-fluid rounded-circle ml-3 avatar" alt="" />
    </div>

};

export default AddPhoto;