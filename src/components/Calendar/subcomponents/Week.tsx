import ss from '../Calendar.module.scss';
import Day from './Day';
import type {Week} from '~/functions/calendarFunctions';

const Week: React.FC<{week: Week}> = ({week}) => {
    const DaysEls: React.FC = () => {
        return week.dayArray.map(day => {
            return <Day key={day.key} day={day} />;
        });
    };

    return (
        <div className={ss.week}>
            <DaysEls />
        </div>
    );
};
export default Week;
