import * as d3 from 'd3'

(function () {
var margin = { top: 20, right: 20, bottom: 40, left: 70 }

var width = 600 - margin.left - margin.right
var height = 400 - margin.top - margin.bottom

var svg = d3
  .select('#chart14')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Build your scales here

var colorScale = d3.scaleOrdinal().range(['#8c2d04', '#d94801', '#fcc5c0'])

var heightScale = d3
  .scaleLinear()
  .domain([0, 10])
  .range([0, height])

var xPositionScale = d3.scaleBand().range([0, width])

d3.csv(require('./eating-data.csv'))
  .then(ready)
  .catch(function(err) {
    console.log('Failed with', err)
  })

function ready(datapoints) {
  // Add and style your marks here

  var names = datapoints.map(function(d) {
    return d.name
  })

  xPositionScale.domain(names)

  svg
    .selectAll('rect')
    .data(datapoints)
    .enter()
    .append('rect')
    .attr('height', function(d) {
      return heightScale(d.hamburgers)
    })
    .attr('fill', function(d) {
      return colorScale(d.animal)
    })
    .attr('width', xPositionScale.bandwidth())
    .attr('y', function(d) {
      return height - heightScale(d.hamburgers)
    })
    .attr('x', function(d) {
      return xPositionScale(d.name)
    })

  var yAxis = d3.axisLeft(heightScale)
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