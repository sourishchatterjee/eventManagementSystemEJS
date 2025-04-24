
const express = require("express");
const router = express.Router();
const eventController = require("../controller/event.controller");

const categoryController = require('../controller/categoryContoller');

const fileUploader = require("../helper/fileUpload");

const fileUpload = new fileUploader({
  folderName: "uploads",
  supportedFiles: ["image/png", "image/jpg", "image/jpeg", "image/pdf"],
  fieldSize: 1024 * 1024 * 5,
});

//vistiors routes
router.get("/visitorsevents", eventController.visitorsallEvents);
router.post('/searchbytitle', eventController.searchEventsByTitle); // Changed to POST based on controller
router.get("/visitorsevent/:id", eventController.vistiorsEventById); // Added :id parameter


// Event routes
router.get("/admin/addevent", eventController.create);
router.post("/admin/addevent",
  fileUpload.upload().single("image"),
  eventController.addanEvent
);
router.get("/admin/allevents", eventController.allEvents);
router.get("/admin/edit-event/:id", eventController.editEventById);
router.post("/admin/update-event/:id",
  fileUpload.upload().single("image"),
  eventController.updateEvent
);
router.get("/admin/delete-event/:id", eventController.deleteEvent);

// Category routes
router.get("/admin/categories", categoryController.getAllCategories);
router.post("/admin/categories/add", categoryController.addCategory);
module.exports = router;