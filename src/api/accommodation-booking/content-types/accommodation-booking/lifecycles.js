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
        cc: "kamsesakond@hotmail.com",
        bcc: "carolinemkutumula@gmail.com",
        replyTo: "",
        subject: "(TEST ENVIRONMENT) New Reservation Alert",
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
                       Room: ${room.title} @ Mk${room.price.toLocaleString(
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

      console.log("result: ", result);
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
