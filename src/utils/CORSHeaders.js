export const getHeaders = (token = null) => {
    let data = {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin" : "https://wasteless-backend.herokuapp.com/login/"
    };

    if (token !== null) {
        data = {...data, "token": token}
    }

    return data;
};