import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwt from 'jsonwebtoken';
import passport from 'passport';

const router = express.Router();

/*
type: GET
route: /api/auth
desc: just for testing
access: PUBLIC
*/
router.get('/',(req,res) => res.json({test: "Auth is success"}))

/*
type: GET
route: /api/auth
desc: just for testing
access: PUBLIC
*/
router.get('/about',(req,res) => res.json({test: "about is success"}))

//Import Schema for Person to Register
import Person from '../../models/Person.js'

/*
type: POST
route: /api/auth/register
desc: route for registration for users
access: PUBLIC
*/
router.post('/register',(req,res) => {
	Person.findOne({email:req.body.email})
		.then(person => {
			if(person){
				return res.status(400).json({emailError: 'Email is registered'})
			} else {
				const newPerson = new Person({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				});
				//Encrypt passport 
				var hash = bcrypt.hashSync(newPerson.passport,8);
				newPerson.password = hash;
				newPerson
				.save()
				.then(person => res.json(person))
				.catch(err => console.log(`Error while saving : ${err}`))
			}
		})
		.catch(err => console.log(err));
})
export default router;