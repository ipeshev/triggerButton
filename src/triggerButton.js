/*globals angular:true*/
'use strict';
/**
 * @directive triggerButton
 * @description two states button that makes modal dialog obsolete
 * @params ngModel - protected state : true - locked, false - unlocked
 */
angular.module('angularTriggerButton',[]).directive('triggerButton',
    function($timeout, $document) {
        return {
            restrict: 'AE',
            require: '?ngModel',
            transclude: true,
            template:"<div class='trigger-container' style=''>" +
            "<button ng-click='lock()' class='fa fa-ban cancel' ></button>" +
            "<button ng-click='clicked($event)' ng-transclude class='trigger'>" +
            "</button><button ng-click='lock()' class='fa fa-ban cancel'></button>" +
            "</div>",
            scope:{
                action:'&'
            },
            link: function($scope, element, attrs, controller) {
                element.addClass("trigger-button");
                var currentTimeout;

                /**
                 * @function setViewValue ( private )
                 * @description sets view value in case of ngModel provided
                 * @param val
                 */
                function setViewValue(val){
                    $timeout.cancel(currentTimeout);
                    controller && controller.$setViewValue(val);
                }

                /**
                 * @function lock (private)
                 * @description Locks the button
                 */
                function lock(){
                    $scope.protected = true;
                    element.removeClass("unlocked");
                    setViewValue($scope.protected);
                }

                /**
                 * @function unlock (private)
                 * @description Unlocks the button
                 */
                function unlock(){

                    $scope.protected = false;
                    element.addClass('unlocked');
                    setViewValue($scope.protected);
                }

                //
                //
                $document.bind('keyup',function(e) {
                    if (e.keyCode === 27) { //esc
                        lock();
                    }
                });

                $scope.lock = lock;
                /**
                 * @function clicked
                 * @description on click of the trigger
                 * @param event
                 */
                $scope.clicked = function(event){
                    if($scope.protected){
                        event.stopImmediatePropagation();
                        unlock();
                    } else {
                        $scope.action(event);
                    }
                    currentTimeout = $timeout(lock,5000);
                };

                $scope.protected = true;
            }
        };
    }
);