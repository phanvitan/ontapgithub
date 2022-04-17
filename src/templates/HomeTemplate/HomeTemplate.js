import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";
import Footer from "./Layout/Footer/Footer";

export const HomeTemplate = (props) => {//path, exact, COmponent

    const {Component, ...restProps} = props;

    useEffect(() => {
            window.scrollTo(0,0);
    })

    return <Route {...restProps} render={(propsRoute) => {//props.location, props.history, props.match
        return <Fragment>
            <Header {...propsRoute}/>
            {/* <HomeCarousel {...propsRoute}/> */}
            <Component {...propsRoute} />
            <hr className="mt-5" />
            <Footer/>
        </Fragment>
    }} />
}
