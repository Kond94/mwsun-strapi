module.exports = {
  afterCreate(event) {
    const { result, params } = event;
    const {
      id,
      name,
      email,
      phone,
      date,
      time,
      banquet_addons,
      participants,
      banquet_room,
      specialRequest,
    } = result;

    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid

        bcc: "",
        replyTo: "",
        subject: "New Banquet Reservation Alert",
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
                           Time: ${time}
                           <br />
                           # of Participants: ${participants}
                           <br />
                           Room: ${
                             banquet_room.name
                           } @ Mk${banquet_room?.price.toLocaleString("en-US")}
                           <br />
                           Add Ons: ${banquet_addons?.map((addOn) =>
                             addOn.name + addOn.perPerson
                               ? " @ Mk" + addOn.price * participants
                               : " @ Mk" + addOn.price + ", "
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
        subject: "Thank you for your reservation",
        text: "Hello", // Replace with a valid field ID
        html: `
                           Dear: ${name}
                           <br />
                           We have successfully received your banquet reservation request. Our team will respond with a confirmation shortly.
                         `,
      });
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
