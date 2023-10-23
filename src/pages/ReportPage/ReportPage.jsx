import './ReportPage.scss';
import Card from '../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getOperations, selectOperations } from '../../redux/operationsSlice';
import { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import { isObjectEmpty, normalizeDataChart } from '../../../utils';
import { Loader } from '../../components/Loader';

const ReportPage = () => {
    const [cardActive, setCardActive] = useState('total')
    const [dataChart, setDataChart] = useState({})
    const dispatch = useDispatch();
    const { operations } = useSelector(selectOperations);

    useEffect(() => {
        dispatch(getOperations());
    }, [])

    let totalIncome = 0;
    let b2bIncome = 0;
    let b2cIncome = 0;

    operations?.forEach((operation) => {
        const { type, amount, division } = operation;
        if (type !== 'income') return;
        totalIncome += +amount;
        division === 'B2B' ? (b2bIncome += +amount) : (b2cIncome += +amount);
    })

    useEffect(() => {
        if (!isObjectEmpty(operations)) {
            const validOperations = cardActive === 'total' ? operations
                : operations.filter(item => item.division === cardActive);
            setDataChart(normalizeDataChart(validOperations))
        }

    }, [operations, cardActive])



    return (
        <section className="report">
            <h3 className="title">Сводный отчет</h3>
            {isObjectEmpty(operations) || isObjectEmpty(dataChart) ? <Loader /> : (
                <>
                    <div className="card-list">
                        <div className="card-container">
                            <Card
                                id="total"
                                text="Итого"
                                total={totalIncome}
                                cardActive={cardActive}
                                setCardActive={setCardActive}
                            />
                        </div>
                        <div className="card-container">
                            <Card
                                id="B2B"
                                text="B2B"
                                total={b2bIncome}
                                cardActive={cardActive}
                                setCardActive={setCardActive}
                            />
                        </div>
                        <div className="card-container">
                            <Card
                                id="B2C"
                                text="B2C"
                                total={b2cIncome}
                                cardActive={cardActive}
                                setCardActive={setCardActive}
                            />
                        </div>
                    </div>
                    <Chart types={dataChart} />
                </>
            )}
        </section>
    )
}

export default ReportPage;