import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MONTHS } from '../../../utils/constants';
import './Chart.scss';
import { priceNoDec } from '../../../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = ({ types }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                title: {
                    text: "Hey",
                },
                position: 'bottom',
                labels: {
                    generateLabels: function (chart) {
                        return ChartJS.defaults.plugins.legend.labels
                            .generateLabels(chart).map((label) => {
                                let dataset = chart.data.datasets[label.datasetIndex];
                                console.log('ChartJS.defaults.plugins', ChartJS.defaults);
                                let total = 0;
                                for (let j = 0; j < dataset.data.length; j++) {
                                    total += dataset.data[j];
                                }
                                label.text = dataset.label + ': ' + priceNoDec.to(total) + ' ₽';
                                return label;
                            });
                    },
                    boxWidth: 30,
                    boxHeight: 30,
                    useBorderRadius: true,
                    borderRadius: 15,

                    // text: '!'
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: false
                }
            }

        }
    };

    const data = {
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
}

export default Chart;
