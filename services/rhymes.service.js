const { default: axios } = require("axios");
const { RhymesModel } = require("../models/rhymes.model");

const createRhymes = async (req, res) => {
  try {
    let { word, userId } = req.body
    let words = await axios.get(`https://api.datamuse.com/words?rel_rhy=${word}`)
    let create = await RhymesModel.create({ userId, word, rhymes: words.data })
    return res.status(200).json({ data: create, status: 200, msg: null })
  }
  catch (error) {
    console.log(error)
  }
}

const updateRhymes = async (req, res) => {
  try {
    let { word } = req.body
    let words = await axios.get(`https://api.datamuse.com/words?rel_rhy=${word}`)
    let create = await RhymesModel.findByIdAndUpdate(req.params?.id, { word, rhymes: words.data }, { new: true })
    return res.status(200).json({ data: create, status: 200, msg: "Rhymes Updated" })
  }
  catch (error) {
    console.log(error)
  }
}

const getRhymes = async (req, res) => {
  try {
    let data = await RhymesModel.find({ userId: req.params?.id })
    return res.status(200).json({ data, status: 200, msg: null })
  }
  catch (error) {
    console.log(error)
  }
}


module.exports = { createRhymes, getRhymes ,updateRhymes}