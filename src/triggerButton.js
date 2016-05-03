/*globals angular:true*/
'use strict';
/**
 * @directive triggerButton
 * @description two states button that makes modal dialog obsolete
 * @params ngModel - protected state : true - locked, false - unlocked
 */
angular.module('TriggerButton',[]).directive('triggerButton',
    function($timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',

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

                element.bind('mouseleave',lock);
                element.bind('keyup',function(e) {
                    if (e.keyCode === 27) { //esc
                        lock();
                    }
                });

                element.bind('click',function(event){
                    if($scope.protected){
                        event.stopImmediatePropagation();
                        unlock();
                    } {
                        currentTimeout = $timeout(lock,5000);
                    }
                });

                $scope.protected = true;
            }
        };
    }
);