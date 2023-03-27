module.exports = {
  afterCreate(event) {
    const { result, params } = event;

    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      commencementDate,
      time,
      conference_addons,
      participants,
      conference_room,
      numberOfDays,
      specialRequest,
    } = result;

    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "marketingmwsun@gmail.com",
        bcc: "",
        replyTo: "",
        subject: "(TEST ENVIRONMENT) New Conference Reservation Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                         Name: ${firstName} ${lastName}
                         <br />
                         Email Address: ${email}
                         <br />
                         Phone Number: ${phone}
                         <br />
                         Date: ${commencementDate}
                         <br />
                         Time: ${time}
                         <br />
                         # of Participants: ${participants}
                         <br />
                         # of Days: ${numberOfDays}
                         <br />
                         Room: ${
                           conference_room?.title
                         } @ Mk${conference_room?.price.toLocaleString("en-US")}
                         <br />
                         Add Ons: ${conference_addons.map(
                           (addOn) => addOn.name + " @ Mk" + addOn.price + ", "
                         )}
                         <br />
                         Special Requests: ${specialRequest}
                         <br />`,
      });

      strapi.plugins["email"].services.email.send({
        to: email,
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "",
        bcc: "",
        replyTo: "",
        subject: "(TEST ENVIRONMENT) Thank you for your reservation",
        text: "Hello", // Replace with a valid field ID
        html: `
                         Dear: ${firstName}
                         <br />
                         We have successfully received your conference reservation request. Our team will respond with a confirmation shortly.
                         <br />
                         We take pride in our customer care. If you are not reponded to within 15 minuites please talk to one of our Managers to help us serve you better
                        `,
      });
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
