import React from "react";
import ContactList from "./Component/ContactList";
import { store } from "./Store/Store";
import { Provider } from "react-redux";
import CreateContactScreen from "./Component/CreateContactScreen";
import EditContactScreen from "./Component/EditContactScreen";
import Sidebar from "./Component/Sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Maps from "./Component/Maps";
import RightContent from "./Component/RightContent";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <div className="container h-auto flex h-64 content-wrapper w-100 justify-between">
            <Sidebar />
            <div className="md:absolute md:right-0 right-content w-3/4 p-10">
              <Routes>
                <Route index element={<RightContent />} />
                <Route
                  path="/createcontactscreen"
                  element={<CreateContactScreen />}
                />
                <Route
                  path="/editcontactscreen/:id"
                  element={<EditContactScreen />}
                />
                <Route path="/maps" element={<Maps />} />
              </Routes>
            </div>
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
