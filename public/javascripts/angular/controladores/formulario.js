
app.controller('Formulario', function ($scope, $http, $window) {

    $scope.materiales = {};
    $scope.formas = {};

    $scope.aletaSimple= false;
    $scope.aletaConjunto= false;
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
        if($scope.aletaSimple == $scope.aletaConjunto ){
            $scope.conjunto = true;
        }

        var datos = {
            conjunto: $scope.conjunto,
            titulo: $scope.prueba.titulo,
            descripcion: $scope.prueba.descripcion,
            carnet: $scope.prueba.carnet,
            fecha: Date.now(),
            aletaSimple:{
                estado: $scope.aletaSimple,
                material: 0,
                tipo: 0
            },
            aletaConjunto:{
                estado: $scope.aletaConjunto,
                material: 0,
                tipo: 0
            }
        };

        if($scope.aletaSimple){
            datos.aletaSimple.material= $scope.prueba.material1;
            datos.aletaSimple.tipo= $scope.prueba.aleta1;
        }
        if($scope.aletaConjunto){
            datos.aletaConjunto.material= $scope.prueba.material2;
            datos.aletaConjunto.tipo = $scope.prueba.aleta2;
        }

        var peticion = $http({
            method: 'POST',
            url:'/prueba/crear',
            params: datos
        });

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
