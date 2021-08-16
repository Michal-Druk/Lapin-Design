 import './abaut.css'
import React from 'react';
import AbautItem from '../abautItem.js/abautItem'
const data = [
 
    {
      title: "מקום לימודים ותעודה",
      content: "למדתי במרכז בית יעקב בירושלים במגמת הנדסת אדריכלות ועיצוב פנים, אני בעלת תעודת הנדסאי אדריכלות ועיצוב פנים של מהט "
    },
    {
      title: "נסיון שלי",
      content: "אני עובדת כשנה, עבדתי במשרד של י.ע ובהמשך במשרד של ד.מ, זאת לצד עבודתי כמורה לחומרי בנין ופרטי בנין ובנוסף לעבודתי כעצמאית"
    },
    {
      title: "מחירים",
      content: " קצת קשה לקבוע מחירים מראש, המחירים משתנים בהתאם לסוג העבודה, גודל השטח ותנאי שטח קודמים. ניתן לקבוע פגישה על מנת לקבל הצעת מחיר מדויקת המתאימה ללקוח ולתקציב שברשותו  "
    },
    {
      title: "שעות מענה וקבלה",
      content: "ניתן לשלוח מייל בכל שעה (ראה/י 'צור קשר'), שעות מענה לטלפון: ימים א-ה בשעות 8:30-16:00, פגישת יעוץ בתאום מראש בלבד!"
    }
    ]

export default function Abaut() {
  return (
    <div class="animated fadeInDown">
         <div className="fade-in-down"></div>
         <div className="faq">
            <h2 className="abaut-title">כמה דברים עלי שאולי יענינו אתכם</h2>
            <AbautItem text={data[0]}/>
            <br/>
            <AbautItem text={data[1]}/>
            <br/>
            <AbautItem text={data[2]}/>
            <br/>
            <AbautItem text={data[3]}/>
            <br/>
        </div>
      </div>
  );
}
