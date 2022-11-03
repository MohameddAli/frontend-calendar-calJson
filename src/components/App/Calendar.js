import React, {useEffect, useState} from 'react';
import moment from "moment";
import Header from "../Header/Header";
import Monitor from "../Monitor/Monitor";
import CalendarGrid from "../CalendarGrid/CalendarGrid";
import styled from "styled-components";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from '../../helpers/constants';
import DayShowComponent from '../DayShowComponent/DayShowComponent';
import { ButtonsWrapper, ButtonWrapper, EventBody, EventTitle } from '../../containers/StyledComponents/Contaniers';

const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow:hidden;
  box-shadow: 0 0 0 1px #1A1A1A, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
  direction: rtl;
`;

const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  // width: 320px;
  //height: 300px;
  min-width: 320px;
  height: 132px;
  background-color: #1E1F21;
  color: #DDDDDD;
  box-shadow: unset;
`;



const url = process.env.API_URL ? process.env.API_URL : 'http://localhost:3001';

const totalDays = 42;
// هذا المتغير في حالة ان خانة التقويم فارغة فأنها تظهر لك فارغة لو الكود هذا مش موجود مش حيخدم التطبيق
const defaultEvent = {
  title: '',
  description: '',
  date: moment().format('X')
}

function App() {
  
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale('en', 
  {
    week: {dow: 6},
    weekdaysMin : ["Fr","Sa","Su", "Mo", "Tu", "We", "Th"],
    weekdaysShort : [ "جمعة","سبت" ,"أحد", "إثنين", "ثلاثاء", "إربعاء", "خميس"],
    weekdays : [
         "الجمعة", "السبت", "الأحد", "الإثنين", "الثلاثاء", "الإربعاء", "الخميس"
    ],
        months : [
        "محرم", "صفر", "ربيع الأول", "ربيع الآخر", "جمادى الأولى", "جمادى الآخرة", "رجب",
        "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
    ]
  });
  // const today = moment();
  const [today, setToday] = useState(moment())
  // اليوم اللي يبدا بيه التقويم
  const startDay = today.clone().startOf('month').startOf('week');

  // window.moment = moment;

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, displayMode));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday(prev => prev.clone().add(1, displayMode));
// كود يوز ايفيكت للتحكم في البيانات وعرضها من ملف جيسون
  const [method, setMethod] = useState(null);
// useState لعرض بطمة تعديل الحدث
  const [isShowForm, setIsShowForm] = useState(false);
  // useState لتحديث حالة الحدث
  const [event, setEvent] = useState(null);
  const [events, setEvents] = useState([]);
  // format('X') unix timestamp
  const startDayQuery = startDay.clone().format('X');
  const endDayQuery = startDay.clone().add(totalDays, 'days').format('X');
  // console.log("start", startDateQuery);
  // console.log("end", endDateQuery);
  // useEffect للتعامل مع قاعدة بيانات جيسون وجلب البيانات منها وعرضها
  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDayQuery}&date_lte=${endDayQuery}`)
    .then(res => res.json())
    .then(res => {
      // console.log("Response: ", res)
      setEvents(res)
    });
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    // console.log('onDoubleClicked', methodName);
    // setIsShowForm(true);
    setEvent(eventForUpdate || {...defaultEvent, date: dayItem.format('X')});
    setMethod(methodName);
  }

  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    console.log('onDoubleClicked', methodName);
    setIsShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
  }

  // دالة لإغلاق النوافذ المفتوحة
  const cancleButtonHandler = () => {
    setIsShowForm(false);
    // عندما تقوم بإغلاق صفحة التعديل يعيد القيمة فارغة حتي تستطيع فتح واحدة اخري
    setEvent(null);
  }
  // دالة لتستطيع الكتابة في حقل الادخال
  const changeEventHandler = (text, field) => {
    setEvent(prevState => ({
      ...prevState,
      [field]: text
    }))
  }
  // دالة لتحديث الأحداث وارسالها لقاعدة البيانات وحفظها هناك لعرضها في التقويم
  const eventFetchHandler = () => {
    const fetchUrl = method === 'تحديث' ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === 'تحديث' ? 'PATCH' : 'POST';

    fetch(fetchUrl, {
     method: httpMethod,
     headers: {
      'Content-Type': 'application/json'
     },
     body: JSON.stringify(event)
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      if(method === 'تحديث') {
        setEvents(prevState => prevState.map(eventEl => eventEl.id === res.id ? res : eventEl));
      } else {
        setEvents(prevState => [...prevState, res]);
      }
    cancleButtonHandler();
    })
  }

  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = 'DELETE';

    fetch(fetchUrl, {
     method: httpMethod,
     headers: {
      'Content-Type': 'application/json'
     },
    //  body: JSON.stringify(event)
    })
    .then( res => res.json())
    .then( res => {
      console.log(res)
      setEvents(prevState => prevState.filter(eventEl => eventEl.id !== event.id));
    cancleButtonHandler();
    })
  }

  return (
    <>
    {
      isShowForm ? (
         <FormPositionWrapper onClick={cancleButtonHandler}>
          <FormWrapper onClick={e => e.stopPropagation()}>
            <EventTitle 
              value={event.title}
              onChange={e => changeEventHandler(e.target.value, 'title')}
              placeholder='العنوان...'
            />
            <EventBody 
              value={event.description}
              onChange={e => changeEventHandler(e.target.value, 'description')}
              placeholder='معلومات الحدث...'
            />
            <ButtonsWrapper>
              <ButtonWrapper onClick={cancleButtonHandler}>إغلاق</ButtonWrapper>
              <ButtonWrapper onClick={eventFetchHandler}>{method}</ButtonWrapper>
              {
                method === 'تحديث' ? (
                  <ButtonWrapper danger onClick={removeEventHandler}>حذف</ButtonWrapper>
                ) : null
              }
              
            </ButtonsWrapper> 
          </FormWrapper>
         </FormPositionWrapper>
      ) : null
    }
      <ShadowWrapper>
        <Header />
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        {
          displayMode === DISPLAY_MODE_MONTH ? (
            <CalendarGrid startDay={startDay} today={today} totalDays={totalDays} events={events} openFormHandler={openModalFormHandler} setDisplayMode={setDisplayMode} />
          ) : null
        }
        {
          displayMode === DISPLAY_MODE_DAY ? (
            <DayShowComponent
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
            changeEventHandler={changeEventHandler}
            cancleButtonHandler={cancleButtonHandler}
            eventFetchHandler={eventFetchHandler}
            method={method}
            removeEventHandler={removeEventHandler}
            openFormHandler={openFormHandler}
            />
          ) : null
        }
      </ShadowWrapper>
    </>
  );
}

export default App;
