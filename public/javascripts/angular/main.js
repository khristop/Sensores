var socket;

var app = angular.module('sensores',['chart.js','timer']);

app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
});

app.controller('temperatura', ['$scope','$interval','$http', '$location', function ($scope, $interval, $http, $location) {

    $scope.momento=0;
    $scope.pruebaEnProgreso= false;

    var captura;
    var contador = 0;

    $scope.capturas={
        lista : []
    };

    // timer:

    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: $location.absUrl().replace("http://localhost:3000/prueba/","/prueba/obtener/")
        }).success(function (data) {

                $scope.prueba= data.p;
                //console.log(data);
                console.log($location.absUrl());
        }).error(function () {
            console.log( $location.absUrl().replace("http://localhost:3000/prueba/","/admin/obtener/"));
        })
    }

    $scope.obtener();


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

    $scope.materiales = {};
    $scope.formas = {};

    $scope.conjunto = false;

    $scope.aleta2 = function () {
        $scope.conjunto = !$scope.conjunto;
        if(!$scope.conjunto){
            delete $scope.prueba.material2;
            delete $scope.prueba.aleta2;
        }
    }

    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: '/admin/catalogo'
        }).success(function (data) {
            if(typeof(data)=='object'){
                $scope.materiales = data.materiales;
                $scope.formas = data.formas;
            }
        })
    }

    $scope.guardarPrueba = function () {
        if($scope.conjunto) {
            var peticion = $http({
                method: 'POST',
                url:'/prueba/crear',
                params:{
                    conjunto: $scope.conjunto,
                    titulo: $scope.prueba.titulo,
                    descripcion: $scope.prueba.descripcion,
                    carnet: $scope.prueba.carnet,
                    fecha: Date.now(),
                    material1: $scope.prueba.material1,
                    material2: $scope.prueba.material2,
                    aleta1: $scope.prueba.aleta1,
                    aleta2: $scope.prueba.aleta2
                }
            });
        }else{
            var peticion = $http({
                method: 'POST',
                url:'/prueba/crear',
                params:{
                    conjunto: $scope.conjunto,
                    titulo: $scope.prueba.titulo,
                    descripcion: $scope.prueba.descripcion,
                    carnet: $scope.prueba.carnet,
                    fecha: Date.now(),
                    material1: $scope.prueba.material1,
                    aleta1: $scope.prueba.aleta1
                }
            });
        }

        peticion.success(function (data) {
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

app.controller('Admininstracion', function ($scope, $http, $window) {
    
    $scope.init = function () {
        $scope.obtener();
        $scope.getTiempo();
    }



    $scope.idupdatematerial= 0;
    $scope.idupdatealeta= 0;

    $scope.materiales = {};
    
    $scope.formas = {};

    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: '/admin/catalogo'
        }).success(function (data) {
            if(typeof(data)=='object'){
                $scope.materiales = data.materiales;
                $scope.formas = data.formas;
            }
        })
    }

    //material

    $scope.guardarMaterial = function () {

        $http({
            method: 'POST',
            url: '/admin/material/nuevo',
            params: {
                nombre: $scope.nombre,
                descripcion: $scope.descripcion
            }
        }).success(function (data) {
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "El material ha sido guardada", "success");
                $scope.obtener();
            }else{
                sweetAlert("error", "Error al crear el material", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR GUARDAR EL MATERIAL');
        });
    }

    $scope.recuperarMaterial = function (idm) {
        $http({
            method: 'GET',
            url: '/admin/material/'+idm
        }).success(function(data){
            console.log(data);
            if(data.status == 'ok'){
                $scope.mnombre = data.material.nombre;
                $scope.mdescripcion = data.material.descripcion;
                $scope.idupdatematerial = data.material._id;
            }else{
                alert('ERROR AL INTENTAR MATERIAL');
            }
        }).error(function(){
            alert('ERROR AL INTENTAR RECUPERAR MATERIAL');
        });

    }
    
    $scope.actualizarMaterial = function () {
        console.log($scope.idupdatematerial);
        $http({
            method: 'POST',
            url: '/admin/material/actualizar',

            params: {
                idmaterial: $scope.idupdatematerial,
                nombre: $scope.mnombre,
                descripcion: $scope.mdescripcion
            }
        }).success(function(data){
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "El material ha sido modificada", "success");
                $scope.obtener();
                $('.modal').modal('hide');
            }else{
                sweetAlert("error", "Error al modificar el material", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR GUARDAR EL MATERIAL');
        });

    }

    $scope.eliminarMaterial = function (idm) {
        $http({
            method: 'DELETE',
            url: '/admin/material/'+idm,
        }).success(function(data){
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "El material ha sido eliminado", "success");
                $scope.obtener();
            }else{
                sweetAlert("error", "Error al eliminar el material", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR ELIMINARS EL MATERIAL');
        });
    }

    //aletas

    $scope.guardarAleta = function () {

        $http({
            method: 'POST',
            url: '/admin/aleta/nuevo',
            params: {
                forma: $scope.nforma,
                descripcion: $scope.ndesaleta
            }
        }).success(function (data) {
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "La aleta ha sido registrada", "success");
                $scope.obtener();
                $('.modal').modal('hide');
            }else{
                sweetAlert("error", "Error al crear la aleta", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR GUARDAR LA ALETA');
        });
    }

    $scope.actualizarAleta = function () {
        $http({
            method: 'POST',
            url: '/admin/aleta/actualizar',

            params: {
                ida: $scope.idupdatealeta,
                forma: $scope.mforma,
                descripcion : $scope.mdesaleta
            }
        }).success(function(data){
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "La aleta ha sido modificada", "success");
                $scope.obtener();
                $('.modal').modal('hide');
            }else{
                sweetAlert("error", "Error al modificar la aleta", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR GUARDAR LA ALETA');
        });

    }

    $scope.recuperarAleta = function (ida) {
        $http({
            method: 'GET',
            url: '/admin/aleta/'+ida
        }).success(function(data){
            console.log(data);
            if(data.status == 'ok'){
                $scope.mforma = data.aleta.forma;
                $scope.mdesaleta= data.aleta.descripcion;
                $scope.idupdatealeta = data.aleta._id;
            }else{
                alert('ERROR AL INTENTAR ALETA');
            }
        }).error(function(){
            alert('ERROR AL INTENTAR RECUPERAR ALETA');
        });


    }

    $scope.eliminarAleta = function (ida) {
        $http({
            method: 'DELETE',
            url: '/admin/aleta/'+ida,
        }).success(function(data){
            if(data.status == 'ok'){
                sweetAlert("Buen trabajo!", "La aleta ha sido eliminado", "success");
                $scope.obtener();
            }else{
                sweetAlert("error", "Error al eliminar la aleta", "error");
            }
        }).error(function(){
            alert('ERROR AL INTENTAR ELIMINAR LA ALETA');
        });
    }

    //tiempo

    $scope.getTiempo= function() {
        $http({
            method: 'GET',
            url: "/admin/tiempo"
        }).success(function (data) {
            if(data.status == "ok"){
                $scope.slider = data.t.tiempo;
            }
        }).error(function () {
                $scope.slider = "aun sin definir"
            }
        )
    }

    $scope.registrarTiempo= function () {
        $http({
            method: 'POST',
            url: '/admin/tiempo',
            params: {
                tiempo: $scope.slider
            }
        }).success(function (data) {
            if(data.status == "ok"){
                sweetAlert("Buen trabajo!", "El tiempo ha sido modificado", "success");
            }else{
                console.log("no retorno el server");
            }
        }).error(function () {
            alert('ERROR AL INTENTAR REGISTRAR EL TIEMPO');
        })
    }
});