/**
 * Created by ipeshev on 4/30/16.
 */
'use strict';
angular.module('ui.directives', []).directive('triggerButton',
    function($timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',

            link: function($scope, element, attrs, controller) {
                element.addClass("protected-button");
                element.bind('mouseleave',function(event){
                    $scope.protected = true;
                    element.removeClass("unlocked");
                    controller.$setViewValue($scope.protected);
                });

                element.bind('click',function(event){
                    if($scope.protected){
                        event.stopImmediatePropagation();
                        $scope.protected = false;
                        element.addClass("unlocked");
                        controller.$setViewValue($scope.protected);
                    } {
                        $timeout(function(){
                            $scope.protected = true;
                            element.removeClass("unlocked");
                            controller.$setViewValue($scope.protected);
                        },5000);

                    }


                });
                $scope.protected = true;
            }
        };
    }
);

angular.module('Sample', ['ui.directives']).controller("SampleCtrl", function($scope){
    $scope.somethingDangerous = function(){
        if(!$scope.protected){
            alert("Opss, data gone to trash");
        } else {
            alert("Trash bin is locked");
        }
    };
    $scope.protected = true;

});