// src/plugins/DoughnutCenterTextPlugin.js

const DoughnutCenterTextPlugin = {
    id: 'doughnutCenterText',
    afterDraw: (chart) => {
        const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;

        ctx.save();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#000';

        const text = chart.config.options.plugins.doughnutCenterText.centerText;
        const textX = left + width / 2;
        const textY = top + height / 2;

        ctx.fillText(text, textX, textY);
        ctx.restore();
    }
};

export default DoughnutCenterTextPlugin;
