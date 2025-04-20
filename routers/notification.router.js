const router = require("express").Router()
const { getUserNotifications,deleteNotifications,deleteNotificationsForUser, getNotificationsForAdmin} = require("../services/notification.service")

router.get("/get/:id",getUserNotifications)
router.get("/admin/all/:id",getNotificationsForAdmin)
router.delete("/del/:id",deleteNotifications)
router.delete("/del/user/:id",deleteNotificationsForUser)

module.exports = router
