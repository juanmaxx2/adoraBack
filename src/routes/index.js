//* Import *//
const { Router } = require("express");
const router = Router();

const activityRouter = require("./acitvityRoutes");
const prayerDayRouter = require("./prayerDayRoutes");
const provinceRouter = require("./provinceRoutes");
const writeRouter = require("./writerRoutes");
const departmentRouter = require("./departmentRoutes");
const nationalLawRouter = require("./nationalLawRoutes");
const provincialLawRouter = require("./provincialLawRouter");
const associationRouter = require("./associationRouter");
const adminRouter = require("./adminRoutes");

//* Route *//
router.use("/activity", activityRouter)
router.use("/prayerday", prayerDayRouter);
router.use("/province", provinceRouter);
router.use("/association", associationRouter);
router.use("/writer", writeRouter);
router.use("/department", departmentRouter);
router.use("/nationallaw", nationalLawRouter);
router.use("/provinciallaw", provincialLawRouter);
router.use("/admin", adminRouter);

const imageRouter = require("./imageRoutes");
router.use("/image", imageRouter);

module.exports = router;
