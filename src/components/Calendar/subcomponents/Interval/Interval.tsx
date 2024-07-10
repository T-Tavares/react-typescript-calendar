import Month from '../Month/Month';
import type {Year} from '~/functions/calendarFunctions';

const Interval: React.FC<{calendarMatrix: Year}> = ({calendarMatrix}) => {
    console.log(calendarMatrix);

    // const MonthsEls: React.FC = () =>
    //     calendarMatrix.yearMatrix.map(month => {
    //         return <Month month={month} />;
    //     });

    return (
        <>
            <div>Interval</div>
            <Month />
        </>
    );
};
export default Interval;
