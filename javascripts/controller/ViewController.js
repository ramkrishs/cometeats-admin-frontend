/**
 * @author Ramakrishnan Sathyavageeswaran
 */
(function () {
    app.controller('ViewController', function ($scope,cometbitesService, $location,$log,$stateParams,$uibModal) {

        $scope.addFoodJoint = function () {
            $log.info("Hi there add function");
            $uibModal.open({
                templateUrl: 'addFoodJoint.html',
                backdrop: true,
                windowClass: 'modal',
                controller: function ($scope, $uibModalInstance, $log,foodJoint) {
                    $scope.foodJoint = foodJoint;
                    $scope.submit = function () {
                        $log.log('Submiting food Joint info.');
                        $log.log($scope.foodJoint);

                        cometbitesService.addFoodJoints($scope.foodJoint)
                            .success(function (response) {
                                $scope.isRes = true;
                                $scope.resMsg = "Updated!!";
                                $scope.foodJoint = response;
                                $log.info(response);

                            })
                            .error(function (data,status,headers,config) {
                                $log.warn(data,status,headers,config);
                            });
                        // $uibModalInstance.dismiss('cancel');

                    };
                    $scope.cancel = function () {
                        $scope.isRes = false;
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    foodJoint: function () {
                        return $scope.foodJoint;
                    }
                }
            });
        };
        cometbitesService.getFoodJoints()
            .success(function (response) {
                $scope.foodJoints = response;
                $log.info($scope.foodJoints);

            })
            .error(function (data,status,headers,config) {
                $log.warn(data,status,headers,config);
            });



    });
}());