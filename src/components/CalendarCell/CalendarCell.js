import React from 'react'
import { isCurrentDay, isSelectedMonth } from '../../helpers/helpers';
import {CellWrapper, RowInCell} from '../../containers/StyledComponents/Contaniers'
import styled from 'styled-components';
import { DISPLAY_MODE_DAY } from '../../helpers/constants';

const DayWrapper = styled.div`
	height: 31px;
	width: 31px;
    display: flex;
  	align-items: center;
  	justify-content: center;
  	margin: 2px;
	cursor: pointer;
;`

const CurrentDay = styled('div')`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShowDayWrapper = styled('div')`
	display: flex;
	justify-content: flex-start;
`;

const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const EventListItemWrapper = styled('li')`
	padding-left: 2px;
	padding-right: 2px;
	margin-bottom: 2px;
	display: flex;
`;

const EventItemWrapper = styled('button')`
	position: relative;
	flex-grow: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 114px;
	border: unset;
	color: #DDDDDD;
	cursor: pointer;
	margin: 0;
	padding: 0;
	text-align: right;
	background-color: #5d5f63;
	border: 1px solid #5d5f63;
	border-radius: 2px;
`;


const CalendarCell = ({dayItem, today, openFormHandler, events, setDisplayMode}) => {
  return (
    <>
    		<CellWrapper
						isWeekday={dayItem.day() === 6 || dayItem.day() === 5}
            			key={dayItem.unix()}
						isSelectedMonth={isSelectedMonth(dayItem, today)}
					>
						{/* <RowInCell justifyContent={'flex-end'}> */}
						<RowInCell justifyContent={'flex-start'}>
							<ShowDayWrapper>
								<DayWrapper onDoubleClick={() => openFormHandler('إنشاء', null, dayItem)}>
									{
										isCurrentDay(dayItem) ? (
											<CurrentDay>{dayItem.format('D')}</CurrentDay>
										) : (
											dayItem.format('D')
										)
									}
									{/* في الاعلي قمنا بوضعها في جملة اف ستيتمنت شرطية 
									{!isCurrentDay(dayItem) && dayItem.format('D')}
									{isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>} */}
								</DayWrapper>
							</ShowDayWrapper>
							<EventListWrapper>
								{/* <div>يبدأ: {dayItem.format('X')}</div> */}
								{
									events
											// .filter(event => isDayContainCurrentEvent(event, dayItem))
                      .slice(0, 2)
											.map(event => (
											<EventListItemWrapper key={event.id} >
												{/* onDoubleClick={() => openFormHandler('Update', event) تقوم بتحديث حالة الحدث باستخدام setEvent state */}
												<EventItemWrapper onDoubleClick={() => openFormHandler('تحديث', event)}>
													{event.title}
												</EventItemWrapper>
											</EventListItemWrapper>
										))
								}
                {
                  events.length > 2 ? (
                    <EventListItemWrapper key="عرض المزيد" >
                      {/* onDoubleClick={() => openFormHandler('Update', event) تقوم بتحديث حالة الحدث باستخدام setEvent state */}
                      <EventItemWrapper onClick={() => setDisplayMode(DISPLAY_MODE_DAY)} >
                        عرض المزيد...
                      </EventItemWrapper>
                    </EventListItemWrapper>
                  ) : null
                }
								{/* <div>ينتهي: {dayItem.clone().endOf('day').format('X')}</div> */}
							</EventListWrapper>
						</RowInCell>
					</CellWrapper>
    </>
  )
}

export default CalendarCell