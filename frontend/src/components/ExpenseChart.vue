<template>
    <div class="expense-chart">

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

        name: "ExpenseChart",

        props: {

            expenses: {

                type: Array,

                required: true

            }

        },

        setup(props) {

            const chartCanvas = ref(null);
            let chartInstance = null;

            const createChart = () => {

                const ctx = chartCanvas.value.getContext('2d');
                
                const profitData = props.expenses
                    .filter(e => e.profitOrSpent)
                    .reduce((sum, e) => sum + parseFloat(e.value), 0);

                const spentData = props.expenses
                    .filter(e => !e.profitOrSpent)
                    .reduce((sum, e) => sum + parseFloat(e.value), 0);

                if (chartInstance) {
                    chartInstance.destroy();
                }

                chartInstance = new Chart(ctx, {

                    type: 'doughnut',

                    data: {

                        labels: ['Profit', 'Spent'],

                        datasets: [{

                            data: [profitData, spentData],
                            backgroundColor: ['#4caf50', '#f44336']

                        }]

                    },

                    options: {

                        responsive: true,

                        plugins: {

                            legend: {
                                position: 'top',
                            },

                            title: {
                                display: true,
                                text: 'Profit vs Spent'
                            }

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
    .expense-chart {
        width: 400px;
        height: 400px;
        background-color: #792f2f;
        border-radius: 16px;
        padding: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .chart-container {
        background-color: #3d3131;
        position: relative;
        width: 100%;
        max-width: 600px;
        margin: auto;
    }
</style>