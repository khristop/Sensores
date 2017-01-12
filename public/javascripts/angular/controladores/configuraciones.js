
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