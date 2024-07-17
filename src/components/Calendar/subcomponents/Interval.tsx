import ss from '../Calendar.module.scss';
import Month from './Month';
import type {Year} from '~/functions/calendarFunctions';

const Interval: React.FC<{calendarMatrix: Year}> = ({calendarMatrix}) => {
    const MonthsEls: React.FC = () => {
        return calendarMatrix.yearMatrix.map(month => {
            return <Month key={month.key} month={month} />;
        });
    };

    return (
        <div className={ss.interval}>
            <MonthsEls />
        </div>
    );
};
export default Interval;
