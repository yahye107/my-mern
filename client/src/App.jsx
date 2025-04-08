import React from "react";
import "./index.css";
import { Button } from "./components/ui/button";
import Mainpage from "./pages/Mainpage";
import AuthPage from "./pages/auth";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import UserDAsh from "./components/dashbord/UserDAsh";
import OverVeiw from "./pages/OverVeiw";
import Profile from "./pages/Profile";
import CreateQoute from "./pages/CreateQoute";
import Settings from "./pages/Settings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Admindash from "./admin/componets/Admindash";
import Home from "./admin/pages/home";
import Users from "./admin/pages/users";
import AdminPro from "./admin/pages/adminPro";
import ViewQoute from "./pages/viewQoute";
import ManageQoute from "./admin/pages/ManageQoute";
import Features from "./pages/lading/feruts";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="auth" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="admindash" element={<Admindash />}>
          <Route index element={<Home />} />
          <Route path="user" element={<Users />} />
          <Route path="settings" element={<AdminPro />} />
          <Route path="manage" element={<ManageQoute />} />
        </Route>

        <Route path="userdash" element={<UserDAsh />}>
          <Route index element={<OverVeiw />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create" element={<CreateQoute />} />
          <Route path="veiw" element={<ViewQoute />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
