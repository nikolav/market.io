var { Router } = require("express");
var router = Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ version: 0 });
});

module.exports = router;
