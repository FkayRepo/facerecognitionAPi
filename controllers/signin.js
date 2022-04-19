
const handleSigninPost = (req,res,db,bcrypt) => {

	const {email, password} =  req.body;

	if(!email || !password){
		return res.status(400).json('incorrect registration')
	}


	db.select('email', 'hash')
	.from('login')
	.where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid){
			db('users')
			.where('email', '=', email)
			.then( users => {
				res.json(users[0])
			})
			.catch(err => {
				res.json('user error')
			})
		}
	}).catch(err => {
		res.status(400).json('username and password do not match. Please try again')
	})
}

module.exports = {
	handleSigninPost
}
