module.exports = {
  afterCreate(event) {
    const { result, params } = event;

    const { name, phone, email, amount, bookingType, currency, date } = result;
    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid

        bcc: "kamsesakond@hotmail.com",
        replyTo: "",
        subject: "New Successful Payment Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                       Name: ${name}
                       <br />
                       Email Address: ${email}
                       <br />
                       Phone Number: ${phone}
                       <br />
                       Amount: ${amount}
                       <br />
                       Currency: ${currency}
                       <br />
                       Booking: ${bookingType}
                       <br />
                       Date: ${date}
                      
                       <br />`,
      });

      strapi.plugins["email"].services.email.send({
        to: email,
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "",
        bcc: "kamsesakond@hotmail.com",
        replyTo: "",
        subject: "Your payment has been received",
        text: "Hello", // Replace with a valid field ID
        html: `
                Dear: ${name}
                <br />
                We have successfully received your payment for your booking. Our team will respond shortly.
                
                The Payment Details:

                Name: ${name}
                <br />
                Email Address: ${email}
                <br />
                Phone Number: ${phone}
                <br />
                Amount: ${amount}
                <br />
                Currency: ${currency}
                <br />
                Booking: ${bookingType}
                <br />
                Date: ${date}
                
                `,
      });
    } catch (err) {
      console.log(err);
    }

    // do something to the result;
  },
};
