import './ReportPage.scss';
import Card from '../../components/Card';
import { DivisionType, getOperations } from '../../redux/operationsSlice';
import { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { NormalizeData, OperationsIncomes, getOperationsIncomes, isEmpty, normalizeDataChart, validateOperations } from '../../share/utils';


const ReportPage = () => {
  const [cardActive, setCardActive] = useState<DivisionType>(DivisionType.TOTAL);
  const [dataChart, setDataChart] = useState<NormalizeData>({} as NormalizeData);
  const [incomes, setIncomes] = useState<OperationsIncomes>({} as OperationsIncomes);
  const dispatch = useAppDispatch();
  const { operations } = useAppSelector((state) => state.operations);

  useEffect(() => {
    if (!isEmpty(operations)) {
      const { totalIncome, b2bIncome, b2cIncome } = getOperationsIncomes(operations);
      setIncomes({ totalIncome, b2bIncome, b2cIncome })
      const validOperations = validateOperations(operations, cardActive);
      setDataChart(normalizeDataChart(validOperations));
    } else {
      dispatch(getOperations());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operations, cardActive]);

  return (
    <section className="report">
      <h3 className="title">Сводный отчет</h3>
      {isEmpty(operations) || isEmpty(dataChart) ? (
        <Loader />
      ) : (
        <>
          <div className="card-list">
            <div className="card-container">
              <Card
                id={DivisionType.TOTAL}
                text="Итого"
                total={incomes.totalIncome}
                cardActive={cardActive}
                setCardActive={setCardActive}
              />
            </div>
            <div className="card-container">
              <Card
                id={DivisionType.B2B}
                text="B2B"
                total={incomes.b2bIncome}
                cardActive={cardActive}
                setCardActive={setCardActive}
              />
            </div>
            <div className="card-container">
              <Card
                id={DivisionType.B2C}
                text="B2C"
                total={incomes.b2cIncome}
                cardActive={cardActive}
                setCardActive={setCardActive}
              />
            </div>
          </div>
          <Chart types={dataChart} />
        </>
      )}
    </section>
  );
};

export default ReportPage;
