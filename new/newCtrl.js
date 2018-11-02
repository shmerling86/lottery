app.controller('newCtrl', function ($scope, newSrv, $location, loginSrv) {

    if (!loginSrv.isLoggedIn()) {
        debugger
        $location.path('/');
    }

    $scope.sellerUserId = loginSrv.getActiveUser().id;
    $scope.productName = '';
    $scope.description = '';
    $scope.marketPrice = null;
    $scope.numberOfParticipants = null;
    $scope.lotteriePrice = function () {
        return $scope.marketPrice / $scope.numberOfParticipants
    };
    $scope.competitors = [];
    $scope.complete = 0;
    $scope.chance = function () {
        return parseInt(100 * (1 / $scope.numberOfParticipants)).toFixed(1)
    };




    $scope.isLogged = function () {
        return loginSrv.isLoggedIn()
    }

    $scope.logout = function () {
        loginSrv.logout();
        $location.path('/');
    }


    $scope.addLotterie = function () {

        newSrv.addLotterie($scope.productName, $scope.description, $scope.marketPrice, $scope.numberOfParticipants, $scope.lotteriePrice(), $scope.sellerUserId,
            $scope.competitors, $scope.complete, $scope.chance()).then(function (newItem) {

                $location.path('/list');

            }, function (error) {
                $log.error(error)
            });

    }

});