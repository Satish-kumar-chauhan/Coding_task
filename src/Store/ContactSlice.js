import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  totalContact: 0,
  data: [],
};
const ContactSlice = createSlice({
  name: "conactslice",
  initialState,
  reducers: {
    addContact: (state, action) => {
      return {
        data: [...state.data, action.payload],
        totalContact: state.totalContact + 1,
      };
    },
    deleteContact: (state, action) => {
      return {
        data: state.data.filter((dd) => dd.id !== action.payload),
        totalContact: state.totalContact - 1,
      };
    },
    editContact: (state, action) => {
      return {
        totalContact: state.totalContact,
        data: state.data.map((dd) => {
          if (dd.id === action.payload.id) {
            return {
              id: action.payload.id,
              fname: action.payload.fname,
              lname: action.payload.lname,
              cstatus: action.payload.cstatus,
            };
          } else {
            return { ...dd };
          }
        }),
      };
    },
  },
});

export const { addContact, deleteContact, editContact } = ContactSlice.actions;

export default ContactSlice.reducer;
