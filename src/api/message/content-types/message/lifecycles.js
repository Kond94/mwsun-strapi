module.exports = {
  afterCreate(event) {
    const { result, params } = event;

    const { id, from, email, phone, subject, message } = result;

    try {
      strapi.plugins["email"].services.email.send({
        to: "frontoffice@malawisunhotel.com",
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid

        bcc: "kamsesakond@hotmail.com",
        replyTo: "",
        subject: "New Mesage Alert",
        text: "Hello", // Replace with a valid field ID
        html: `
                       Name: ${from}
                       <br />
                       Email Address: ${email}
                       <br />
                       Phone Number: ${phone}
                       <br />
                       <h4>Subject: ${subject}</h4>
                       <br />
                       <h4>Message: ${message}</h4>`,
      });

      strapi.plugins["email"].services.email.send({
        to: email,
        from: "frontoffice@malawisunhotel.com", // e.g. single sender verification in SendGrid
        cc: "",
        bcc: "kamsesakond@hotmail.com",
        replyTo: "",
        subject: "Thank you for your communication",
        text: "Hello", // Replace with a valid field ID
        html: `
                       Dear: ${from}
                       <br />
                       We have successfully received your message. Our team will respond with a confirmation shortly.
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
