import React from "react";
import ContactForm from "./ContactForm";
import { useParams } from "react-router-dom";
const EditContactScreen = () => {
  let { id } = useParams();
  return (
    <div>
      <ContactForm isEdit={true} id={id} />
    </div>
  );
};

export default EditContactScreen;
