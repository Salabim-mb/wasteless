import UserPage from "../Pages/UserPage/UserPage";
import FuckingLoginPage from "../Pages/LoginPage/FuckingLoginPage";

export const path_list = {
    DASHBOARD: {
        route: "/",
        name: "Dashboard"
    },
    REGISTER: {
        route: "/register",
        name: "Register"
    },
    LOGIN: {
        route: "/login",
        name: "Log in"
    },
    PROFILE: {
        route: "/user",
        name: "My profile"
    },
    SETTINGS: {
        route: "/settings",
        name: "Settings"
    },
    FRIDGE: {
        route: "/user/fridge",
        name: "My fridge"
    },
    FRIDGE_NEW_PRODUCT: {
        route: "/user/fridge/new-product",
        name: "Add product"
    },
}


export default [
    {
        path: path_list.LOGIN.route,
        component: FuckingLoginPage,
        exact: true
    },
    {
        path: path_list.PROFILE.route,
        exact: true,
        component: UserPage
    }
];