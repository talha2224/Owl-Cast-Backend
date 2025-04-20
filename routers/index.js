const combineRouter = require("express").Router()


combineRouter.use("/account",require("./account.router"))
combineRouter.use("/playlist",require("./playlist.router"))
combineRouter.use("/music",require("./music.router"))
combineRouter.use("/user/playlist",require("./userPlaylist.router"))

combineRouter.use("/dictinory",require("./dictinory.router"))
combineRouter.use("/feedback",require("./feedback.router"))
combineRouter.use("/notification",require("./notification.router"))
combineRouter.use("/notes",require("./notes.router"))
combineRouter.use("/track",require("./track.router"))
combineRouter.use("/sound",require("./sound.router"))
combineRouter.use("/ticket",require("./ticket.router"))
combineRouter.use("/post",require("./post.router"))
combineRouter.use("/performance",require("./performance.router"))
combineRouter.use("/score",require("./score.router"))
combineRouter.use("/payment",require("./payment.router"))
combineRouter.use("/charts",require("./charts.router"))
combineRouter.use("/rhymes",require("./rhymes.router"))






module.exports = combineRouter