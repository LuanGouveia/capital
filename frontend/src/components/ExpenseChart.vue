<template>
    <div class="balance-chart">

        <h2 class="title">Spent's/Earning's Summary</h2>

        <div class="chart-container">
            <canvas ref="chartCanvas" ></canvas>
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

            let pointColors = []

            const chartCanvas = ref(null);
            let chartInstance = null;

            const createChart = () => {

                const ctx = chartCanvas.value.getContext('2d');

                const datalist = props.expenses.combineddata || [];

                const labels = datalist.map((_, index) => `Value ${index + 1}`);
                
                const data = datalist.map(entry => parseFloat(entry.value));
                let processedData = [];
                let balancedData = 0;
                for (let i = 0; i < data.length; i++) {
                    balancedData = balancedData + data[i];
                    processedData = processedData.concat(balancedData);
                }

                pointColors = []
                for (let i = 0 ; i < processedData.length ; i++){
                    if(processedData[i] >= 0){
                        pointColors.push("#4caf50")
                    }
                    else{
                        pointColors.push("#f44336")
                    }
                }


                chartInstance = new Chart(ctx, {

                    type: 'line',

                    data: {
                        labels,
                        datasets: [{

                            label: 'financial flow',
                            data: processedData,
                            backgroundColor: 'rgba(33, 150, 243, 0.2)',
                            tension: 0.3,
                            pointRadius: 4,
                            pointHoverRadius: 7,
                            pointBackgroundColor: pointColors,

                        }]

                    },

                    options: {

                        responsive: true,
                        maintainAspectRatio: false,
                        animation: {
                            duration: 800,
                            easing: 'linear'
                        },

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

            const updateChart = () => {
                if (!chartInstance) return;

                const datalist = props.expenses.combineddata || [];

                const newLabels = datalist.map((_, index) => `Value ${index + 1}`);

                const newData = datalist.map(entry => parseFloat(entry.value));

                let processedData = [];
                let balancedData = 0;
                for (let i = 0; i < newData.length; i++) {
                    balancedData = balancedData + newData[i];
                    processedData.push(balancedData);
                }

                pointColors = []
                for (let i = 0 ; i < processedData.length ; i++){
                    if(processedData[i] >= 0){
                        pointColors.push("#4caf50")
                    }
                    else{
                        pointColors.push("#f44336")
                    }
                }

                chartInstance.data.labels = newLabels;
                chartInstance.data.datasets[0].data = processedData;
                chartInstance.data.datasets[0].pointBackgroundColor = pointColors

                chartInstance.update();

            };

            onMounted(() => {
                createChart();
            });

            watch(() => props.expenses, updateChart, { deep: true });

            return {
                chartCanvas
            };
        }
    }
</script>

<style scoped>

    .balance-chart {
        width: 100%;
        color: rgb(138, 28, 28);
        height: 70vh;

    }

    .chart-container {
        background-color: #484948;  
        width: 95%;
        height: 100%;
        border-radius: 8px;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    h2 {
        text-align: right;
        margin-bottom: 1rem;
        margin-right: 4rem;
        font-weight: 600;
        font-size: 2rem;
        color:#e6c73b;
        text-shadow: 1px 1px 2px black;
    }
</style>