module.exports = {
  afterCreate(event) {
    const { result, params } = event;

    const {
      id,
      name,
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
        subject: "New Accommodation Reservation Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                       Name: ${name}
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
        subject: "Thank you for your reservation",
        text: "Hello", // Replace with a valid field ID
        html: `
                Dear: ${name}
                <br />
                We have successfully received your accommodation reservation request. Our team will respond with a confirmation shortly.
                      `,
      });
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
