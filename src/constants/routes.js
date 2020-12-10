import ProductsList from "Pages/ProductsList/ProductsList"
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
        route: "/user/:fridgeId",
        name: "My fridge"
    },
    FRIDGE_NEW_PRODUCT: {
        route: "/user/fridge/new-product",
        name: "Add product"
    },
    PRODUCTS: {
        route: "/user/fridge/:fridgeId",
        name: "My products list"
    }
}

export default [
    {
        path: path_list.PRODUCTS.route,
        component: ProductsList
    }
];