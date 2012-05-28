$(function () {

    module('cssWriter');

    test('should be defined on the app object', function () {
        ok(window.app.cssWriter, 'cssWriter method is defined');
    });

    test('should return the rules', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        var rules = writer.rules;

        ok(rules.length === 2, 'expected 2 rules but there were ' + rules.length);
        ok(rules[0].selectorText === 'body', 'expected the first rule selector to be "body" but was "' + rules[0].selectorText + '"');
        ok(rules[1].selectorText === 'a', 'expected the first rule selector to be "a" but was "' + rules[1].selectorText + '"');

    });

    test('should expose the value set on the style element id attribute', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        var id = writer.id;

        ok(_.any(document.getElementsByTagName('style'), function (element) {
            return element.id === id;
        }), 'A style element should exist on the page with id of ' + id);

    });

    test('should remove the style element from the document', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        var id = writer.id;

        writer.destroy();

        ok(!_.any(document.getElementsByTagName('style'), function (element) {
            return element.id === id;
        }), 'No style elements should exist on the page with id of ' + id);

    });

    test('should return an array of rules each wrapped in jQuery', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        var rules = writer.rules;
        var $rules = writer.rulesAsjQuery();

        ok(rules.length === $rules.length, 'rules and $rules should be the same length');
        ok(_.all($rules, function (rule) {
            return rule instanceof $;
        }), 'each rule should be an instance of jQuery');
        
        ok(_.all($rules, function (rule, i) {
            return rule[0] === rules[i];
        }), 'each jquery should contain the corresponding rule');
        
    });

    test('should update the stylesheet with new rules', function () {

        var writer = app.cssWriter('body { color:#fff; } a { color:#00f; }');
        writer.update('#foo { color:#fff; }');

        ok(writer.rules.length === 1, 'expected 1 rule but there were ' + writer.rules.length);
        ok(writer.rules[0].selectorText === '#foo', 'expected the selector text to be "#foo" but it was "' + writer.rules[0].selectorText + '"');

    });

});
