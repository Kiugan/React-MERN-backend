/* 
  Rutas de eventos / Events
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { jwtValidator } = require("../middlewares/jwt-validators");
const { fieldValidator } = require('../middlewares/field-validators');
const { isDate } = require('../helpers/isDate');


const router = Router();

// Todas tienen que pasar por la validacion de JWT
router.use(jwtValidator)

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    fieldValidator
  ],
  createEvent);

// Actualizar eventos
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;