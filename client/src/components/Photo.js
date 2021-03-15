import React from "react";
import avatar from "../assets/avatar.png";
import ModalImage from "react-modal-image";

// Photo Component.
const Photo = props => {
   let src = props.src ? `/uploads/${props.src}` : avatar;
  
   return<ModalImage
      small={props.file || src}
      large={props.file || src}
      alt=''
      hideDownload={true}
      hideZoom={true}
      className="modal-image"
   />
};

export default Photo;