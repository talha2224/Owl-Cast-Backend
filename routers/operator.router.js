const router = require("express").Router()
const { createOperator, getAllOperator, deleteOperator, updateOperator, getSingle } = require("../services/operator.service")

router.post("/create", createOperator)
router.get("/", getAllOperator)
router.get("/:id", getSingle)
router.delete("/:id", deleteOperator)
router.put("/:id", updateOperator)


module.exports = router