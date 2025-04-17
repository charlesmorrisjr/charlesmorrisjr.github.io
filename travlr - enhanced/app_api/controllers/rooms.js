const mongoose = require('mongoose');
const Room = require('../models/rooms'); // Import the Room model

// GET: /rooms - lists all the rooms
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsList = async (req, res) => {
  try {
    const rooms = await Room.find().exec();
    return res.status(200).json(rooms);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// GET: /rooms/:roomCode - lists all the rooms
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsFindByCode = async (req, res) => {
  try {
    const room = await Room.findOne({ 'code': req.params.roomCode }).exec();
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// POST: /rooms - creates a new room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsAddroom = async (req, res) => {
  try {
    const newRoom = new Room({
      code: req.body.code,
      name: req.body.name,
      perDay: req.body.perDay,
      image: req.body.image,
      description: req.body.description
    });

    const savedRoom = await newRoom.save();
    return res.status(201).json(savedRoom);
  } catch (err) {
    return res.status(500).json(err);
  }
}

// PUT: /rooms/:roomCode - updates a room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsUpdateroom = async (req, res) => {
  try {
    const updatedRoom = await Room.findOneAndUpdate(
      { code: req.params.roomCode },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    return res.status(200).json(updatedRoom);
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = {
  roomsList,
  roomsFindByCode,
  roomsAddroom,
  roomsUpdateroom
};