var layers = [
    {
        "name": "approve",
        "values": [
            {"x": 0, "y": 52},
            {"x": 1, "y": 49},
            {"x": 2, "y": 48},
            {"x": 3, "y": 47},
            {"x": 4, "y": 44},
            {"x": 5, "y": 43},
            {"x": 6, "y": 41},
            {"x": 7, "y": 41},
            {"x": 8, "y": 40},
            {"x": 9, "y": 38},
            {"x": 10, "y": 36},
            {"x": 11, "y": 31},
            {"x": 12, "y": 29}
        ]
    },
    {
        "name": "disapprove",
        "values": [
            {"x": 0, "y": 38},
            {"x": 1, "y": 40},
            {"x": 2, "y": 45},
            {"x": 3, "y": 42},
            {"x": 4, "y": 48},
            {"x": 5, "y": 51},
            {"x": 6, "y": 53},
            {"x": 7, "y": 54},
            {"x": 8, "y": 57},
            {"x": 9, "y": 59},
            {"x": 10, "y": 57},
            {"x": 11, "y": 64},
            {"x": 12, "y": 62}
        ]
    },
    {
        "name": "no opinion",
        "values": [
            {"x": 0, "y": 10},
            {"x": 1, "y": 11},
            {"x": 2, "y": 7},
            {"x": 3, "y": 11},
            {"x": 4, "y": 8},
            {"x": 5, "y": 6},
            {"x": 6, "y": 6},
            {"x": 7, "y": 5},
            {"x": 8, "y": 3},
            {"x": 9, "y": 3},
            {"x": 10, "y": 7},
            {"x": 11, "y": 5},
            {"x": 12, "y": 9}
        ]
    }
];


var cat = ["Race Relations", "Education", "Terrorism", "Energy Policy", "Foreign Affairs", "Environment",
    "Situation in Iraq", "Taxes", "Healthcare Policy", "Economy", "Situation in Afghanistan", "Federal Budget Deficit",
    "Immigration"];

var w = 400;
var h = 250;
var x = d3.scale.ordinal().domain(cat).rangeBands([0, w], 0.2);
var y = d3.scale.linear().domain([0, 100]).range([0, h]);
var fill = ["#809EAD", "#B1C0C9", "#D7D6CB"];

var vis = d3.select("#figure")
    .append("svg")
    .attr({width: w + 100, height: h + 150})
    .append("g")
    .attr("transform", "translate(100,20)");

var bar = d3.layout.stack().values(function (d) {
    return d.values;
});

var g = vis.selectAll("g").data(bar(layers)).enter().append("g").style("fill", function (d, i) {
    return fill[i]
});

var rect = g.selectAll("rect").data(function (d) {
    return d.values;
}).enter().append("rect");

rect.attr({
    y: function (d) {
        return y(100 - d.y0 - d.y);
    },
    height: function (d) {
        return y(d.y);
    },
    x: function (d, i) {
        return x(cat[i])
    },
    width: x.rangeBand()
});

rect.on("mouseover", function () {
    d3.select(this).style("fill", "#555");
});

rect.on("mouseout", function () {
    d3.select(this).style("fill", null);
});

rect.append("title").text(function (d) {
    return d.y + "%";
});

g.selectAll("text")
    .data(function (d) {
        return d.values;
    })
    .enter()
    .append("text")
    .text(function (d) {
        if (d.y > 11) return +d.y;
    })
    .attr({
        x: function (d, i) {
            return x(cat[i]) + x.rangeBand() / 2;
        },
        y: function (d) {
            console.log(d);
            return y(d.y0) + y(d.y / 2);
        }
    })
    .style({
        "fill": "white",
        "text-anchor": "middle"
    });
//.text(function (d) { return d[0]; });

vis.selectAll(".labelx")
    .data(cat)
    .enter()
    .append("g")
    .classed("labelx", 1)
    .attr("transform", function (d) {
        return "translate(" + x(d) + "," + h + ")";
    })
    .append("text")
    .text(String).attr({x: 0, y: 10, "text-anchor": "end", "transform": "rotate(-45)"});

var ticks = vis.selectAll(".ticks").data(y.ticks(10)).enter()
    .append("g").classed("ticks", 1);

ticks.attr("transform", function (d) {
    return "translate(0," + y(100 - d) + ")"
});
ticks.append("path").attr("d", "M0,0h-20").style({
    "stroke": "black", "opacity": function (d) {
        return d ? 0.3 : 1;
    }
});
ticks.append("text").text(function (d) {
    return (d == 100) ? "100%" : d;
}).attr({x: -10, y: -1, "text-anchor": "middle"});