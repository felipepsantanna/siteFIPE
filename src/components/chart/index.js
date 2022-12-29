import React, { useState, useEffect } from 'react';
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


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function HistoryChart({ chartData }) {

    const [options, setOptions] = useState({
        responsive: true,
    });

    return (
        <div>
            <section className="section-chart">
                <article className="article-chart">
                    <div className='div-chart-h2'>
                        <h2>Histórico de preços Fipe</h2>
                    </div>
                    <div className='div-chart'>
                        <Line options={options} data={chartData} />


                    </div>
                </article>
            </section>
        </div>
    );
}