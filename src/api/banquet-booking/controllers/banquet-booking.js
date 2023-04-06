"use strict";

/**
 *  banquet-booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::banquet-booking.banquet-booking",
  ({ strapi }) => ({
    async findOne(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi
        .service("api::banquet-booking.banquet-booking")
        .find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);
      console.log("From Controller", sanitizedResults);
      return this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
