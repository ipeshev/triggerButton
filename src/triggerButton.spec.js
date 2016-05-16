/*globals describe:true, module:true, spyOn:true, beforeEach:true, expect:true, angular:true, inject:true, console:true */
describe("Trigger button directive",function(){
    var scope,
        element,
        document,
        timeout;

    function isUnlocked(val) {
        expect(element.hasClass('unlocked')).toEqual(val);
        expect(scope.protected).toEqual(!val);
    }
    function clickTrigger(){
        angular.element(element.find("button")[1]).triggerHandler('click');
    }

    beforeEach(module('angularTriggerButton'));

    beforeEach(inject(function ($rootScope, $compile, $document, $timeout) {
        scope = $rootScope.$new();
        document = $document;
        timeout = $timeout;
        scope.protected = true;
        scope.launchRockets = function(){
            console.log("Rockets launched");
        };

        spyOn(scope, 'launchRockets');

        element = angular.element('<button trigger-button data-ng-model="protected" action="launchRockets()"></button>');

        angular.element($document[0].body).append(element[0]);
        element = $compile(element)(scope);

        scope.$digest();
    }));

    afterEach(function() {
        element.remove();
        scope.$destroy();
    });

    it("should activate on first click", function(){
        clickTrigger();
        isUnlocked(true);
    });

    it("should deactivate on esc", function(){
        clickTrigger();
        document.triggerHandler({type:'keyup',keyCode:27});
        isUnlocked(false);
    });

    it("should deactivate after 5 seconds", function(){
        clickTrigger();
        timeout.flush(5000);
        isUnlocked(false);
    });

    it("should trigger functionality on second click", function(){
        clickTrigger();
        clickTrigger();
        expect(scope.launchRockets).toHaveBeenCalled()
    });
});