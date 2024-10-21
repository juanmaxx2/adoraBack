//?-----------Imports-----------
const { Router } = require("express");
const { getPrayerDayHandler, createPrayerDayHandler, deletePrayerDayHandler, getOnePrayerDayHandler, getAllPrayerDayHandler, modifyPrayerDayHandler } = require("../handlers/prayerDayHandler");
const upload = require("../middleware/upload");
const prayerDayRouter = Router();
const { authenticateJWT, isAdmin } = require("../middleware/auth");

//*-----------Routes-----------
prayerDayRouter.get('/all', getAllPrayerDayHandler);
prayerDayRouter.get('/', getPrayerDayHandler);
prayerDayRouter.get('/:idActivity', getOnePrayerDayHandler);
prayerDayRouter.post('/', authenticateJWT, isAdmin, upload.single('image'), createPrayerDayHandler);
prayerDayRouter.put('/:idActivity', authenticateJWT, isAdmin, upload.single('image'), modifyPrayerDayHandler);
prayerDayRouter.delete('/:idActivity', authenticateJWT, isAdmin, deletePrayerDayHandler);

module.exports = prayerDayRouter;