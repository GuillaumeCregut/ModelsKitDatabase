const { ChartJSNodeCanvas, ChartCallback } = require('chartjs-node-canvas');
const { ChartConfiguration } = require('chart.js');
const { promises } = require('fs');

const makeColor = (nbDatas) => {
	const colorsArray = [];
	for (let i = 0; i < nbDatas; i++) {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		colorsArray.push(`rgb(${r},${g},${b})`)
	}
	return colorsArray;
	
}
/**
 * 
 * @param {*} width width of the image
 * @param {*} height height of the image
 * @param {*} datasLabel array of labels for values
 * @param {*} datas array of values
 * @param {*} file filename to save picture
 */
const createPie = async (width = 400, height = 400, datasLabel, datas,file) => {
	// const width = 400;
	// const height = 400;
	const bgColors = makeColor(datas.length);
	const configuration = {
		type: 'pie',
		data: {
			labels: datasLabel,
			datasets: [
				{
					label: 'first dataset',
					data: datas,
					backgroundColor: bgColors
				}
			]
		},
		options: {
		},
		plugins: [{
			id: 'background-colour',
			beforeDraw: (chart) => {
				const ctx = chart.ctx;
				ctx.save();
				ctx.fillStyle = 'white';
				ctx.fillRect(0, 0, width, height);
				ctx.restore();
			}
		}]
	};
	const chartCallback = (ChartJS) => {
		ChartJS.defaults.responsive = true;
		ChartJS.defaults.maintainAspectRatio = false;
	};
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });
	const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
	await promises.writeFile(file, buffer, 'base64');
}

module.exports = {
	createPie
}