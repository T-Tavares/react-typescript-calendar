import ss from './Calendar.module.scss';
import Interval from './subcomponents/Interval';
import getCalendarMatrix from '~/functions/calendarFunctions';

const Calendar: React.FC = () => {
    const calendarMatrix = getCalendarMatrix(2024);

    return (
        <div className={ss.calendar}>
            <h1 className={ss.title}>React & Typescript Calendar</h1>
            <Interval calendarMatrix={calendarMatrix} />
        </div>
    );
};
export default Calendar;
