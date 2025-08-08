import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import HeaderBottom2 from "./components/home/Header/HeaderBottom2";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Dashboard from "./pages/DashBoard/DashBoard";
import UserManagement from "./pages/DashBoard/UserManagement"; // Import the UserManagement component
import ProductManagement from "./pages/DashBoard/ProductManagement"; // Import the ProductManagement component
import ProfileManagement from "./pages/DashBoard/ProfileManagement"; // Import the ProfileManagement component
import OrderHistory from "./pages/DashBoard/OrderHistory"; // Import the OrderHistory component
import DeliveryStatus from "./pages/DashBoard/DeliveryStatus"; // Import the DeliveryStatus component
import UserProfile from "./pages/UserDashboard/UserProfile"
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Consult from "./pages/Consult/Consult";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/payment/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthAsync, selectLoggedInUser, selectUserInfo } from "./pages/Account/authHandle/authSlice";
import Orders from "./pages/UserDashboard/Orders";

const Layout = () => {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <HeaderBottom2 />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/consult" element={<Consult />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/offer" element={<Offer />}></Route>
        <Route path="/product/:_id" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/paymentgateway" element={<Payment />}></Route>
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile?section=Orders" element={<Orders />} />
        <Route path="/dashboard/profile" element={<ProfileManagement />} />
        <Route path="/dashboard/users" element={<UserManagement />} />
        <Route path="/dashboard/products/manage" element={<ProductManagement />} />
        <Route path="/dashboard/orders" element={<OrderHistory />} />
        <Route path="/dashboard/delivery-status" element={<DeliveryStatus />} />
        <Route path="/dashboard" element={<Dashboard />}>
          
          
        </Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  // console.log(user);
  


  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
