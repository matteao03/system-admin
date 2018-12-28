import axios from 'axios';

let base = '';

export const getUserList = params => { return axios.get(`${base}/users/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/users/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/users/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/users/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/users/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/users/add`, { params: params }); };