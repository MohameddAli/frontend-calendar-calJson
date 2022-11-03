import React from 'react'
import moment from "moment";

import { CellWrapper, RowInCell } from '../../containers/StyledComponents/Contaniers'



const CalendarGridHeader = () => {
  return (
      <>
      {/* اسامي ايام الاسبوع */}
			{[...Array(7)].map((_, i) => (
				// isSelectedMonth لجعل ايام الاسبوع مضاءة باللون الأبيض
				<CellWrapper isHeader isSelectedMonth key={i}>
					{/* <RowInCell justifyContent={'flex-start'} pr={1}> */}
					<RowInCell justifyContent={'flex-start'} pr={1}>
						{moment().day(i+1).format('ddd')}
					</RowInCell>
				</CellWrapper>
			))}
    </>
  )
}

export default CalendarGridHeader