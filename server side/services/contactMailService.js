
var nodemailer = require('nodemailer');

exports.contact_email = function(req, res, next){
    console.log(req.body)
    const data= req.body
    console.log(data)
    var transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:'--#  your gmail account #--',
            pass:'--#  your gmail account password #--'
        }
    });
    let userMessage = `שלום ${data.userName} \n\nקיבלתי את פניתך, אשתדל להתפנות אליך בהקדם\n\nתודה רבה!\nדבורה לפין-אדריכלות ועיצוב פנים `
    var userMailOptions = {
        from:'--#  your gmail account #--',
        to: data.userEmail,
        subject:`מענה בנושא ${data.subject}`,
        text: userMessage
    }
    let adminMessage = `דבורה שלום \n\n ${data.userName} מנסה ליצור קשר \n\n${data.massege}\n\nכתובת מייל: ${data.userEmail}\nמספר טלפון: ${data.userPhone} `
    var adminMailOptions = {
        from:'--#  your gmail account #--',
        to: "--#  your work gmail account #--",
        subject:`ניסיון יצירת קשר בנושא: ${data.subject}`,
        text: adminMessage
    }
    transporter.sendMail(adminMailOptions, function(error, info){
        if(error) {
            console.log(error);
        } else{
            transporter.sendMail(userMailOptions, function(error, info){
                if(error) {
                    console.log(error);
                } else{
                    console.log('sent email!')
                    return res.status(200);
                }
            })
           
        }
       
    })

}