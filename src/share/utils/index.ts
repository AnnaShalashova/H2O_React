import wNumb from 'wnumb';
import { DivisionType, Operation } from '../../redux/operationsSlice';

export enum OperationType {
    EXPANSES = 'expanses',
    INCOME = 'income',
    REVENUE = 'revenue'
}

export type OperationsIncomes = {
    totalIncome: number,
    b2bIncome: number,
    b2cIncome: number,
}

export type NormalizeData = {
    [OperationType.EXPANSES]: number[];
    [OperationType.INCOME]: number[];
    [OperationType.REVENUE]: number[];
};

export type ValidateOperationsProps = {
    operations: Operation[],
    cardActive: DivisionType
}

export const generateData = (): Operation[] => {
    let result: Operation[] = [];
    for (let i = 1; i <= 12; i += 1) {
        const b2bRevenueAmount = Math.floor(Math.random() * (150000 + 1));
        const b2bExpansesAmount = Math.floor(Math.random() * (50000 + 1));
        const b2bTotalAmount = b2bRevenueAmount - b2bExpansesAmount;

        const b2cRevenueAmount = Math.floor(Math.random() * (50000 + 1));
        const b2cExpansesAmount = Math.floor(Math.random() * (10000 + 1));
        const b2cTotalAmount = b2cRevenueAmount - b2cExpansesAmount;

        const dataForB2B = [
            {
                division: DivisionType.B2B,
                date: new Date(2023, i).toString(),
                amount: b2bRevenueAmount,
                type: OperationType.REVENUE,
            },
            {
                division: DivisionType.B2B,
                date: new Date(2023, i).toString(),
                amount: b2bExpansesAmount,
                type: OperationType.EXPANSES,
            },
            {
                division: DivisionType.B2B,
                date: new Date(2023, i).toString(),
                amount: b2bTotalAmount,
                type: OperationType.INCOME,
            },
        ];
        const dataForB2C = [
            {
                division: DivisionType.B2C,
                date: new Date(2023, i).toString(),
                amount: b2cRevenueAmount,
                type: OperationType.REVENUE,
            },
            {
                division: DivisionType.B2C,
                date: new Date(2023, i).toString(),
                amount: b2cExpansesAmount,
                type: OperationType.EXPANSES,
            },
            {
                division: DivisionType.B2C,
                date: new Date(2023, i).toString(),
                amount: b2cTotalAmount,
                type: OperationType.INCOME,
            },
        ];

        result = [...result, ...dataForB2B, ...dataForB2C];
    }
    return result;
};

export const priceNoDec = wNumb({
    prefix: '',
    decimals: 0,
    thousand: ' ',
});

export const isEmpty = (data: any): boolean => {
    return Object.keys(data).length === 0;
};


export const normalizeDataChart = (data: Operation[]): NormalizeData => {
    const newData: NormalizeData = {
        expanses: Array(12).fill(0),
        income: Array(12).fill(0),
        revenue: Array(12).fill(0),
    };

    data.forEach((item) => {
        const { type, date, amount } = item;
        const normalizeDate = new Date(Date.parse(date));

        const month = normalizeDate.getMonth();
        newData[type][month] = newData[type][month] + amount;
    });

    return newData;
};

export const getOperationsIncomes = (operations: Operation[]): OperationsIncomes => {
    let totalIncome: number = 0;
    let b2bIncome: number = 0;
    let b2cIncome: number = 0;

    operations.forEach((operation) => {
        const { type, amount, division } = operation;
        if (type !== 'income') return;
        totalIncome += +amount;
        division === 'B2B' ? (b2bIncome += +amount) : (b2cIncome += +amount);
    });

    return { totalIncome, b2bIncome, b2cIncome }
}

export const validateOperations = (operations: Operation[], cardActive: DivisionType): Operation[] => {
    const validOperations = cardActive === 'total'
        ? operations
        : operations.filter((item: Operation) => item.division === cardActive);

    return validOperations;
}
