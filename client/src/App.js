import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SingleProduct from "./pages/SingleProduct";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./hoc/ProtectedRoute";
import AdminRoute from "./hoc/AdminRoute";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AddCategory from "./pages/adminPages/AddCategory";
import AddProduct from "./pages/adminPages/AddProduct";

import CartReducerContext from "./helpers/CartContext";

const App = () => {
  return (
    <Router>
      <Switch>
        <CartReducerContext>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/product/:id" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/checkout" component={Checkout} />
          <ProtectedRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/create/category" component={AddCategory} />
          <AdminRoute exact path="/create/product" component={AddProduct} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={Signup} />
        </CartReducerContext>
      </Switch>
    </Router>
  );
};

export default App;
