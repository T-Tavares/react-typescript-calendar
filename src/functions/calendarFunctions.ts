// ---------------------------------------------------------------- //
// ------------------------ CALENDAR TYPES ------------------------ //
// ---------------------------------------------------------------- //

// prettier-ignore
type DayNum = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type MonthArray = {monthIndex: MonthIndex; monthArray: number[]};

interface Day {
    key: string;
    day: DayNum;
    isCurrMonth: boolean;
    todoData: string[] | null;
}

type Week = {
    key: string;
    dayArray: Day[];
};

interface Month {
    key: string;
    monthIndex: MonthIndex;
    monthMatrix: Week[];
}

export type Year = {
    key: string;
    year: number;
    yearMatrix: Month[];
};

export type Interval = Year[];

// ---------------------------------------------------------------- //
// ------------------ CALENDAR HELPER FUNCTIONS ------------------- //
// ---------------------------------------------------------------- //

const buildSequenceArray = (start: number, end?: number): number[] => {
    // If only one argument => Assumes start is zero
    if (!end) {
        end = start;
        start = 0;
    }
    return Array.from({length: ++end - start}, (_, i) => i + start);
};

const daysInMonth = (year: number, monthIndex: MonthIndex): number => new Date(year, ++monthIndex, 0).getDate();

const getWeekDayIndex = (year: number, monthIndex: MonthIndex, day: DayNum) => new Date(year, monthIndex, day).getDay();

// ---------------------------------------------------------------- //
// ---------------------- CALENDAR FUNCTIONS ---------------------- //
// ---------------------------------------------------------------- //

const getMonthArray = (year: number, monthIndex: MonthIndex): MonthArray => {
    const totalDays = daysInMonth(year, monthIndex);

    return {
        monthIndex: monthIndex,
        monthArray: buildSequenceArray(1, totalDays),
    };
};

const getMonthMatrix = (year: number, month: MonthArray) => {
    // -------------------------- 1 - SETUP --------------------------- //
    // Those are the controllers that will help populate the monthMatrix

    const monthMatrix: Week[] = [[], [], [], [], [], []]; //                 Month Placeholder
    let weekIndex = 0; //                                                    Controlls which week are days being pushed to

    // -------------------- 2 - POPULATING MATRIX --------------------- //
    // ------------------- POPULATING MONTH MATRIX -------------------- //

    month.monthArray.forEach(day => {
        const weekDayIndex = getWeekDayIndex(year, month.monthIndex, day as DayNum);

        const key = `${year}-${month.monthIndex}-${day}`;
        monthMatrix[weekIndex]!.push({key, day: day as DayNum, isCurrMonth: true, todoData: null});

        if (weekDayIndex === 6) ++weekIndex;
    });

    // -------------- 3 - FILL STARTING AND ENDING WEEKS -------------- //

    // --------------------- FILLING FIRST WEEK  ---------------------- //
    // ------------------- WITH PREVIOUS MONTH DAYS ------------------- //

    const isFirstWeekIncomplete = monthMatrix[0]!.length < 7;

    if (isFirstWeekIncomplete) {
        const extraDays = 7 - monthMatrix[0]!.length;
        for (let i = 0; i < extraDays; i++) {
            const DateObj = new Date(year, month.monthIndex, -i);
            const day = DateObj.getDate();

            const key = `${year}-${month.monthIndex}-${day}-f`;
            monthMatrix[0]!.unshift({key, day: day as DayNum, isCurrMonth: false, todoData: null});
        }
    }

    // -------------- 3 - FILL STARTING AND ENDING WEEKS -------------- //

    // -------------- FILLING THE WEEK BEFORE LAST WEEK --------------- //
    // --------------------- WITH NEXT MONTH DAYS --------------------- //

    const beforeLastWeekIncomplete = monthMatrix[4]!.length < 7;
    let prevDaysCount = 0;

    if (beforeLastWeekIncomplete) {
        const extraDays = 7 - monthMatrix[4]!.length;
        prevDaysCount = extraDays;

        for (let i = 0; i < extraDays; i++) {
            const DateObj = new Date(year, month.monthIndex + 1, i + 1);
            const day = DateObj.getDate();

            const key = `${year}-${month.monthIndex}-${day}-f`;
            monthMatrix[4]!.push({key, day: day as DayNum, isCurrMonth: false, todoData: null});
        }
    }

    // -------------- 3 - FILL STARTING AND ENDING WEEKS -------------- //

    // ---------------------- FILLING LAST WEEK ----------------------- //
    // --------------------- WITH NEXT MONTH DAYS --------------------- //

    const lastWeekIncomplete = monthMatrix[5]!.length < 7;
    if (lastWeekIncomplete) {
        const extraDays = 7 - monthMatrix[5]!.length;

        for (let i = 0; i < extraDays; i++) {
            const DateObj = new Date(year, month.monthIndex + 1, i + 1 + prevDaysCount);
            const day = DateObj.getDate();

            const key = `${year}-${month.monthIndex}-${day}-f`;
            monthMatrix[5]!.push({key, day: day as DayNum, isCurrMonth: false, todoData: null});
        }
    }

    const key = `${year}-${month.monthIndex}`;
    return {key: key, monthIndex: month.monthIndex, monthMatrix: monthMatrix};
};

const getCalendarMatrix = (year: number): Year => {
    const yearMonthsIndexArray = buildSequenceArray(0, 11);
    const yearArrays = yearMonthsIndexArray.map(monthIndex => getMonthArray(year, monthIndex as MonthIndex));
    const yearMatrix = yearArrays.map(month => getMonthMatrix(year, month));
    const key = `${year}`;
    return {key, year, yearMatrix};
};

export default getCalendarMatrix;

console.log(JSON.stringify(getCalendarMatrix(2024), null, 2));
