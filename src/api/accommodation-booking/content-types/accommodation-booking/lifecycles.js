module.exports = {
  afterCreate(event) {
    const { result, params } = event;

    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      arrivalDate,
      departureDate,
      room,
      adults,
      children,
      specialRequest,
    } = result;

    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "marketingmwsun@gmail.com",
        bcc: "",
        replyTo: "",
        subject: "(TEST ENVIRONMENT) New Accomodation Reservation Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                       Name: ${firstName} ${lastName}
                       <br />
                       Email Address: ${email}
                       <br />
                       Phone Number: ${phone}
                       <br />
                       Arrival: ${arrivalDate}
                       <br />
                       Departure: ${departureDate}
                       <br />
                       Room: ${room?.title} @ Mk${room?.price.toLocaleString(
          "en-US"
        )}
                       <br />
                       Adults: ${adults}
                       <br />
                       Children: ${children}
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
                       We have successfully received your accommodation reservation request. Our team will respond with a confirmation shortly.
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
