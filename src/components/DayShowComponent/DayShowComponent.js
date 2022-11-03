import React from 'react'
import styled from "styled-components";
import moment from 'moment'
import { ButtonsWrapper, ButtonWrapper, EventBody, EventItemWrapper, EventListItemWrapper, EventListWrapper, EventTitle } from '../../containers/StyledComponents/Contaniers';
import { ITEMS_PER_DAY } from '../../helpers/constants';
import { isDayContainCurrentEvent } from '../../helpers/helpers'


const DayShowWrapper = styled('div')`
display: flex;
flex-grow: 1;
border-top: 1px solid #464648;
`;

const EventsListWrapper = styled('div')`
background-color: #1E1F21;
color: #DDDDDD;
flex-grow: 1;
`;
const EventFormWrapper = styled('div')`
background-color: #27282A;
color: #DDDDDD;
width: 300px;
position: relative;
border-right: 1px solid #464648;
`;
const NoEventMsg = styled('div')`
color: #565759;
position: absolute;
top: 50%;
right: 50%;
transform: translate(50%, -50%);
`;

const ScaleWrapper = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4px;
`;

const ScaleCellWrapper = styled('div')`
  flex-grow: 1;
  position: relative;
  &:not(:last-child){
    border-bottom: 1px solid #464648;
  }
  margin-left: 32px;
`;

const ScaleCellTimeWrapper = styled('div')`
  position: absolute;
  left: -26px;
  top: -6px;
  font-size: 8px;
`;

const scaleCellEventWrapper = styled('div')`
  min-height: 16px;
`;

const EventItemButton = styled(EventItemWrapper)`
  min-width: 50px;
  width: unset;
  margin-right: 4px;
`;

const DayShowComponent = ({
  events, today, selectedEvent, changeEventHandler, cancleButtonHandler, eventFetchHandler, method, removeEventHandler, openFormHandler
}) => {
  const eventList = events.filter(event => isDayContainCurrentEvent(event, today))
  // مصفوفة لإظهار الساعات والوقت الحلقة رقم 13
  const cells = [... new Array(ITEMS_PER_DAY)].map((_, i) => {
  const temp = [];

    eventList.forEach(event => {
      // event.date -> '1661295600' -> timestamp -> H ? -> 0
      if (+moment.unix(+event.date).format('H') === i){
        temp.push(event);
      }
    })
    return temp;
  })

  // [
  //   0: [event1, event2]],
  //   1: undefiend,
  //   2: undefiend,
  //   3: undefiend,
  //   4: undefiend,
  //   5: undefiend,

  //   6: [event5],

  //   23: undefiend
  // ]

    return (
      <DayShowWrapper>
        <EventsListWrapper>
          {/* <EventListWrapper>
            {
              eventList.map(event => (
                <EventListItemWrapper key={event.id}>
                  <EventItemWrapper onClick={() => openFormHandler('تحديث', event)}>
                    {event.title}
                  </EventItemWrapper>
                </EventListItemWrapper>
              ))
            }
          </EventListWrapper> */}
          <ScaleWrapper>
            {
              cells.map((eventsList, i) => (
                <ScaleCellWrapper>
                  <ScaleCellTimeWrapper>
                    {
                      i ? (
                        <>
                          {`${i}` .padStart(2, '0')}:00
                        </>
                      ) : null
                    }
                  </ScaleCellTimeWrapper>

                  <scaleCellEventWrapper>
                    {
                      eventsList.map(event => (
                        <EventItemButton onClick={() => openFormHandler('تحديث', event)}>
                          {event.title}
                        </EventItemButton>
                      ))
                    }
                  </scaleCellEventWrapper>
                </ScaleCellWrapper>
              ))
            }
          </ScaleWrapper>
        </EventsListWrapper>
        <EventFormWrapper>
          {
            selectedEvent ? (
              <>
                <div>
                  <EventTitle 
                    value={selectedEvent.title}
                    onChange={e => changeEventHandler(e.target.value, 'title')}
                    placeholder='العنوان...'
                  />
                  <EventBody 
                    value={selectedEvent.description}
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
                </div>
              </>
            ) : (
              <>
                <div>
                  <button onClick={() => openFormHandler('إنشاء', null, today)}>أضف حدث جديد</button>
                </div>
                <NoEventMsg>لم يتم تحديد حدث بعد</NoEventMsg>
              </>
              
            )
          }
        </EventFormWrapper>
      </DayShowWrapper>
    )
}

export default DayShowComponent
