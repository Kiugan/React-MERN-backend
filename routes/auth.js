/* 
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/field-validators');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwt-validators');

const router = Router();

router.post(
  '/new',
  [ // middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator
  ],
  createUser);

router.post(
  '/',
  [ // middlewares
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({ min: 6 }),
    fieldValidator
  ],
  loginUser)

router.get('/renew', jwtValidator, renewToken)

module.exports = router;