
angular
    .module('main', ['common'])
    .controller(
        'activeCtrl',
        [
            '$scope',
            '$http',
            function($scope, $http) {

                var socket;

                $scope.pageInfo.title = "Who Is Active?";

                $scope.data = { };

                socket = io.connect('/whoIsActive');
                socket.on('whoIsActive', function (result) {
                    $scope.$apply(function() {
                        if(result.error) {
                            $scope.pageInfo.errorMessage = result.error;
                        }
                        else {
                            $scope.data = result.data;
                        }
                    });
                });

                $scope.$watch("pageInfo.selectedConnection", function(connection){
                    if(connection && connection.id) {
                        $scope.data = { };
                        socket.emit('setConnection', { connection: connection.id });
                    }
                });
            }
        ]
    );