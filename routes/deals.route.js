const express = require("express");
const {
  CreateDeal,
  GetDeals,
  UpdateDeal,
  DeleleDeal,
} = require("../controllers/deals.controller");
const DealsRoute = express.Router();

// create a deals
DealsRoute.post("/", CreateDeal);
// get all deals
DealsRoute.get("/", GetDeals);

// update route
DealsRoute.put("/:id", UpdateDeal);

// delete route:
DealsRoute.delete("/:id", DeleleDeal);

module.exports = DealsRoute;
