/*global module test ok app */
$(function () {
    'use strict';

    module('dom');

    var dom;

    function container() {
        return $('#qunit-fixture');
    }

    function createDom() {
        dom = app.ui.grid.dom(container());
    }

    test('destroy() should empty the container', function () {

        createDom();
        dom.destroy();

        ok(container().children().size() === 0, 'length should be 0');

    });

    test('should add and remove a class of "data-grid" to the container', function () {

        container().removeClass('data-grid');
        ok(container().hasClass('data-grid') === false, 'container should not have the class');
        createDom();
        ok(container().hasClass('data-grid') === true, 'container should have the class');
        dom.destroy();
        ok(container().hasClass('data-grid') === false, 'container should not have the class');

    });

    test('should not remove a class of "data-grid" from the container when the class already exists', function () {

        container().addClass('data-grid');
        createDom();
        dom.destroy();
        ok(container().hasClass('data-grid') === true, 'container should have the class');

    });

    test('should export methods that return DOM element for the basic structure', function () {

        createDom();

        ok(container().find('thead')[0] === dom.thead(), 'should return the head table thead element');
        ok(container().find('.portal')[0] === dom.portal(), 'should return the portal element');
        ok(container().find('.portal table')[0] === dom.bodyTable(), 'should return the bodyTable element');
        ok(container().find('.scroll-sizer')[0] === dom.scrollSizer(), 'should return the scroll-sizer element');

        dom.destroy();

    });

    test('writeBody() should replace the tbody with a new tbody containing the markup', function () {

        createDom();

        var newBody = dom.writeBody('<tr><td>foo</td></tr>');

        ok(container().find('td').text() === 'foo', 'the contents of the cell should be foo');
        ok(dom.bodyTable().firstChild === newBody);

        dom.destroy();

    });

    test('writeHead() should replace the thead with a new thead containing the markup', function () {

        createDom();

        var newHead = dom.writeHead('<tr><th>foo</th></tr>');

        ok(container().find('th').text() === 'foo', 'the contents of the cell should be foo');
        ok(dom.thead() === newHead);

        dom.destroy();

    });

});
