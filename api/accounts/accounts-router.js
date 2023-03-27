const router = require("express").Router();
const mw = require("./accounts-middleware");
const accountModel = require("./accounts-model");

router.get("/", async (req, res, next) => {
  try {
    const allRecords = await accountModel.getAll();
    res.json(allRecords);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    res.json(req.currentAccount);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const { name, budget } = req.body;
      let inserted = await accountModel.create({ name: name, budget: budget });
      res.status(201).json(inserted);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  mw.checkAccountId,
  async (req, res, next) => {
    try {
      const { name, budget } = req.body;
      let updatedRecord = await accountModel.updateById(req.params.id, {
        name: name,
        budget: budget,
      });
      res.status(200).json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    await accountModel.deleteById(req.params.id);
    res.json({ message: `${req.params.id} ID'li kayıt silindi` });
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 400).json({
    message: err.message,
    customMessage: "Hata oluştu",
  });
});

module.exports = router;
