var oChart;

function drawChart() {

// preparation of the data
    var oRate = ["rate"];
    var oCount = ["count"];
    var oAverage = ["average"];
    var oPossession = ["possession"];
    var oTeam = ["team"];
    var oAverageCount = ["averageCount"];
    var oDataset = [
        ["min", 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]
    ];
    
    function getData() {
        oKpiData.data.forEach(function(elem) {
            if (elem.type === true) {
                oRate.push(elem.rate);
                oCount.push(elem.count);
            } else {
                oRate.push(null);
                oCount.push(null);
            }
        });

        oAverageData.data.forEach(function(elem) {
            oAverage.push(elem.rate);
            oAverageCount.push(elem.count);
        });

        oPossessionData.data.forEach(function(elem) {
            oPossession.push(elem.poss);
        });

        oTeamData.data.forEach(function(elem) {
            oTeam.push(elem.rate);
        });
    }

    function setData() {
        oDataset.push(oRate, oCount, oAverage, oAverage, oAverageCount, oPossession, oTeam);
    }

    getData();
    setData();

// generate the chart

    oChart = c3.generate({
        size: {
            height: (($(window).height() - 48) * 0.7 * 0.8) * 0.9
        },
        bindto: "#chartBox",
        zoom: {
        enabled: true
    },
        data: {
            x: "min",
            columns: oDataset,
            axes: {
                count: "y2",
                averageCount: "y2"
            },
            types: {
                count: "bar",
                averageCount: "bar",
                average: "spline",
                rate: "area-spline",
                team: "spline",
                possession: "spline"
            },
            colors: {
                rate: "#2ebf68",
                count: "#e74c3c",
                average: "#006DA9",
                averageCount: "#fc8721",
                possession: "#ffd800",
                team: "#929599"
            }
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true,
                lines: [{
                    value: 50
                }]
            },
            y2: {
                show: true
            }
        },
        axis: {
            x: {
                label: {
                    text: "Minutes",
                    position: "outer-center"
                },
                min: 5,
                max: 90,
                tick: {
                    culling: false
                }
            },
            y: {
                label: {
                    text: "Rate / Possession / Team",
                    position: "outer-middle"
                },
                min: 0,
                max: 100,
                padding: {
                    top: 0,
                    bottom: 0
                },
                tick: {
                    format: function (d) { return d + "%"; }
                }
            },
            y2: {
                label: {
                    text: "Number of",
                    position: "outer-middle"
                },
                show: true,
                tick: {
                    values: [0,2,4,6,8,10,12,14,16,18,20]
                },
                max: 18.15
        
            }
        },
        legend: {
            hide: true
        },
        tooltip: {
            format: {
                title: function (d) { return d + "  min"; }
            }
        }
    });
    
// hide or shown the data
    if (sap.ui.getCore().byId("rbMatch").getSelected()) {
        oChart.show("rate");
    } else {
        oChart.hide("rate");
    }
    if (sap.ui.getCore().byId("rbCount").getSelected()) {
        oChart.show("count");
    } else {
        oChart.hide("count");
    }
    if (sap.ui.getCore().byId("rbAverageCount").getSelected()) {
        oChart.show("averageCount");
    } else {
        oChart.hide("averageCount");
    }
    if (sap.ui.getCore().byId("rbTeam").getSelected()) {
        oChart.show("team");
    } else {
        oChart.hide("team");
    }
    if (sap.ui.getCore().byId("rbPossession").getSelected()) {
        oChart.show("possession");
    } else {
        oChart.hide("possession");
    }
    if (sap.ui.getCore().byId("rbAverage").getSelected()) {
        oChart.show("average");
    } else {
        oChart.hide("average");
    }
}

// resize the chart
$(window).resize(function() {
    drawChart();
});