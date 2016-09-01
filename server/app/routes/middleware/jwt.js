var jwt = require('jsonwebtoken');
var jwt_config = require(__root + 'config').jwt;

module.exports = function(required) {
	return function(req, res, next) {
		if (req.headers.authorization) {
			var token = req.headers.authorization.substring(7); // Remove 'Bearer ' from token
			jwt.verify(token, jwt_config.secret, function(err, decoded) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				// Token valid, continue route.
				req.user = decoded;
				next();
			});
		} else {
			if (required) return res.fail('No token provided');
			next();
		}
	}
}