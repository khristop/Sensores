app.controller('temperatura', ['$scope','$interval','$http', '$location', function ($scope, $interval, $http, $location) {

    $scope.momento=0; //captura los datos de un momento en el tiempo
    $scope.pruebaEnProgreso= false; //cuando se le da al boton iniciar

    $scope.estadoPrueba = 1;
    /*
        Estados de la prueba:
            1: sin iniciar o cancelada
            2: en progreso
            3: finalizada
            4: guardada
     */

    var captura;
    var contador = 0;

    $scope.capturas={
        lista : []
    };

    //funcion para obtener los datos de la prueba
    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: $location.absUrl().replace("http://localhost:3000/prueba/","/prueba/obtener/")
        }).success(function (data) {
            $scope.prueba= data.p;
        }).error(function () {
            console.log( "error al obtener los datos");
        })
    }

    //llamada del obtener al entrar
    $scope.obtener();

    // funciones del timer de la aplicacion
    $scope.timerRunning = false;

    $scope.startTimer = function () {
        //inicia el broadcast del contador
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
    };

    $scope.stopTimer = function () {
        //para el broadcast del contador
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

    //graficos
    //grafico de linea de tiempo
    $scope.series = ['Sensor 1', 'Sensor 2','Sensor 3', 'Sensor 4','Sensor 5'];
    $scope.labels= [];
    $scope.data = [[],[],[],[],[]];

    //grafico de perfil de temperatura
    $scope.series1 = ['temperaturas'];
    $scope.labels1= ["sensor 1", "sensor 2", "sensor 3", "sensor 4", "sensor 5"];
    $scope.data1 = [];

    //configuraciones de los graficos
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

    //opciones de las tablas de datos

    $scope.seleccionar = function (dato) {
        //selecciona el registro que se quiere mostrar en el perfil de temperatura
        $scope.series1 = ['temperaturas en: '+dato.tiempo+' segundos'];
        $scope.data1 = [[dato.s1, dato.s2, dato.s3, dato.s4, dato.s5]];
    }


    //funciones para el socket
    $scope.iniciarsocket = function () {
        socket = io.connect("http://localhost:8080");
        socket.on('lectura', function (lectura) {
            $scope.$apply(function () {
                datos = JSON.parse(lectura);
                $scope.dato = datos;
            })
        });
    };

    //funciones de control

    //iniciar la aplicacion
    $scope.conectar = function () {//boton para iniciar la aplicacion
        $scope.pruebaEnProgreso= true;
        $scope.iniciarsocket();
        contador = 0;
        capturar();
        $scope.estadoPrueba= 2;
    };

    //detiene todo y elimina los datos obtenido
    $scope.desconectar = function () {//stop
        $scope.pruebaEnProgreso= false;
        socket.disconnect();
        $scope.stopTimer();// detiene el contador de
        $scope.stop();//detiene el contador de angular
        vaciar();
        $scope.estadoPrueba= 1;
        swal("Prueba cancelada","la prueba ha sido cancelada","info");
    };

    $scope.finalizar = function () {
        socket.disconnect();
        $scope.stopTimer();
        $scope.stop();
        swal("Prueba finalizada con exito","los resultados de la prueba se muestran en pantalla","success");
        $scope.estadoPrueba= 3;
    };

    $scope.reiniciar = function () {
        swal({
                title: "Reiniciar prueba",
                text: "Esta accion eliminara todos los datos actuales",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#1ECB42",
                confirmButtonText: "reiniciar prueba",
                closeOnConfirm: false
            },
            function(isConfirm){
                if (isConfirm){

                    vaciar();
                    $scope.pruebaEnProgreso= true;
                    contador = 0;
                    capturar();

                    swal("Prueba reiniciada","los datos se tomaran de nuevo","info");
                }
            });
        $scope.estadoPrueba= 2;
    };

    $scope.registrarDatos = function () {
        $scope.estadoPrueba= 4;
        console.log($scope.prueba._id);
        $http({
            method: "POST",
            url: "/",
            params: {
                idp: $scope.prueba._id,
                resultado : {
                    tiempo: $scope.labels,
                    aleta1:{
                        s1 : $scope.data[0],
                        s2 : $scope.data[1],
                        s3 : $scope.data[2],
                        s4 : $scope.data[3],
                        s5 : $scope.data[4],
                    },
                    aleta2:{

                    }
                }
            }
        })

    };

    //magia

    $scope.Timer = null;
    var promesa;

    function capturar() {
        $scope.stop();
        $scope.startTimer();
        //loop defined by a time interval
        promesa = $interval(function () {
            var tiempo = $scope.momento;
            //get data from broadcast
            var valores = $scope.dato;
            if(true){// if this test is single
                captura = {
                    id: contador,
                    tiempo: tiempo,
                    //sensores de la aleta 1
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
                //push data into array
                $scope.data[0].push(valores.s1);
                $scope.data[1].push(valores.s2);
                $scope.data[2].push(valores.s3);
                $scope.data[3].push(valores.s4);
                $scope.data[4].push(valores.s5);
                //update time perfil
                $scope.series1 = ['temperaturas en: '+tiempo+' segundos'];
                $scope.data1 = [[valores.s1, valores.s2, valores.s3, valores.s4, valores.s5]];
                //console.log($scope.capturas);

            //if the test is multiple
            }
            if(false){

                captura = {
                    id: contador,
                    tiempo: tiempo,
                    //sensores de la aleta 2
                    s6: valores.s6,
                    s7: valores.s7,
                    s8: valores.s8,
                    s9: valores.s9,
                    s10: valores.s10,
                    //hornos
                    h1: valores.h1,
                    h2: valores.h2
                };

                //parte de la tabla
                $scope.capturas.lista.push(captura);

                //parte del grafico
                $scope.labels.push(tiempo);
                //push data into array
                $scope.data[0].push(valores.s1);
                $scope.data[1].push(valores.s2);
                $scope.data[2].push(valores.s3);
                $scope.data[3].push(valores.s4);
                $scope.data[4].push(valores.s5);
                //update time perfil
                $scope.series1 = ['temperaturas en: '+tiempo+' segundos'];
                $scope.data1 = [[valores.s1, valores.s2, valores.s3, valores.s4, valores.s5]];

            }
            else {//using 2 aletas
                captura = {
                    id: contador,
                    tiempo: tiempo,
                    //sensores de la aleta 1
                    s1: valores.s1,
                    s2: valores.s2,
                    s3: valores.s3,
                    s4: valores.s4,
                    s5: valores.s5,
                    //sensores de la aleta 2
                    s6: valores.s6,
                    s7: valores.s7,
                    s8: valores.s8,
                    s9: valores.s9,
                    s10: valores.s10,
                    //hornos
                    h1: valores.h1,
                    h2: valores.h2
                };
            }
        }, 3000);//set time
    };



    $scope.$on('timer-tick', function (event, args) {
        $scope.momento = Math.round(args.millis / 1000);
    });

    //cuando se llame el destroy se detiene el contador
    $scope.$on('$destroy', function () {
        $scope.stop();
    });

    //detiene el contador de angular
    $scope.stop = function () {
        $interval.cancel(promesa);
    };

    //remueve todos los datos de la aplicacion
    function vaciar() {
        $scope.data = [[],[],[],[],[]];
        $scope.labels= [];
        $scope.capturas = {
            lista: []
        };
    }
}]);
