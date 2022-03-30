var { Router } = require("express");
var router = Router();

/* GET home page. */
router.get("/:id", function (req, res, next) {
  const { id } = req.params;
  return res.json({
    data: [
      { id }
    ]
  });
  // res.json({ version: "0.0.0" });
});

module.exports = router;
