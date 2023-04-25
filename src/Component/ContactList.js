import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../Store/ContactSlice";

const ContactList = () => {
  const contactData = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  return (
    <div className="w-100 flex flex-wrap justify-center">
      {contactData.data.map((i, d) => {
        return (
          <div
            key={i.id}
            className="w-48 my-3 p-3 flex flex-col  text-center justify-center align-center"
          >
            <img
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
              className="h-20 w-20 mx-auto rounded-full object-contain"
            />
            <p>
              {i.fname} {i.lname}
            </p>
            <Link
              to={`/editcontactscreen/${i.id}`}
              className="p-3 w-100 m-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Edit
            </Link>
            <button
              onClick={() => dispatch(deleteContact(i.id))}
              className="p-3 w-100 m-2 bg-red-500 rounded-lg hover:bg-red-600 text-white"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
