import { useState } from 'react'
import moment from "moment";
import Header from '../Header/Header'
import Monitor from '../Monitor/Monitor'
import CalendarGrid from '../CalendarGrid/CalendarGrid'
import styled from 'styled-components'

// الإطار الخارجي للتقويم
const ShadowWrapper = styled('div')`
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
`;

const Calendar = () => {
  const [today, setToday] = useState(moment());

//  داو تجلب اليوم ورقم 1 يساوي يوم الاثنين ورقم 7 يوم الأحد // يجلب الوقت الموجود علي جهازك
  moment.updateLocale('en', {week: {dow: 6}}); 
  // const today = moment();
  // سيتم استخدامه كبروبس في كومبوننت ال كالندر جريد والكلون يعني انه سيبدأ من النسخة التانية لايام الشهر حتي لايختلط عليه الشهر اللذي قبله
  const startDay = today.clone().startOf('month').startOf('week');

  // window.moment = moment;

//   const endDay = moment().endOf('month').endOf('week');
//   // console.log(startDay.format("YYYY-MM-DD"));
//   // console.log(endDay.format("YYYY-MM-DD"));
//   const calendar = [
//     [28,29,30,1,2,3,4],
//     [],
//     [],
//     [],
//     []
//   ];
//   const day = startDay.clone();

//   // window.day = day;

//   while (day.isAfter(endDay)) {
//     // calender
//     console.log(day);
//     calendar.push(day.clone());
//     day.add({amount: 1, unit: 'day'});
//   }

//   console.log(calendar);
//   window.moment = moment;
//   window.startDay = startDay;
//   window.endDay = endDay;
//   window.day = day;

  const prevHandler = () => {
    console.log('Prev');

  };
  const todayHandler = () => console.log('Today');
  const nextHandler = () => console.log('Next');

  return (
    <ShadowWrapper>
      <Header />
      {/* today سيتم استخدامه لعرض التاريخ والايام في صفحة مونيتور */}
      <Monitor 
      today={today}
      prevHandler={prevHandler}
      todayHandler={todayHandler}
      nextHandler={nextHandler}
      />
      <CalendarGrid startDay={startDay} />
    </ShadowWrapper>
  );
}

export default Calendar;