const Events = require('../Models/events')

const getEvents = async (req, resp) => {
const events = await Events.find().populate('user','name')
    resp.status(200).json({
        ok: true,
        events
    })

}
const createEvent = async (req, resp) => {
    const events = new Events({ ...req.body, user: req.uid });
    try {
        const eventSaved = await events.save();
        resp.status(200).json({
            ok: true,
            event: eventSaved
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            msg: 'Error creando usuario'
        })
    }
}
const updateEvent = async (req, resp) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Events.findById( eventoId );
        if ( !event ) {
            return resp.status(404).json({ok: false,msg: 'Evento no existe por ese id'});
        }
        if ( event.user.toString() !== uid ) {
            return resp.status(401).json({ok: false,msg: 'No tiene privilegio de editar este evento'});
        }
        const nuevoEvento = {...req.body,user: uid
        }
        const eventoActualizado = await Events.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        resp.json({ok: true,evento: eventoActualizado});        

    } catch (error) {
        console.log(error);
        resp.status(500).json({ok: false,msg: 'error interno en el servidor'});
    }
}
const deleteEvent = async (req, resp) => {
    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Events.findById( eventoId );
        console.log(event)
        if ( !event ) {
            return resp.status(404).json({ok: false,msg: 'Evento no existe por ese id'});
        }
        if ( event.user.toString() !== uid ) {
            return resp.status(401).json({ok: false,msg: 'No tiene privilegio de eliminar este evento'});
        }
        const nuevoEvento = {...req.body,user: uid}
        console.log('nuevo evento...')
        const eventoActualizado = await Events.findByIdAndDelete( eventoId );
        resp.json({ok: true,evento: eventoActualizado});        

    } catch (error) {
        console.log(error);
        resp.status(500).json({ok: false,msg: 'error interno en el servidor'});
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}