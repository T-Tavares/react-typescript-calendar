import ss from '../Calendar.module.scss';
import Week from './Week';
import {getMonthByIndex} from '~/functions/calendarFunctions';
import type {Month} from '~/functions/calendarFunctions';

const Month: React.FC<{month: Month}> = ({month}) => {
    const monthLabel = getMonthByIndex(month.monthIndex);

    const WeekEls: React.FC = () => {
        return month.monthMatrix.map(week => {
            return <Week key={week.key} week={week} />;
        });
    };

    return (
        <div className={ss.monthBorderWrapper}>
            <div className={ss.month}>
                <h1>{monthLabel}</h1>
                <div className={ss.weekLabel}>
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tus</div>
                    <div>Wes</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <WeekEls />
            </div>
        </div>
    );
};
export default Month;
