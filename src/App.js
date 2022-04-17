import "./App.css";
import { createBrowserHistory } from "history";
import { Route, Router, Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/Detail/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { Suspense, lazy } from "react";
import { UserTemplate } from "./templates/UserTemplate/UserTemplate";
import Loading from "./component/Loading/Loading";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Films from "./pages/Admin/Films/Films";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import AddNew from "./pages/Admin/Films/AddNew/AddNew";
import Edit from "./pages/Admin/Films/Edit/Edit";
import ShowTime from "./pages/Admin/ShowTime/ShowTime";
import InfoClient from "./pages/Profile/InfoClient";
import DrawerEditUser from "./pages/Profile/DrawerEditUser";
// import ShowTime from './pages/Admin/Showtime/Showtime';

const CheckoutTemplatelazy = lazy(() =>
  import("./templates/CheckoutTemplate/CheckoutTemplate")
);

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <DrawerEditUser/>
      <Switch>
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate path="/contact" exact Component={Contact} />
        <HomeTemplate path="/news" exact Component={News} />
        <HomeTemplate path="/detail/:id" exact Component={Detail} />
        <HomeTemplate path="/profile" exact Component={Profile} />
        <HomeTemplate path="/infoclient" exact Component={InfoClient} />
        <CheckoutTemplate path="/checkout/:id" exact Component={Checkout} />

        {/* <Suspense fallback={<div className="container">
            <h1>LOADING......</h1>
            <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="cyberlearn.vn" />
          </div>} >
          <CheckoutTemplatelazy path="/checkout/:id" exact Component={Checkout} />
        </Suspense> */}
        <UserTemplate path="/login" exact Component={Login} />
        <UserTemplate path="/register" exact Component={Register} />

        <AdminTemplate path="/admin" exact Component={Dashboard} />
        <AdminTemplate path="/admin/films" exact Component={Films} />
        <AdminTemplate path="/admin/films/addnew" exact Component={AddNew} />
        <AdminTemplate path="/admin/films/edit/:id" exact Component={Edit} />
        <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact Component={ShowTime} />
        <AdminTemplate path="/admin/users" exact Component={Dashboard} />
        <HomeTemplate path="/" exact Component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
