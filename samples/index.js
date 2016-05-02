/**
 * Created by ipeshev on 4/30/16.
 */
/*globals angular:true */
'use strict';

angular.module('SampleApp', ['TriggerButton']).controller("SampleCtrl", function($scope, $filter){

    $scope.somethingDangerous = function(){
        if(!$scope.protected){
            alert("Opss, data gone to trash");
        } else {
            alert("Trash bin is locked");
        }
    };
    $scope.protected = true;

    function randomDate(){
        return new Date(new Date().getTime() + Math.floor((Math.random() * 100000) - 100000));
    }

    function Row(a,b){
        this.name = a;
        this.value = b;
        this.when = $filter('date')(randomDate(),'MM/dd/yyyy');
    }

    $scope.data = [
        new Row("Sasha",10),
        new Row("John",3),
        new Row("George",7),
        new Row("Alexander",1),
        new Row("Todor",4),
        new Row("Ivan",11),
        new Row("Jenna",5),
        new Row("Masha",8),
        new Row("Asan",9)
    ];
});