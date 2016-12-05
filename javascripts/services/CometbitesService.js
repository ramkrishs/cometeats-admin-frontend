/**
 * Created by Ramakrishnan_sathyav on 10/31/2016.
 */
(function() {
    app.factory('cometbitesService',function ($http) {

        const BASE_URL = 'http://localhost:8084/api/v1/admin/';
        return {
            getFoodJoints:function () {
                return $http({method:'GET',url:BASE_URL+'foodjoint'});
            },
            getFoodJoint:function (id) {
                return $http({method:'GET',url:BASE_URL+'foodjoint/'+id});
            },
            addFoodJoints:function(foodJoint){
                return $http(
                    {
                        method:'POST',
                        url:BASE_URL+'foodjoint',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(foodJoint)
                    }
                );
            },
            updateFoodJoints:function(foodJoint,fjID){
                return $http(
                    {
                        method:'PUT',
                        url:BASE_URL+'foodjoint/'+fjID,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(foodJoint)
                    }
                );
            },
            addMenu:function(item,fjID){
                return $http(
                    {
                        method:'POST',
                        url:BASE_URL+'foodjoint/'+fjID+'/menu',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(item)
                    }
                );
            },
            updateMenu:function(item,fjID,mID){
                return $http(
                    {
                        method:'PUT',
                        url:BASE_URL+'foodjoint/'+fjID+'/menu/'+mID,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(item,fjID,mID)
                    }
                );
            },
            deleteMenu:function(fjID,mID){
                return $http(
                    {
                        method:'DELETE',
                        url:BASE_URL+'foodjoint/'+fjID+'/menu/'+mID,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(fjID,mID)
                    }
                );
            },
            deleteFood:function(fjID){
                return $http(
                    {
                        method:'DELETE',
                        url:BASE_URL+'foodjoint/'+fjID,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(fjID)
                    }
                );
            }
        };
    });



}());