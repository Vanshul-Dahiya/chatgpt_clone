const express = require("express");
const {
  summaryController,
  paragraphController,
  chatbotController,
  jsConvertorController,
} = require("../controllers/openaiController");

const router = express.Router();

router.post("/summary", summaryController);
router.post("/paragraph", paragraphController);
router.post("/chatbot", chatbotController);
router.post("/jsConvertor", jsConvertorController);

module.exports = router;
