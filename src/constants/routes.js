import NewProduct from "../Pages/NewProduct";
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
    FRIDGE_NEW_PRODUCT: {
        route: "/user/:fridge_id/new-product",
        redirect: (fridge_id) => `/user/${fridge_id}/new-product`,
        name: "Add product"
    },
    FRIDGE: {
        route: "/user/:fridge_id",
        redirect: (fridge_id) => `/user/${fridge_id}`,
        name: "My fridge"
    },

}

export default [
    {
        path: path_list.FRIDGE_NEW_PRODUCT.route,
        component: NewProduct,
        exact: true
    },
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