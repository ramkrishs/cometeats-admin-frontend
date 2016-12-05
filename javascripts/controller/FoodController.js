/**
 * @author Ramakrishnan Sathyavageeswaran
 */
(function () {
    app.controller('FoodController', function ($scope,cometbitesService,$location,$uibModal,$log,$stateParams,SweetAlert ) {

        $scope.param = $stateParams.fjId;
        $scope.foodJoint = {};
        $log.info($scope.param);
        cometbitesService.getFoodJoint($scope.param)
            .success(function (response) {
                $scope.foodJoint = response;
                $log.info($scope.foodJoint);

            })
            .error(function (data,status,headers,config) {
                $log.warn(data,status,headers,config);
            });

        $scope.deleteFoodJoint = function () {
            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this FoodJoint!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm){
                if (isConfirm) {
                    cometbitesService.deleteFood($stateParams.fjId)
                        .success(function (response) {
                            // $uibModalInstance.dismiss('cancel');
                        })
                        .error(function (data,status,headers,config) {
                            $log.warn(data,status,headers,config);
                        });
                    SweetAlert.swal("Deleted!", "FoodJoint has been deleted.", "success");
                } else {
                    SweetAlert.swal("Cancelled", "FoodJoint is safe now :)", "error");
                }
            });
        };
        $scope.delMenu = function (item,ids) {

            SweetAlert.swal({
                title: "Are you sure?",
                text: "Your will not be able to recover this menu item!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel plx!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm){
                if (isConfirm) {

                    cometbitesService.deleteMenu($stateParams.fjId,"1")
                        .success(function (response) {
                            // $uibModalInstance.dismiss('cancel');
                        })
                        .error(function (data,status,headers,config) {
                            $log.warn(data,status,headers,config);
                        });
                    SweetAlert.swal("Deleted!", "Your FoodJoint menu has been deleted.", "success");
                } else {
                    SweetAlert.swal("Cancelled", "Your FoodJoint menu is safe now :)", "error");
                }
            });

        };
        $scope.open = function () {

            $uibModal.open({
                templateUrl: 'myModalContent.html',
                backdrop: true,
                windowClass: 'modal',
                controller: function ($scope, $uibModalInstance, $log,foodJoint) {
                    $scope.foodJoint = foodJoint;
                    $scope.submit = function () {
                        $log.log('Submiting edit info.');
                        $log.log($stateParams.fjId);
                        $log.info($scope.foodJoint);
                        cometbitesService.updateFoodJoints($scope.foodJoint,$stateParams.fjId)
                            .success(function (response) {
                                $scope.isRes = true;
                                $scope.resMsg = "Updated!!";
                                $log.info(response);
                                // $uibModalInstance.dismiss('cancel');
                            })
                            .error(function (data,status,headers,config) {
                                $log.warn(data,status,headers,config);
                            });

                    };
                    $scope.cancel = function () {
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

        $scope.addMenu = function () {

            $uibModal.open({
                templateUrl: 'menuModalContent.html',
                backdrop: true,
                windowClass: 'modal',
                controller: function ($scope, $uibModalInstance, $log) {

                    $scope.submit = function () {
                        $log.log('Submiting user info.');
                        // $log.log(user);
                        $log.info($scope.item);
                        // $uibModalInstance.dismiss('cancel');
                        cometbitesService.addMenu($scope.item,$stateParams.fjId)
                            .success(function (response) {
                                $scope.isRes = true;
                                $scope.resMsg = "Updated!!";
                                $log.info(response);
                                // $uibModalInstance.dismiss('cancel');
                            })
                            .error(function (data,status,headers,config) {
                                $scope.isRes = false;
                                $log.warn(data,status,headers,config);
                                $uibModalInstance.dismiss('cancel');
                            });

                    };
                    $scope.cancel = function () {
                        // $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    item: function () {
                        return $scope.item;
                    }
                }
            });
        };

        $scope.menuOpen = function (item,ids) {

            $uibModal.open({
                templateUrl: 'menuModalContent.html',
                backdrop: true,
                windowClass: 'modal',
                controller: function ($scope, $uibModalInstance, $log) {
                    $scope.item = item;
                    $scope.submit = function () {
                        $log.log('Submiting item info. '+ ids);
                        cometbitesService.updateMenu($scope.item,$stateParams.fjId,ids)
                            .success(function (response) {
                                $scope.isRes = true;
                                $scope.resMsg = "Updated!!";
                                $log.info(response);
                                // $uibModalInstance.dismiss('cancel');
                            })
                            .error(function (data,status,headers,config) {
                                $scope.isRes = false;
                                $log.warn(data,status,headers,config);
                                $uibModalInstance.dismiss('cancel');
                            });
                        // $log.log(user);
                        $log.info($scope.item);
                        // $uibModalInstance.dismiss('cancel');

                    };
                    $scope.cancel = function () {
                        $scope.isRes = false;
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                resolve: {
                    user: function () {
                        return $scope.item;
                    }
                }
            });
        };


    });
}());