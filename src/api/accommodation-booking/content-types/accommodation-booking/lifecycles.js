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
    const { roomName, roomPrice, totalPrice } = params;
    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid

        bcc: "kamsesakond@gmail.com",
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
                       Room: ${roomName} @ Mk${roomPrice}
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
        bcc: "kamsesakond@gmail.com",
        replyTo: "",
        subject: "Thank you for your reservation",
        text: "Hello", // Replace with a valid field ID
        html: `
                Dear: ${name}
                <br />
                We have successfully received your accommodation reservation request. Our team will respond with a confirmation shortly.
                
                The booking Details:

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
                Room: ${roomName} @ Mk${roomPrice}
                <br />
                Total Price: ${totalPrice}
                                   <br />
                                   Adults: ${adults}
                                   <br />
                                   Children: ${children}
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
