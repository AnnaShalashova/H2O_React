import wNumb from 'wnumb';

export const generateData = () => {
    let result = [];
    for (let i = 1; i <= 12; i += 1) {
        const b2bRevenueAmount = Math.floor(Math.random() * ((150000) + 1));
        const b2bExpansesAmount = Math.floor(Math.random() * ((50000) + 1));
        const b2bTotalAmount = b2bRevenueAmount - b2bExpansesAmount;

        const b2cRevenueAmount = Math.floor(Math.random() * ((50000) + 1));
        const b2cExpansesAmount = Math.floor(Math.random() * ((10000) + 1));
        const b2cTotalAmount = b2cRevenueAmount - b2cExpansesAmount;

        const dataForB2B = [
            {
                division: 'B2B',
                date: new Date(2023, i),
                amount: b2bRevenueAmount,
                type: 'revenue'
            },
            {
                division: 'B2B',
                date: new Date(2023, i),
                amount: b2bExpansesAmount,
                type: 'expanses'
            },
            {
                division: 'B2B',
                date: new Date(2023, i),
                amount: b2bTotalAmount,
                type: 'income'
            }
        ];
        const dataForB2C = [
            {
                division: 'B2C',
                date: new Date(2023, i),
                amount: b2cRevenueAmount,
                type: 'revenue'
            },
            {
                division: 'B2C',
                date: new Date(2023, i),
                amount: b2cExpansesAmount,
                type: 'expanses'
            },
            {
                division: 'B2C',
                date: new Date(2023, i),
                amount: b2cTotalAmount,
                type: 'income'
            }
        ];

        result = [...result, ...dataForB2B, ...dataForB2C];

    }

    return result
}

export const priceNoDec = wNumb({
    prefix: '',
    decimals: 0,
    thousand: ' '
});

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}


export const normalizeDataChart = (data) => {

    let newData = {
        expanses: Array(12).fill(0),
        income: Array(12).fill(0),
        revenue: Array(12).fill(0),
    };

    data?.forEach((item) => {
        const { type, date, amount } = item;
        const normalizeDate = new Date(Date.parse(date));

        const month = normalizeDate.getMonth();
        newData[type][month] = newData[type][month] + amount;

    })

    return newData;
}


