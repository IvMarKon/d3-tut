var dataset = _.map(_.range(100), function (i) {
    // return Math.random() * 100;
    return {
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 30
    };
})

var margin = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
};

var mult = 5;
var h = 300 - margin.top - margin.bottom;
var w = 400 - margin.left - margin.right;

var svg = d3.select('.container').append('svg')
    .attr('width', w + margin.left + margin.right)
    .attr('height', h + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

// var xScale = d3.scale.ordinal()
//     .domain(dataset)
//     .rangeBands([0, w], 0.1, 0.3);

var xScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, w]);

// var yScale = d3.scale.linear()
//     .domain([0, d3.max(dataset) * 1.1])
//     .range([0, h]);

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataset, function (d) {
        return d.y;
    })])
    .range([h, 0]);

var colorScale = d3.scale.quantize()
    .domain([0, 100])
    .range(['green', 'orange']);

svg.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('class', 'bubble')
    .attr('cx', function (d) {
        return xScale(d.x);
    })
    .attr('cy', function (d) {
        return yScale(d.y);
    })
    .attr('r', function (d) {
        return d.r;
    })
    .attr('z-index', 1)
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .on('mouseover', function (d) {
        d3.select(this).style('fill', function (d, i) {
            return colorScale(i);
        })
    })
    // .on('mouseover', function (d) {
    //     d3.select(this).classed('active',true);
    // })
    .on('mouseout', function (d) {
        d3.select(this).style('fill', function (d, i) {
            return colorScale(100);
        })
    })
    .on('mousedown', function (d) {
        d3.select(this).style('r', d.r*2);
        d3.select(this).style('z-index',2);
    })
    .on('mouseup', function (d) {
        d3.select(this).style('r', d.r);
        d3.select(this).style('z-index',1);
    })
// .attr('fill', function (d, i) {
//     return colorScale(i);
// })


// svg.selectAll('rect')
//     .data(dataset)
//     .enter()
//     .append('rect')
//     .attr('class', 'bar')
//     .attr('x', function (d, i) {
//         return xScale(d);
//     })
//     .attr('y', function (d) {
//         return h - yScale(d);
//     })
//     .attr('width', xScale.rangeBand())
//     .attr('height', function (d) {
//         return yScale(d);
//     })
//     .attr('fill', function (d, i) {
//         return colorScale(i);
//     });