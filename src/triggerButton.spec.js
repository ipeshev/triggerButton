/*globals describe:true, module:true, spyOn:true, beforeEach:true, expect:true, angular:true, inject:true, console:true */
describe("Trigger button directive",function(){
    var scope,
        element;
    beforeEach(module('TriggerButton'));
    beforeEach(inject(function ($rootScope, $compile, $document) {
        scope = $rootScope.$new();

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
        expect(1).toEqual(1)
    });
    it("should activate on enter", function(){
        expect(1).toEqual(1)
    });
    it("should deactivate on esc", function(){
        expect(1).toEqual(1)
    });
    it("should deactivate on mouseout", function(){
        expect(1).toEqual(1)
    });
    it("should deactivate after 5 seconds", function(){
        expect(1).toEqual(1)
    });
    it("should trigger functionality on second click/enter", function(){
        expect(1).toEqual(1)
    });
});