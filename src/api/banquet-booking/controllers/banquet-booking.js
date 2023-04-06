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
      console.log(response);

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
                           Name: ${response.firstName} ${response.lastName}
                           <br />
                           Email Address: ${response.email}
                           <br />
                           Phone Number: ${response.phone}
                           <br />
                           Date: ${response.commencementDate}
                           <br />
                           Time: ${response.time}
                           <br />
                           # of Participants: ${response.participants}
                           <br />
                           # of Days: ${response.numberOfDays}
                           <br />
                           Room: ${
                             response.conference_room?.name
                           } @ Mk${response.conference_room?.price.toLocaleString(
            "en-US"
          )}
                           <br />
                           Add Ons: ${response.conference_addons.map(
                             (addOn) =>
                               addOn.name + " @ Mk" + addOn.price + ", "
                           )}
                           <br />
                           Special Requests: ${response.specialRequest}
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
          Dear: ${response.firstName}
          <br />
          We have successfully received your conference reservation request. Our team will respond with a confirmation shortly.
          <br />
          We take pride in our customer care. If you are not responded to within 15 minutes please talk to one of our Managers to help us serve you better
                          `,
        });
      } catch (err) {
        console.log(err);
      }

      return response;
    },
  })
);
