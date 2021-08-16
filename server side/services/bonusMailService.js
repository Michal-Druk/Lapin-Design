
var nodemailer = require('nodemailer');

exports.email = function(userName,userEmail,code){
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'--#  your gmail account #--',
            pass:'--#  your gmail account password #--'
        }
    });
   console.log("mail")
    let message = `שלום ${userName} \n\nקוד הקופון שלך הוא: ${code}\nמימוש הקופון בהצגת קוד קופון בלבד!\n\nתודה רבה ויום טוב!\nדבורה לפין-אדריכלות ועיצוב פנים `
    var mailOptions = {
        from:'--#  your gmail account #--',
        to: userEmail,
        subject:"קבלת קוד קופון",
        text: message
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error);
        } else{
            console.log('sent email!')
        }
    })

}