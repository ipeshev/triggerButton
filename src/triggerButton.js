angular.module('triggerButton',[]).directive('triggerButton',
    function($timeout) {
        return {
            restrict: 'A',
            require: '?ngModel',

            link: function($scope, element, attrs, controller) {
                element.addClass("trigger-button");
                var currentTimeout;
                function setViewValue(val){
                    $timeout.cancel(currentTimeout);
                    controller && controller.$setViewValue(val);
                }
                function unlock(){
                    $scope.protected = true;
                    element.removeClass("unlocked");
                    setViewValue($scope.protected);

                }
                function lock(){
                    $scope.protected = false;
                    element.addClass('unlocked');
                    setViewValue($scope.protected);
                }
                element.bind('mouseleave',unlock);
                element.bind('keyup',function(e) {
                    if (e.keyCode === 27) { //esc
                        unlock();
                    }
                });
                element.bind('click',function(event){
                    if($scope.protected){
                        event.stopImmediatePropagation();
                        lock();

                    } {
                        currentTimeout = $timeout(unlock,5000);

                    }
                });
                $scope.protected = true;
            }
        };
    }
);