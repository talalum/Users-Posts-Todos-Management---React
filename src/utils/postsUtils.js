import axios from 'axios';

const getAll = (url) => axios.get(url);

const getPostById = (url, id) => axios.get(`${url}/${id}`);

const getPostsByUser = (url, id) => axios.get(`${url}?userId=${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export { getAll, getPostById, getPostsByUser, addItem, updateItem, deleteItem };