var socket;

var app = angular.module('sensores',['chart.js','timer']);

app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
});

app.controller('temperatura', ['$scope','$interval', function ($scope, $interval) {


    $scope.momento=0;

    $scope.pruebaEnProgreso= false;

    var captura;

    var contador = 0;

    $scope.capturas={
        lista : []
    };

    // timer:

    $scope.timerRunning = true;

    $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };

    $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

    //grafico
    //$scope.labels = ["0", "1", "2", "3", "4", "5", "6"];
    $scope.series = ['Sensor 1', 'Sensor 2'];
    /*$scope.series = ['Sensor 1', 'Sensor 2','Sensor 3','Sensor 4','Sensor 5'];
     $scope.data = [
     [70, 59, 80, 81, 56, 55, 30],
     [28, 48, 40, 19, 86, 27, 90],
     [10, 10, 10, 10, 0, 10, 10],
     [20, 20, 20, 20, 20, 20, 20],
     [30, 30, 30, 30, 30, 30, 30]
     ];*/
    $scope.labels= [];
    $scope.series = ['Sensor 1', 'Sensor 2'];
    $scope.data = [[],[]];

    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [
        {yAxisID: 'y-axis-1'}

    ];
    $scope.options = {
        legend: { display: true },
        scales: {

            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }]
        }
    };

    //funciones para el socket
    $scope.conectar = function () {//start
        $scope.pruebaEnProgreso= true;
        socket = io.connect("http://localhost:8080");
        socket.on('lectura', function (lectura) {
            $scope.$apply(function () {
                datos = JSON.parse(lectura);
                $scope.dato = datos;
            })
        });
        contador = 0
        capturar();
    }

    $scope.desconectar = function () {//stop
        $scope.pruebaEnProgreso= false;
        socket.disconnect();
        $scope.stopTimer();
        $scope.stop();
        vaciar();
    }

    $scope.finalizar = function () {
        socket.disconnect();
        $scope.stopTimer();
        $scope.stop();
    }

    $scope.reiniciar = function () {
        $scope.pruebaEnProgreso= true;
        vaciar();
        contador = 0
        capturar();
    }

    function vaciar() {
        $scope.data = [[],[]];
        $scope.labels= [];
        $scope.capturas = {
            lista: []
        };
    }

    //magia

    $scope.Timer = null;
    var promesa;

    function capturar() {
        $scope.stop();
        $scope.startTimer();
        promesa = $interval(function () {
            var tiempo = $scope.momento;
            var valores = $scope.dato;
            console.log("valores");
            //console.log(tiempo);
            //console.log(valores);
            captura = {
                id: contador,
                tiempo: tiempo,
                s1: valores.s1,
                s2: valores.s2,
            };
            //parte de la tabla
            $scope.capturas.lista.push(captura);
            //parte del grafico
            $scope.labels.push(tiempo);
            $scope.data[0].push(valores.s1);
            $scope.data[1].push(valores.s2);
            console.log($scope.data);
            console.log($scope.series);
            //console.log($scope.capturas);

        }, 5000);
    };
    $scope.$on('timer-tick', function (event, args) {
        $scope.momento = Math.round(args.millis / 1000);
    });

    $scope.stop = function () {
        $interval.cancel(promesa);
    };

    $scope.$on('$destroy', function () {
        $scope.stop();
    });
}]);

app.controller('Formulario', ['$scope', function ($scope) {

    $scope.submitForm = function() {

        // check to make sure the form is completely valid
        if ($scope.userForm.$valid) {
            alert('our form is amazing');
        }

    };
}])