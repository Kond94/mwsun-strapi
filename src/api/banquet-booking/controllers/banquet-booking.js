"use strict";

/**
 *  banquet-booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::banquet-booking.banquet-booking");

module.exports = createCoreController(
  "api::banquet-booking.banquet-booking",
  ({ strapi }) => ({
    async create(ctx) {
      console.log("in creation");
      const response = await super.create(ctx);
      console.log("response");

      return response;
    },
  })
);
