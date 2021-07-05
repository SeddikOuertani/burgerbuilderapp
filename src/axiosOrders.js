import axios from "axios";

const instance = axios.create({
    baseURL : 'https://reactburgerbuilder-9c2d0-default-rtdb.firebaseio.com/'
})

export default instance;