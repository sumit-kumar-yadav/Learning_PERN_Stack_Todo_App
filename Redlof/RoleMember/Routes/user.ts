import { Router } from 'express';
const { signUpController, signInController } = require('../Controllers/user');
const { validateSignUpData, validateSignInData } = require('../Validations/userValidator');

const router = Router();

router.post('/create-user', validateSignUpData, signUpController);
router.post('/create-session', validateSignInData, signInController);

module.exports = router;