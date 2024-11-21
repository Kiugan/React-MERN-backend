const express = require('express'); // esto es para recuperar el intelicence+
const Event = require('../models/Events');

const getEvents = async (req, res = express.response) => {

  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  })

}

const createEvent = async (req, res = express.response) => {

  const event = new Event(req.body);

  try {

    event.user = req.uid;

    const eventSave = await event.save();

    res.status(201).json({
      ok: true,
      eventSave
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

const updateEvent = async (req, res = express.response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Event.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para editar este evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const updateEvent1 = await Event.findByIdAndUpdate(eventId, newEvent); // esto retorna el viejo evento por si queremos comparar
    const updateEvent2 = await Event.findByIdAndUpdate(eventId, newEvent, { new: true }); // esto retorna el viejo evento por si queremos comparar


    res.json({
      ok: true,
      evento: updateEvent2
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }

}

const deleteEvent = async (req, res = express.response) => {

  const eventId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Event.findById(eventId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene permisos para eliminar este evento'
      })
    }

    const deleteEvent = await Event.findByIdAndDelete(eventId); // esto retorna el viejo evento por si queremos comparar

    res.json({
      ok: true,
      event: deleteEvent
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}