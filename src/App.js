import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome_Page";
import Canteens from "./pages/CanteenList";
import Menu from "./pages/MenuPage";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashborad";
import ManagerLayout from "./pages/ManagerLayout";
import MenuManagement from "./pages/MenuManagement";
import CounterManagement from "./pages/CounterManagement";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/user">
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
          </Route>
          <Route path="/canteen-list" element={<Canteens/>}/>
          <Route path="/menu-items" element={<Menu/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/manager-dashboard" element={<ManagerLayout/>}>
            <Route path="menu" element={<MenuManagement/>}/>
            <Route path="counter" element={<CounterManagement/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
