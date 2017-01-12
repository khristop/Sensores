var socket;

var app = angular.module('sensores',['chart.js','timer']);

app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colors: ['#090C47', '#0EDC0B', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
});
