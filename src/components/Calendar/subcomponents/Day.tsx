import ss from '../Calendar.module.scss';
import type {Day} from '~/functions/calendarFunctions';

const Day: React.FC<{day: Day}> = ({day}) => {
    // Check Todays Date against the Component passed Day
    const today = new Date();
    const [year, month, date] = [today.getFullYear(), today.getMonth(), today.getDate()];
    const [currYear, currMonth, currDate] = day.key.slice(0, 10).split('-');

    let isToday = false;
    if (year === +currYear! && month === +currMonth! && date === +currDate!) isToday = true;

    // CSS Classes
    const dayCSS = day.isCurrMonth ? ss.day : `${ss.day} ${ss.notCurrMonth}`;
    const todayCSS = isToday ? ss.today : '';

    return <div className={`${dayCSS} ${todayCSS}`}>{day.day}</div>;
};
export default Day;
