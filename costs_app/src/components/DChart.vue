<template>
  <div style="position: relative; height: 300px; width: 300px">
    <canvas id="d-chart"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  DoughnutController,
  PointElement,
  ArcElement,
  LinearScale,
  Legend,
  Title,
} from "chart.js";

Chart.register(
  DoughnutController,
  ArcElement,
  PointElement,
  LinearScale,
  Legend,
  Title
);

export default {
  name: "DChart",
  props: {
    chData: {},
  },
  watch: {
    chData: {
      handler() {
        if (this.chart) {
          this.chart.destroy();
        }

        var ctx = document.getElementById("d-chart");
        this.chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: Object.keys(this.chData),
            datasets: [
              {
                label: "Dataset 1",
                data: Object.values(this.chData),
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(90, 205, 120)",
                ],
                hoverOffset: 4,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
              title: {
                display: true,
                text: "Costs by categories",
              },
            },
          },
        });
      },
      deep: true,
    },
  },
  data() {
    return {
      chart: undefined,
    };
  },
};
</script>
