const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const axios = require('axios');

const register = require('./controllers/register');
const signin = require('./controllers/signin')
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const imageURL = require('./controllers/imageURL');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'sql',
      database : 'facerecognitiondb'
    }
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {

	db('users')
	.returning('*')
	.then(users => {
		res.json(users)
	})
})

app.post('/signin', (req,res) => { signin.handleSigninPost(req,res,db,bcrypt) });

app.post('/register', (req,res) => { register.handleRegisterPost(req,res,db,bcrypt) });

app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db) });	

app.put('/image', (req,res) => { image.handleImagePut(req,res,db) });

app.post('/imageURL', (req,res) => { imageURL.handleImageURLPost(req,res,axios) });

app.listen(process.env.PORT || 3000, () => {
	
	console.log(`app running on port ${process.env.PORT}`);
})