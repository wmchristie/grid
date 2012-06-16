// requires templates.js
(function (app, $, _, undefined) {
    'use strict';

    // $container must be a jQuery object that contains a single DOM element
    app.ui.grid.dom = function ($container) {

        var gridClassName = 'data-grid',
            container = _.first($container),
            headTable,
            bodyTable,
            body,
            sizer,
            portal,
            scrollSizer,
            template = _.template('<table><<%= item.tag %>><%= item.markup %></<%= item.tag %>></table>'),
            classWasAdded;

        function write(table, markup, tag) {

            var temp = document.createElement('div'),
                newNode;

            temp.innerHTML = template({
                markup : markup, 
                tag : tag
            });

            newNode = temp.firstChild.firstChild;

            table.replaceChild(
                newNode, // extract the new element
                _.first(table.getElementsByTagName(tag)) // find the existing element
            );

            return newNode;

        }

        if ((classWasAdded = ! $container.hasClass(gridClassName))) {
            $container.addClass('data-grid');
        }

        $container.html(
            '<table><thead></thead></table>' +
            '<div class="portal">' +
                '<div class="scroll-sizer">' +
                    '<table><tbody></tbody></table>' +
                '</div>' +
            '</div>'
        );

        headTable = container.firstChild;
        portal = container.childNodes[1];
        scrollSizer = portal.firstChild;
        bodyTable = scrollSizer.firstChild;

        return {

            bodyTable : function () {
                return bodyTable;
            },

            destroy : function () {

                $container.empty();

                if (classWasAdded) {
                    $container.removeClass('data-grid');
                }

            },

            portal : function () {
                return portal;
            },

            scrollSizer : function () {
                return scrollSizer;
            },

            thead : function () {
                return headTable.firstChild;
            },

            writeBody : function (markup) {
                return body = write(bodyTable, markup, 'tbody');
            },

            writeHead : function (markup) {
                return write(headTable, markup, 'thead');
            }
        
        };

    };

}(window.app || (window.app = {}), jQuery, _));
