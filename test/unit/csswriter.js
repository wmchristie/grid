$(function () {

    module('cssWriter');

    test('should be defined on the app object', function () {
        ok(window.app.cssWriter, 'cssWriter method is defined');
    });

    test('should return the rules', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        var rules = writer.rules;

        ok(rules.length === 2, 'expected 2 rules but there were ' + rules.length);

    });

});
