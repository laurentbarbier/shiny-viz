/**
 * Created by Laurent_Barbier on 18/04/2015.
 */
var data = [172, 136, 135, 101, 80, 68, 50, 29, 19, 41];
var cats = ["Statistics", "Design", "Business", "Cartography", "Information Science", "Web Analytics", "Programming", "Engineering", "Mathematics", "Other"];

var w = 350;
var h = 350;
var r = w / 2;

var depthColors = d3.scale.linear().domain([0, 172]).range(["white", "#821122"]);

var vis = d3.select("#figure")
    .append("svg")
    .attr({width: w, height: h})
    .append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

var pie = d3.layout.pie()
    .sort(null)
    .value(function (d) {
        return d;
    });

var arc = d3.svg.arc()
    .outerRadius(r)
    .innerRadius(r - 120);

var g = vis.selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

g.append("path")
    .attr("d", arc)
    .style({
        "fill": function (d) {
            return depthColors(d.data);
        },
        "stroke": "white"
    })
    .append("title").text(function (d) {
        return d.data + " votes";
    });

g.append("text")
    .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ") rotate (" + ((90 * (d.startAngle + d.endAngle) / Math.PI - 90)) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d, i) {
        return cats[i];
    });

vis.append("text")
    .text("May 2009")
    .style({"font": "bold 14px Georgia"});
    