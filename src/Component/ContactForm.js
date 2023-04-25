import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addContact, editContact } from "../Store/ContactSlice";
import { useNavigate } from "react-router-dom";
const ContactForm = ({ isEdit, id }) => {
  const contactData = useSelector((state) => state.contact);
  const [active, setActive] = useState(true);
  const [fn, setFname] = useState("");
  const [ln, setLname] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  let editData = [];
  if (id) {
    editData = contactData.data.filter((i, index) => i.id === id);
  }
  useEffect(() => {
    if (editData.length > 0) {
      setFname(editData[0].fname);
      setLname(editData[0].lname);
      setActive(editData[0].cstatus === "Active" ? true : false);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fn === "" || ln === "") {
      return false;
    } else {
      if (editData.length > 0) {
        dispatch(
          editContact({
            id: editData.length > 0 ? editData[0].id : nanoid(),
            fname: fn,
            lname: ln,
            cstatus: active ? "Active" : "Inactive",
          })
        );
      } else {
        dispatch(
          addContact({
            id: nanoid(),
            fname: fn,
            lname: ln,
            cstatus: active ? "Active" : "Inactive",
          })
        );
      }
      e.target.reset();
      Navigate("/");
    }
  };
  return (
    <div>
      <h1 className="mt-3 bg-gray-400 p-4 my-6 text-center text-black-600 font-medium shadow-sm">
        <span>{isEdit ? "Edit Contact" : "Create Contact"}</span>
      </h1>
      <div className="container-options">
        <form action="" className="m-4" onSubmit={handleSubmit}>
          <div className="issue-type bg-gray-100 shadow-xl p-6 mt-4 mb-4 flex flex-col i justify-center">
            <label className="flex justify-between items-center mb-3 py-3">
              <span className="text-primary font-medium mb-1">First Name</span>
              <input
                type="text"
                className="p-3 w-2/3 font-medium "
                placeholder="Enter first name"
                value={fn}
                onChange={(e) => setFname(e.target.value)}
              />
            </label>
            <label className="flex justify-between items-center mb-3 py-3">
              <span className="text-primary font-medium mb-1">Last Name</span>
              <input
                type="text"
                className="p-3 w-2/3 font-medium "
                placeholder="Enter last name"
                value={ln}
                onChange={(e) => setLname(e.target.value)}
              />
            </label>
            <div className="mt-4 flex justify-between items-center">
              <div className="font-medium">Status</div>
              <div className="w-2/3">
                <label
                  htmlFor="active"
                  className="flex justify-start align-center "
                >
                  <input
                    type="radio"
                    name="active"
                    onChange={() => setActive(true)}
                    checked={active ? true : false}
                  />
                  <span className="text-primary px-4 w-1/3">Active</span>
                </label>
                <label className="flex justify-start align-center">
                  <input
                    type="radio"
                    onChange={() => setActive(false)}
                    checked={!active ? true : false}
                  />
                  <span className="text-primary  px-4 w-1/3">Inactive</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-100 flex justify-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 shadow-xl px-10 py-3 mt-4 mb-4 rounded text-gray-100 submitBtn">
              {editContact.length > 0 ? "Edit Contact" : "Save Contact"}
            </button>
          </div>
          <div
            className="flex items-center bg-indigo-500 text-white text-sm font-bold px-4 py-3 rounded hidden success-alert transition ease-in-out"
            role="alert"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>Issue added sucessfully !!!!</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
