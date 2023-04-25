import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteContact } from "../Store/ContactSlice";
import ContactList from "./ContactList";
import { AiFillCloseCircle } from "react-icons/ai";
const RightContent = () => {
  const contactData = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="container-options">
        <div className="w-100 flex justify-center">
          <Link
            to="/createcontactscreen"
            className="bg-indigo-600 hover:bg-indigo-700 shadow-xl px-10 py-3 mt-4 mb-4 rounded text-gray-100 submitBtn"
          >
            Create Contact
          </Link>
        </div>
        {contactData.totalContact === 0 && (
          <div className="issue-type bg-gray-200 shadow-xl p-6 mt-4 mb-4 text-center flex justify-center align-center">
            <AiFillCloseCircle className="text-[50px]" />
            <p className="m-0 flex justify-center align-center">
              No contact found Please create contact from Create contact button
            </p>
          </div>
        )}
      </div>

      {contactData.totalContact > 0 && (
        <div>
          <h1 className="mt-3 bg-gray-400 p-4 my-6 text-center text-black-600 font-medium shadow-sm">
            <span>Contact List</span>
          </h1>
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default RightContent;
