
var nodemailer = require('nodemailer');

exports.email = function(userName,userEmail,userPasswors){
    var transporter = nodemailer.createTransport({
        service:'gmail.com',
        auth: {
            user:'--#  your gmail account #--',
            pass:'--#  your gmail account password #--'
        }
    });
   console.log("mail")
    let message = `שלום ${userName} \n\nשמחים לבשר לך שנרשמת בהצלחה ל-Lapin Designer\n
בהרשמתך הנך זכאי לקבלת עידכונים למייל זה שמסרת\nכמו"כ באפשרותך כעת לממש את הקופונים שבאתר \n\nהסיסמא שלך הינה היא: ${userPasswors}\nהסיסמא חשובה לכניסה לאזור האישי\n\nתודה רבה ויום טוב!\nדבורה לפין-אדריכלות ועיצוב פנים
    `
    var mailOptions = {
        from:'--#  your gmail account #--',
        to: userEmail,
        subject:"נרשמת בהצלחה ל-Lapin Designer",
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