import axios from 'axios';

const getAll = (url) => axios.get(url);

const getTodoById = (url, id) => axios.get(`${url}/${id}`);

const getTodoByUser = (url, id) => axios.get(`${url}?userId=${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export { getAll, getTodoById, getTodoByUser, addItem, updateItem, deleteItem };