import Mock from 'mockjs';

const Users = [];
for (let i = 0; i <= 20; i++) {
	Users.push(
		Mock.mock({
			id:Mock.Random.increment(),
			name:Mock.Random.cname(),
			"mobile|3": "1234",
			birth: Mock.Random.date(),
    		sex: Mock.Random.integer(1, 2)
		})
	)
}

export {Users};