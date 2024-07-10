'use client';

import Interval from './subcomponents/Interval/Interval';
import getCalendarMatrix from '~/functions/calendarFunctions';

const Calendar: React.FC = () => {
    const calendarMatrix = getCalendarMatrix(2024);

    return (
        <>
            <div>Calendar</div>
            <Interval calendarMatrix={calendarMatrix} />
        </>
    );
};
export default Calendar;
