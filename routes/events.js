const { Router } = require("express");
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent } = require('../controllers/events');
const { isDate } = require("../helpers/isDate");


const router = Router();
router.use(validarJWT);


router.get('/', getEvents);

router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    createEvent);
router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;