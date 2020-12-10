import FridgesList from "../Pages/FridgesList/FridgesList";

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
        path: path_list.FRIDGE.route,
        exact: true,
        component: FridgesList
    }
];