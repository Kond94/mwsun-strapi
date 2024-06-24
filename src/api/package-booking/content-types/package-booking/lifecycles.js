module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    const {
      id,
      name,
      email,
      phone,
      date,
      participants,

      specialRequest,
    } = result;
    const { packageName, packagePrice, totalPrice } = params;
    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid

        bcc: "kamsesakond@gmail.com",
        replyTo: "",
        subject: "New Package Reservation Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                           Name: ${name}
                           <br />
                           Email Address: ${email}
                           <br />
                           Phone Number: ${phone}
                           <br />
                           Date: ${date}
                           <br />
                           # of Participants: ${participants}
                           <br />
                           Package: ${packageName} @ $${packagePrice} pp
                           <br />
                           Total Price: $${totalPrice}
                          <br />
                           Special Requests: ${specialRequest}
                           <br />`,
      });

      strapi.plugins["email"].services.email.send({
        to: email,
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "",
        bcc: "kamsesakond@gmail.com",
        replyTo: "",
        subject: "Thank you for your reservation",
        text: "Hello", // Replace with a valid field ID
        html: `
                           Dear: ${name}
                           <br />
                           We have successfully received your Package booking reservation request. Our team will respond with a confirmation shortly.
                           <br />

                           The booking Details:
                           <br />

                           Name: ${name}
                           <br />
                           Email Address: ${email}
                           <br />
                           Phone Number: ${phone}
                           <br />
                           Date: ${date}
                           <br />
                           # of Participants: ${participants}
                           <br />
                           Package: ${packageName} @ $${packagePrice} pp
                           <br />
                           Total Price: $${totalPrice}
                          <br />
                           Special Requests: ${specialRequest}
                           <br />
                         `,
      });
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
