module.exports = {
	formatUser: formatUser,
	formatUsers: formatUsers
}

function formatUser(user) {
	return _.omit(JSON.parse(JSON.stringify(user)), ['password']);
}

function formatUsers(users) {
	var formatted = [];
	for (var i = 0; i < users.length; i++) {
		formatted.push(formatUser(users[i]));
	}
	return formatted;
}