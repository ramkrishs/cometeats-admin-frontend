/**
 * Angular App Module
 *
 * @author Ramakrishnan Sathyavgeeswaran.
 */

var app = angular.module("cometbites", ["ngRoute","ui.router","uiRouterStyles",'ui.bootstrap','oitozero.ngSweetAlert']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('foodjoints');
    $stateProvider
        .state('home',{
            url:'/',
            templateUrl:'partials/home.html',
            controller: "MainController",
            data: {
                css: ['stylesheet/main.css','stylesheet/vendor/autocomplete.css'
                ],
                js:['javascripts/script.js']
            }
        })
        .state('home.view',{
            url:'foodjoints',
            templateUrl:'partials/views.html',
            controller:"ViewController"
        })
        .state('home.foodjoint',{
            url:'food/:fjId',
            templateUrl:'partials/foodjoint.html',
            controller:"FoodController"
        })
        .state('home.contact',{
            url:'contact',
            templateUrl:'partials/contact.html',
            controller:"ContactController"
        });




});