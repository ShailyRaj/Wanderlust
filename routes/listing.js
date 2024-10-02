const express = require("express");
const router = express.Router();
// const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// To upload image
const multer  = require('multer')
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage }) //dest -> destination

router.route("/")
    .get(wrapAsync(listingController.index)) //Index Route
    .post(isLoggedIn, upload.single("listing[image]"), validateListing,
        wrapAsync(listingController.createListing) //Create Route
    );
    // .post(upload.single("listing[image]"), (req, res) => {
    //     res.send(req.file);
    // });

// New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.RenderNewForm));

router.route("/:id")
    .get(
        wrapAsync(listingController.showListings) //Show Route
    ) 
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, //Update Route
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner,  // Delete Route
        wrapAsync(listingController.destroyListing)
    );



// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.renderEditForm)
);

module.exports = router;