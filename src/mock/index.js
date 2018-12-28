import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Users } from './data/user';

export default{
	
	init(){ 
		let mock = new MockAdapter(axios);
		//获取用户列表
		mock.onGet('/users/list').reply(config => {
			let {name} = config.params;
			let mockUsers = Users.filter(user => {
				if (name && user.name.indexOf(name) == -1) return false;
				return true;
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						success: true,
						users: mockUsers
					}]);
				}, 1000);
			});
		});

		//获取用户列表（分页）
		mock.onGet('/users/listpage').reply(config => {
			let {page, name} = config.params;
			let mockUsers = Users.filter(user => {
				if (name && user.name.indexOf(name) == -1) return false;
				return true;
			});
			let total = mockUsers.length;
			mockUsers = mockUsers.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						success: true,
						total: total,
						users: mockUsers
					}]);
				}, 1000);
			});
		});

		//新增用户
		mock.onGet('/users/add').reply(config => {
			let { name, mobile, id, birth, sex } = config.params;
			_Users.push({
				name: name,
				id: id,
				mobile: mobile,
				birth: birth,
				sex: sex
			});
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						success: true,
						msg: '新增成功'
					}]);
				}, 500);
			});
		});
	}
}


