import { ThemeProvider } from "@mui/system";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PageMissing from "./pages/PageMissing";
import Register from "./pages/Register";
import Promotions from './components/Promotions';
import Footer from './components/Footer';
import theme from "./themes/theme";
import NavBar from "./components/appBar/NavBar";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import TrackOrder from "./pages/TrackOrder";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardSideBar from "./components/DashboardSideBar";
import Users from "./pages/Users";
import User from "./pages/User";
import NewUser from "./pages/NewUser";
import Products from "./pages/Products";
import NewProduct from "./pages/NewProduct";
import EditProduct from "./pages/EditProduct";
import Pay from "./components/stripe/Pay";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders";
function App() {
  // const user = useSelector((state)=>state.user.currentUser);
  // let designation = null;

  // if(user){
  //   designation = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.designation
  // }else{
  //   designation = "Customer"
  // }
  // const designation = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.designation
  return (
    <ThemeProvider theme={theme}>
      <Promotions />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageMissing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        {/* <Route path="/login" element={user ? <Navigate to={"/"} /> : <Login />} /> */}
        {/* <Route path="/register" element={user ? <Navigate to={"/"} /> :<Register />} /> */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/category/:categoryName" element={<Shop />} />
        {/* <Route path="product/:id" element={<Product />} /> */}
        <Route path="shop/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/newUser" element={<NewUser />} />
        <Route path="/products" element={<Products />} />
        <Route path="/newProduct" element={<NewProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
