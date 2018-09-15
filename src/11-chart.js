import * as d3 from 'd3'

(function () {
// Build your SVG here
// using all of that cut-and-paste magic
var margin = { top: 50, right: 50, bottom: 50, left: 50 }

var width = 400 - margin.left - margin.right

var height = 400 - margin.top - margin.bottom

var svg = d3
  .select('#chart11')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here
var yPositionScale = d3
  .scalePoint()
  .domain(['cat', 'cow', 'dog'])
  .range([height, 10])
  .padding(0.25)

var xPositionScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([10, width])

var colorScale = d3.scaleOrdinal().range(['#FFD1C7'])

d3.csv(require('./eating-data.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

// Add and style your marks here
function ready(datapoints) {
  console.log('Data is', datapoints)

  svg
    .selectAll('circle')
    .data(datapoints)
    .enter()
    .append('circle')
    .attr('r', 5)
    .attr('cx', d => {
      return xPositionScale(d.hamburgers)
    })
    .attr('cy', d => {
      return yPositionScale(d.animal)
    })
    .attr('fill', colorScale())

  var yAxis = d3.axisLeft(yPositionScale).ticks(20)

  svg
    .append('g')
    .attr('class', 'axis y-axis')
    .call(yAxis)
  var xAxis = d3.axisBottom(xPositionScale)
  svg
    .append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
}
})()
