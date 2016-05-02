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

    beforeEach(module('TriggerButton'));

    beforeEach(inject(function ($rootScope, $compile, $document, $timeout) {
        scope = $rootScope.$new();
        document = $document;
        timeout = $timeout;
        scope.protected = true;
        scope.launchRockets = function(){
            console.log("Rockets launched");
        };

        spyOn(scope, 'launchRockets');
        element = angular.element('<button trigger-button data-ng-model="protected" data-ng-click="launchRockets()"></button>');

        angular.element($document[0].body).append(element[0]);
        element = $compile(element)(scope);

        scope.$digest();
    }));

    afterEach(function() {
        element.remove();
        scope.$destroy();
    });

    it("should activate on first click", function(){
        element.triggerHandler('click');
        isUnlocked(true);
    });

    it("should deactivate on esc", function(){
        element.triggerHandler('click');
        element.triggerHandler({type:'keyup',keyCode:27});
        isUnlocked(false);
    });

    it("should deactivate on mouseleave", function(){
        element.triggerHandler('click');
        element.triggerHandler('mouseleave');
        isUnlocked(false);
    });

    it("should deactivate after 5 seconds", function(){
        element.triggerHandler('click');
        timeout.flush(5000);
        isUnlocked(false);
    });

    it("should trigger functionality on second click", function(){
        element.triggerHandler('click');
        element.triggerHandler('click');
        expect(scope.launchRockets).toHaveBeenCalled()
    });
});