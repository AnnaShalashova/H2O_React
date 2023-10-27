import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
  LineElement,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './Chart.scss';
import { NormalizeData, priceNoDec } from '../../share/utils';
import { MONTHS } from '../../share/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  types: NormalizeData;
};

const Chart = ({ types }: ChartProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        title: {
          text: 'Hey',
        },
        position: "bottom",
        labels: {
          generateLabels: function (chart: ChartJS<keyof ChartTypeRegistry, (number)[], unknown>) {
            return ChartJS.defaults.plugins.legend.labels
              .generateLabels(chart)
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              .map((label: any) => {
                const dataset = chart.data.datasets[label.datasetIndex];
                let total = 0;
                for (let j = 0; j < dataset.data.length; j++) {
                  total = total + dataset.data[j];
                }
                label.text = dataset.label + ': ' + priceNoDec.to(total) + ' ₽';
                return label;
              });
          },
          boxWidth: 30,
          boxHeight: 30,
          useBorderRadius: true,
          borderRadius: 15,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<'line'> = {
    labels: MONTHS,
    datasets: [
      {
        label: 'Выручка',
        data: types.revenue,
        borderColor: '#73CF7A',
        backgroundColor: '#73CF7A',
        tension: 0.4,
        pointRadius: 5,
        pointBorderColor: '#73CF7A',
        pointBorderWidth: 3,
        pointBackgroundColor: 'white',
      },
      {
        label: 'Затраты',
        data: types.expanses,
        borderColor: '#45AAF2',
        backgroundColor: '#45AAF2',
        tension: 0.4,
        pointRadius: 5,
        pointBorderColor: '#45AAF2',
        pointBorderWidth: 3,
        pointBackgroundColor: 'white',
      },
      {
        label: 'Прибыль',
        data: types.income,
        borderColor: '#AC74FC',
        backgroundColor: '#AC74FC',
        tension: 0.4,
        pointRadius: 5,
        pointBorderColor: '#AC74FC',
        pointBorderWidth: 3,
        pointBackgroundColor: 'white',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3 className="title">Общая статистика</h3>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
