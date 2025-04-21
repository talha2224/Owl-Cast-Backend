const combineRouter = require("express").Router()


combineRouter.use("/account",require("./account.router"))
combineRouter.use("/playlist",require("./playlist.router"))
combineRouter.use("/music",require("./music.router"))
combineRouter.use("/user/playlist",require("./userPlaylist.router"))
combineRouter.use("/transaction",require("./transaction.router"))






module.exports = combineRouter