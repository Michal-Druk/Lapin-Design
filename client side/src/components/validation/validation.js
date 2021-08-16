

function validateID(id) {
    //Check if the ID number is correct
    if (id === "") {
        return "זהו שדה חובה"
    }
    if (id.length !== 9 || isNaN(id)) {
        return "על מספר הזהות להכיל 9 ספרות";
    }

    let counter = 0;
    for (let i = 0; i < id.length; i++) {
        let thisDigit = Number(id[i]) * ((i % 2) + 1);
        counter += (thisDigit > 9) ? thisDigit - 9 : thisDigit;
    }
    if (counter % 10 === 0) {
        return "";
    }
    return ("מספר זהות שגוי");
}
function validateName(name) {
    //Check if the name is correct (has just letters)
    if (name === "") {
        return "זהו שדה חובה";
    }
    if (/^[A-Za-zא-ת\s]+$/.test(name)) {
        return "";
    }
    return "שם מורכב מאותיות בלבד";
}

function validateSubject(subject) {

    if (subject === "") {
        return "זהו שדה חובה";
    }
    return "";

}


function validateEmail(email) {
    //Check if the email is correct 
    if (/\S+@\S+\.\S+/.test(email))
        return "";
    if (email === "") {
        return "זהו שדה חובה";
    }
    return "המייל שהכנסת שגוי";
}

function validatePassword(password, passwordValidation) {
    //Check if the password is correct 
    if (password === passwordValidation && password !== "")
        return "";
    if (password === "")
        return "חובה להקיש סיסמא"
    if (passwordValidation === "")
        return "שים/י לב!- יש צורך באימות סיסמא"

    return "אימות הסיסמא שגוי";
}

function validatePhone(number) {
    //Check if the phone number is correct
    if (number === "") {
        return ""
    }
    for (const i in number) {
        if (isNaN(number[i])) {
            return "על הטלפון להכיל ספרות בלבד"
        }
    }
    if (number.length !== 10) return "על מספר הטלפון להכיל 10 ספרות";

    return "";
}
function Password(password) {
    if (password === "")
        return "זהו שדה חובה"
    return "";
}
export {
    validateName,
    validateEmail,
    validatePhone,
    validateSubject,
    Password,
    validateID,
    validatePassword
}