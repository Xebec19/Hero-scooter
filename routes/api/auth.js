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
				/*var hash = bcrypt.hashSync(newPerson.passport,8);*/
				/*var hash = bcrypt.hashSync(newPerson.passport);*/
				bcrypt.genSalt(10,function(err,salt){
					bcrypt.hash(newPerson.password,salt,function(err,hash){

					newPerson.password = hash;
				newPerson
				.save()
				.then(person => res.json(person))
				.catch(err => console.log(`Error while saving : ${err}`))	
					
					}) //bcrypt.hash ends here
				})
				
			}
		})
		.catch(err => console.log(err));
})

/*
type: POST
route: /api/auth/login
desc: just for testing
access: PUBLIC
*/

router.post('/login',(req,res) => {
	const email = req.body.email;
	const password = req.body.password;

	Person.findOne({email})
	.then(person => {
		if(!person){
			return res.status(404).json({emailerror: 'User not found!!'});
		}
		var checkPass = bcrypt.compareSync('one', person.password);
		console.log(`Password: ${password}, dbPass: ${person.name}, value: ${checkPass}`);
		/*.then(isCorrect => {
			if(isCorrect){
				res.json({success: 'User is able to login successfully!!'})
			}
			else {
				res.status(400).json({error: 'Password is incorrect!!'})
			}
		})
		.catch(err => console.log(err)) */
		if(checkPass){ return res.status(202).json({message: 'Success'}) }
		else{ return res.status(404).json({error: 'Error!!!'}) }
	})
	.catch(err => console.log(err));
})

export default router;