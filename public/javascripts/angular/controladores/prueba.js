app.controller('temperatura', ['$scope','$interval','$http', '$location', function ($scope, $interval, $http, $location) {

    $scope.momento=0; //captura los datos de un momento en el tiempo
    $scope.pruebaEnProgreso= false; //cuando se le da al boton iniciar
    $scope.sentencia = true;
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
        lista : [],
        lista2: []
    };

    $scope.cambiar = function () {
        $scope.sentencia = !$scope.sentencia;
    };

    //funcion para obtener los datos de la prueba
    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: $location.absUrl().replace("http://localhost:3000/prueba/","/prueba/obtener/")
        }).success(function (data) {
            $scope.prueba= data.p;
            var sensor=0;
            var valu={s1: [], s2: [], s3: [], s4: [], s5: [], s6: [], s7:[], s8:[], s9:[], s10:[]};
            var tiempoi=[];
            if($scope.prueba.realizada){
                if($scope.prueba.aletaSimple.estado) {
                    for (i = 0; i < $scope.prueba.resultados.aleta1.length; i++) {
                        obj = $scope.prueba.resultados.aleta1[i];
                        obj2 = $scope.prueba.resultados.aleta2[i];

                        if ($.inArray(obj.tiempo, tiempoi) < 0) {
                            tiempoi.push(obj.tiempo);
                        }
                        switch (parseInt(obj.sensor)) {
                            case 0:
                                if($scope.prueba.aletaSimple.estado)
                                    valu.s1.push(obj.valor);
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s6.push(obj2.valor);
                                break;
                            case 1:
                                if($scope.prueba.aletaSimple.estado)
                                    valu.s2.push(obj.valor);
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s7.push(obj2.valor);
                                break;
                            case 2:
                                if($scope.prueba.aletaSimple.estado)
                                    valu.s3.push(obj.valor);
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s8.push(obj2.valor);
                                break;
                            case 3:
                                if($scope.prueba.aletaSimple.estado)
                                    valu.s4.push(obj.valor);
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s9.push(obj2.valor);
                                break;
                            case 4:
                                if($scope.prueba.aletaSimple.estado)
                                    valu.s5.push(obj.valor);
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s10.push(obj2.valor);
                                break;
                        }
                    }
                }else {
                    for (i = 0; i < $scope.prueba.resultados.aleta2.length; i++) {
                        obj2 = $scope.prueba.resultados.aleta2[i];

                        if ($.inArray(obj2.tiempo, tiempoi) < 0) {
                            tiempoi.push(obj2.tiempo);
                        }
                        switch (parseInt(obj2.sensor)) {
                            case 0:
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s6.push(obj2.valor);
                                break;
                            case 1:
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s7.push(obj2.valor);
                                break;
                            case 2:
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s8.push(obj2.valor);
                                break;
                            case 3:
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s9.push(obj2.valor);
                                break;
                            case 4:
                                if($scope.prueba.aletaConjunto.estado)
                                    valu.s10.push(obj2.valor);
                                break;
                        }
                    }
                }
                var as;
                for(j = 0; j < tiempoi.length; j++){
                    if($scope.prueba.conjunto){
                        as = {
                            s1: valu.s1[j],
                            s2: valu.s2[j],
                            s3: valu.s3[j],
                            s4: valu.s4[j],
                            s5: valu.s5[j],
                            s6: valu.s6[j],
                            s7: valu.s7[j],
                            s8: valu.s8[j],
                            s9: valu.s9[j],
                            s10: valu.s10[j],
                            tiempo: tiempoi[j]
                        }
                        $scope.capturas.lista.push(as);
                        $scope.data= [valu.s1,valu.s2,valu.s3,valu.s4,valu.s5];
                        $scope.labels = tiempoi;

                        $scope.dataConjunto = [valu.s6,valu.s7,valu.s8,valu.s9,valu.s10];
                        $scope.labelsConjunto = tiempoi;
                        $scope.seriePerfilConjunto = ['seleccione un registro'];
                        $scope.dataPerfilConjunto=[[valu.s6,valu.s7,valu.s8,valu.s9,valu.s10]];

                        $scope.series1 = ['seleccione un registro'];
                        $scope.data1 = [[valu.s1, valu.s2, valu.s3, valu.s4, valu.s5]];
                    }else {
                        if($scope.prueba.aletaSimple.estado){
                            as = {
                                s1: valu.s1[j],
                                s2: valu.s2[j],
                                s3: valu.s3[j],
                                s4: valu.s4[j],
                                s5: valu.s5[j],
                                tiempo: tiempoi[j]
                            };
                            $scope.capturas.lista.push(as);
                            $scope.data= [valu.s1,valu.s2,valu.s3,valu.s4,valu.s5];
                            $scope.labels = tiempoi;
                            $scope.series1 = ['seleccione un registro'];
                            $scope.data1 = [[valu.s1, valu.s2, valu.s3, valu.s4, valu.s5]];
                        }else {
                            as = {
                                s6: valu.s6[j],
                                s7: valu.s7[j],
                                s8: valu.s8[j],
                                s9: valu.s9[j],
                                s10: valu.s10[j],
                                tiempo: tiempoi[j]
                            }
                            $scope.capturas.lista.push(as);

                            $scope.dataConjunto = [valu.s6,valu.s7,valu.s8,valu.s9,valu.s10];
                            $scope.labelsConjunto = tiempoi;
                            $scope.seriePerfilConjunto = ['seleccione un registro'];
                            $scope.dataPerfilConjunto=[[valu.s6,valu.s7,valu.s8,valu.s9,valu.s10]];
                        }
                    }
                }

            }
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

    //datos de la aleta simple
    $scope.labels= [];
    $scope.data = [[],[],[],[],[]];

    //grafico de perfil de temperatura
    $scope.series1 = [];
    $scope.labels1= $scope.series;
    $scope.data1 = [];

    //datos de la aleta conjunto
    $scope.labelsConjunto= [];
    $scope.dataConjunto = [[],[],[],[],[]];

    //grafico de perfil de temperatura
    $scope.seriePerfilConjunto = [];
    $scope.labelsPerfilConjunto= $scope.series;
    $scope.dataPerfilConjunto = [];

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

    $scope.seleccionar = function (aleta,dato) {
        //selecciona el registro que se quiere mostrar en el perfil de temperatura
        if (aleta == 1){
            $scope.series1 = ['temperaturas en: '+dato.tiempo+' segundos'];
            $scope.data1 = [[dato.s1, dato.s2, dato.s3, dato.s4, dato.s5]];
        }
        if (aleta == 2){
            $scope.seriePerfilConjunto = ['temperaturas en: '+dato.tiempo+' segundos'];
            $scope.dataPerfilConjunto = [[dato.s6, dato.s7, dato.s8, dato.s9, dato.s10]];
        }

    };


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
        console.log($scope.capturas);
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
        var datos = {
            aleta1:[],
            aleta2:[]
        };
        var indi = 0;
        if($scope.prueba.aletaSimple.estado){
            for( i= 0; i < $scope.series.length; i++){
                for( j=0; j<$scope.labels.length; j++) {
                    datos.aleta1.push(
                        {
                            sensor:indi,
                            valor: $scope.data[i][j],
                            tiempo: $scope.labels[j]
                        }
                    )
                }
                indi++;
            }
            indi = 0;
        }

        if($scope.prueba.aletaConjunto.estado){
            for( i= 0; i < $scope.series.length; i++){
                for( j=0; j<$scope.labelsConjunto.length; j++) {
                    datos.aleta2.push(
                        {
                            sensor:indi,
                            valor: $scope.dataConjunto[i][j],
                            tiempo: $scope.labelsConjunto[j]
                        }
                    )
                }
                indi++;
            }
        }

        console.log(datos);

        $http({
            method: "POST",
            url: "/prueba/"+$scope.prueba._id,
            params: {
                resultados : datos
            }
        }).success( function (data) {
            if(data.status == 'ok'){
                alert('todo bien');
            }else {
                alert('el server tiene problemas');
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

            captura = {
                id: contador,
                tiempo: tiempo,
                //sensores
                s1: valores.s1,
                s2: valores.s2,
                s3: valores.s3,
                s4: valores.s4,
                s5: valores.s5,
                s6: valores.s6,
                s7: valores.s7,
                s8: valores.s8,
                s9: valores.s9,
                s10: valores.s10
                //hornos
            };

            //añadir los datos de la captura a la lista
            $scope.capturas.lista.push(captura);
            //momento de la captura

            //push data into array
            if($scope.prueba.aletaSimple.estado){
                $scope.labels.push(tiempo);

                $scope.data[0].push(valores.s1);
                $scope.data[1].push(valores.s2);
                $scope.data[2].push(valores.s3);
                $scope.data[3].push(valores.s4);
                $scope.data[4].push(valores.s5);

                $scope.series1 = ['temperatura del segundo '+tiempo];
                $scope.data1 = [[valores.s1, valores.s2, valores.s3, valores.s4, valores.s5]];
            }

            if($scope.prueba.aletaConjunto.estado){
                $scope.labelsConjunto.push(tiempo);

                $scope.dataConjunto[0].push(valores.s6);
                $scope.dataConjunto[1].push(valores.s7);
                $scope.dataConjunto[2].push(valores.s8);
                $scope.dataConjunto[3].push(valores.s9);
                $scope.dataConjunto[4].push(valores.s10);

                $scope.seriePerfilConjunto = ['temperatura del segundo '+tiempo];
                $scope.dataPerfilConjunto = [[valores.s6, valores.s7, valores.s8, valores.s9, valores.s10]];
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
        $scope.dataConjunto = [[],[],[],[],[]];
        $scope.labelsConjunto= [];
        $scope.capturas = {
            lista: []
        };
    }
}]);
