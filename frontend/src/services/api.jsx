import axios from 'axios'
//we use axios for http requests. It is an alternative way of fetch() api.
//axios offers more features and convenience.
//It is easy to use and it has simpler syntax compared to fetch(),

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

//Add request interceptor to attach JWT token to headers
//1)In Axios interceptor are functions that allow you to modify
//   the req or res before they handeled by the .then()or .catch(),methods
//2)The request interceptor function run before every request to the http server.
//3)Here we use request interceptor to add the token to the request.headers.authorization,
//  so that we can authenticate the each request before it sent

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const registerUser = (userData) => API.post('/auth/register',userData);
export const loginUser = (userData) => API.post('/auth/login',userData);
export const getTodos = () => API.get('/todos');
export const createTodo = (todo) => API.post('/todos',todo);
export const updateTodo = (id,todo) => API.put(`/todos/${id}`,todo);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);


//In this context, config is an object that holds the configuration details of the HTTP request being made by Axios.
// Example of config:
// For a request like this:
//      API.get('/todos');
//The config object might look like:
//{
//   url: '/todos',
//   method: 'get',
//   headers: {
//     Authorization: 'Bearer abc123',
//     Accept: 'application/json',
//   },
//   baseURL: 'http://localhost:5000/api',
// }

