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
    $scope.series = ['Sensor 1', 'Sensor 2','Sensor 3', 'Sensor 4','Sensor 5'];

    $scope.series1 = ['temperaturas'];

    $scope.labels= [];
    $scope.labels1= ["sensor 1", "sensor 2", "sensor 3", "sensor 4", "sensor 5"];

    $scope.data = [[],[],[],[],[]];
    $scope.data1 = [];

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
    
    $scope.seleccionar = function (dato) {
        $scope.series1 = ['temperaturas en: '+dato.tiempo+' segundos'];
        $scope.data1 = [[dato.s1, dato.s2, dato.s3, dato.s4, dato.s5]];
    }
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
        $scope.data = [[],[],[],[],[]];
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
                s3: valores.s3,
                s4: valores.s4,
                s5: valores.s5
            };
            //parte de la tabla
            $scope.capturas.lista.push(captura);
            //parte del grafico
            $scope.labels.push(tiempo);
            $scope.data[0].push(valores.s1);
            $scope.data[1].push(valores.s2);
            $scope.data[2].push(valores.s3);
            $scope.data[3].push(valores.s4);
            $scope.data[4].push(valores.s5);
            $scope.series1 = ['temperaturas en: '+tiempo+' segundos'];
            $scope.data1 = [[valores.s1, valores.s2, valores.s3, valores.s4, valores.s5]];
            console.log($scope.data);
            console.log($scope.series);
            //console.log($scope.capturas);

        }, 3000);
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

app.controller('Formulario', function ($scope, $http, $window) {

    $scope.guardarPrueba = function () {
        $http({
            method: 'POST',
            url:'/prueba/crear',
            params:{
                titulo: $scope.prueba.titulo,
                descripcion: $scope.prueba.descripcion,
                carnet: $scope.prueba.carnet,
                fecha: Date.now()
            }
        }).success(function (data) {
            if(data.status=="ok"){

                swal({
                    title: "Creada con exito",
                    text: "La prueba iniciara en breve",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#1ECB42",
                    confirmButtonText: "Ir a la prueba",
                    closeOnConfirm: false
                    },
                    function(isConfirm){
                        $window.location.href = '/prueba/'+data.id;
                });
                console.log(data.id)
            }else{
                sweetAlert("error", "Error al crear la cuenta", "error");
            }
        }).error(function () {
            alert('ERROR AL INTENTAR GUARDAR EL CUENTA');
        })
    }
});