<template>
    <div class="balance-chart">

        <h2>Spent's/Profit's Resume</h2>

        <div class="chart-container">
            <canvas ref="chartCanvas"></canvas>
        </div>

    </div>
</template>

<script>
    import { ref, onMounted, watch } from 'vue';
    import { Chart, registerables } from 'chart.js';

    Chart.register(...registerables);
    
    export default {

        name: "BalanceChart",

        props: {

            expenses: {

                type: Object,
                required: true

            }

        },

        setup(props) {

            const chartCanvas = ref(null);
            let chartInstance = null;

            const createChart = () => {

                const ctx = chartCanvas.value.getContext('2d');

                if (chartInstance) {chartInstance.destroy();}

                const datalist = props.expenses.combineddata || [];
                const labels = datalist.map((_, index) => `Value ${index + 1}`);
                const data = datalist.map(entry => parseFloat(entry.value));
                const pointColors = datalist.map(entry => entry.value >= 0 ? '#4caf50' : '#f44336');

                chartInstance = new Chart(ctx, {

                    type: 'line',

                    data: {
                        labels,
                        datasets: [{

                            label: 'financial flow',
                            data,
                            backgroundColor: 'rgba(33, 150, 243, 0.2)',
                            tension: 0.1,
                            pointRadius: 5,
                            pointHoverRadius: 7,
                            pointBackgroundColor: pointColors

                        }]

                    },

                    options: {

                        responsive: true,
                        maintainAspectRatio: false,

                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        },

                        plugins: {

                            legend: {
                                position: 'top',
                            },

                        }
                    }

                });
            };

            onMounted(() => {
                createChart();
            });

            watch(() => props.expenses, createChart, { deep: true });

            return {
                chartCanvas
            };
        }
    }
</script>

<style scoped>

    .balance-chart {
        width: 100%;
        color: white;
        height: 100%;

    }

    .chart-container {
        background-color: #3d3131;  
        width: 95%;
        height: 70%;
        border-radius: 8px;
    }

    canvas {
        width: 100%;
        height: 100%;
    }
</style>