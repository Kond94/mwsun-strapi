module.exports = {

  afterCreate(event) {
    const { result, params } = event;
 const {
          id,
          from,
          phone,
          email,
          subject,
          message,
        } = params.data;  
     
     try{
             strapi.plugins['email'].services.email.send({
              to: result.email,
              from: 'frontoffice@malawisunhotel.com', // e.g. single sender verification in SendGrid
              cc: '',
              bcc: '',
              replyTo: '',
              subject: 'Message Received',
              text: 'Hello', // Replace with a valid field ID
              html: 'Hello ' + from+'. We have received your message and willl get back to you shortly.', 
                
            })
        } catch(err) {
            console.log(err);
        }

    // do something to the result;
  },
};