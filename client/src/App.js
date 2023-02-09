import "./index.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";

import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";

import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import NewNote from "./features/notes/NewNote";
import EditNote from "./features/notes/EditNote";

import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public route */}
        <Route index element={<Public />} />

        {/* login route */}
        <Route path="login" element={<Login />} />

        {/* Prefetch */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            {/* inside dash route */}
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>
            </Route>
            {/* End Dash Layout  */}
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
