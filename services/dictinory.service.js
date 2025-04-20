const axios= require("axios")
const { gennerateRapLine } = require("../utils/function")

const getRhymingWords  = async (req,res)=>{
    try {
        let words = await axios.get(`https://api.datamuse.com/words?rel_rhy=${req.body.word}`)
        return res.status(200).json({data:words.data,status:200,msg:null})
    } 
    catch (error) {
        console.log(error)
    }
}

const generateRapSentence  = async (req,res)=>{
    try {
        let sentence = await gennerateRapLine(req.body.word)
        return res.status(200).json({data:sentence,status:200,msg:null})
    } 
    catch (error) {
        console.log(error)
    }
}



module.exports = {getRhymingWords,generateRapSentence}