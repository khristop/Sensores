
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
