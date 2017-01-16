app.controller('consulta',['$scope','$http','$window', function ($scope, $http, $window) {

    $scope.lista ={};

    $scope.obtener = function () {
        $http({
            method: 'GET',
            url: '/prueba/lista'
        }).success(function (datos) {
            if(datos.status  == 'ok'){
                $scope.lista = datos.pruebas;
            }else{
                alert(datos);
            }
        })
    };

    $scope.obtener();
    
    $scope.abrir = function (idp) {
        swal({
            title: "Abrir la prueba",
            text: "Ir a la prueba "+ idp,
            type:'info',
            showCancelButton: true,
            confirmButtonColor: "#1ECB42",
            confirmButtonText: 'Ir a la prueba',
            closeOnConfirm: false
        },
        function (isConfirm) {
            if (isConfirm){
                $window.location.href='/prueba/'+idp;
            }
        })
    }
}])