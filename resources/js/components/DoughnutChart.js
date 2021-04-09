import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function DoughnutChart(props) {
    const data = {
        responsive: true,
        labels: ['Mes 1', 'Mes 2', 'Parte 3'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
            }
        ]
    }
    return (
        <>
            <Doughnut data={data}/>
        </>
    )
}
export default DoughnutChart;