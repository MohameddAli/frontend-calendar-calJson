import React from 'react'

import {isDayContainCurrentEvent} from '../../helpers/helpers';
import CalendarCell from '../CalendarCell/CalendarCell';


const MonthDaysList = ({startDay, totalDays, events, openFormHandler, today, setDisplayMode}) => {
  const day = startDay.clone().subtract(1, 'day');
	const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

  return (
    <>
      {/* جدول التقويم المكون من ال42 يوم  */}
			{
				daysMap.map((dayItem) => (
          <CalendarCell today={today} events={events.filter(event => isDayContainCurrentEvent(event, dayItem))} openFormHandler={openFormHandler} dayItem={dayItem} setDisplayMode={setDisplayMode} />
				))
			}
    </>
  )
}

export default MonthDaysList