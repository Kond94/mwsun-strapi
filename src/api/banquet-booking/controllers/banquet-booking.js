"use strict";

/**
 *  banquet-booking controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::banquet-booking.banquet-booking",
  ({ strapi }) => ({
    async create(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const { results, pagination } = await strapi
        .service("api::restaurant.restaurant")
        .find(sanitizedQueryParams);
      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      console.log("in creation");
      console.log(sanitizedResults);

      try {
        strapi.plugins["email"].services.email.send({
          to: "frontoffice@malawisunhotel.com",
          from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
          cc: "marketingmwsun@gmail.com",
          bcc: "",
          replyTo: "",
          subject:
            "(TEST ENVIRONMENT - [CONTROLLER]) New Conference Reservation Alert",
          text: "Hello", // Replace with a valid field ID
          html: `
                           Name: ${sanitizedResults.firstName} ${
            sanitizedResults.lastName
          }
                           <br />
                           Email Address: ${sanitizedResults.email}
                           <br />
                           Phone Number: ${sanitizedResults.phone}
                           <br />
                           Date: ${sanitizedResults.commencementDate}
                           <br />
                           Time: ${sanitizedResults.time}
                           <br />
                           # of Participants: ${sanitizedResults.participants}
                           <br />
                           # of Days: ${sanitizedResults.numberOfDays}
                           <br />
                           Room: ${
                             sanitizedResults.conference_room?.name
                           } @ Mk${sanitizedResults.conference_room?.price.toLocaleString(
            "en-US"
          )}
                           <br />
                           Add Ons: ${sanitizedResults.conference_addons.map(
                             (addOn) =>
                               addOn.name + " @ Mk" + addOn.price + ", "
                           )}
                           <br />
                           Special Requests: ${sanitizedResults.specialRequest}
                           <br />`,
        });

        strapi.plugins["email"].services.email.send({
          to: email,
          from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
          cc: "",
          bcc: "",
          replyTo: "",
          subject:
            "(TEST ENVIRONMENT - [CONTROLLER]) Thank you for your reservation",
          text: "Hello", // Replace with a valid field ID
          html: `
          Dear: ${sanitizedResults.firstName}
          <br />
          We have successfully received your conference reservation request. Our team will respond with a confirmation shortly.
          <br />
          We take pride in our customer care. If you are not responded to within 15 minutes please talk to one of our Managers to help us serve you better
                          `,
        });
      } catch (err) {
        console.log(err);
      }

      return this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
