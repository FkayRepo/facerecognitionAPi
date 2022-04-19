const handleImageURLPost = (req,res,axios) => {

	const {url} = req.body;

	const encodedParams = new URLSearchParams();
	encodedParams.append("objecturl", url);

	const options = {
	  method: 'POST',
	  url: 'https://ivladmin-face-detection.p.rapidapi.com/faceSearch/detectFaces',
	  headers: {
	    'content-type': 'application/x-www-form-urlencoded',
	    'X-RapidAPI-Host': 'ivladmin-face-detection.p.rapidapi.com',
	    'X-RapidAPI-Key': 'cfa385174dmsh9d1c8475869f4aep1e336djsn7a4707ba4106'
	  },
	  data: encodedParams
	};

	axios.request(options).then(function (response) {
		console.log(response.data);
		res.json(response.data)
	}).catch(function (error) {
		console.error(error);
	});



	}

module.exports = {
	handleImageURLPost
}