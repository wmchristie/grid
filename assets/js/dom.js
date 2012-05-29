(function (app, $, _, undefined) {
    'use strict';

    app.gridDom = function (container) {

        var gridClassName = 'data-grid',
            headTable,
            bodyTable,
            thead,
            body,
            sizer,
            portal,
            template = _.template('<table><<%= item.tag %>><%= item.markup %></<%= item.tag %>></table>'),
            classWasAdded;

        function write(table, markup, tag) {

            var temp = document.createElement('div'),
                newNode;

            temp.innerHTML = template({
                markup : markup, 
                tag : tag
            });

            newNode = temp.childNodes[0].childNodes[0];

            table.replaceChild(
                newNode, // extract the new element
                _.first(table.getElementsByTagName(tag)) // find the existing element
            );

            return newNode;

        }

        if ((classWasAdded = ! $(container).hasClass(gridClassName))) {
            $(container).addClass('data-grid');
        }

        container.innerHTML = 
            '<table><thead></thead></table>' +
            '<div class="portal">' +
                '<div class="scroll-sizer">' +
                    '<table><tbody></tbody></table>' +
                '</div>' +
            '</div>';

        headTable = container.getElementsByTagName('table')[0];
        bodyTable = container.getElementsByTagName('table')[1];

        thead = headTable.firstChild;

        portal = _.find(container.childNodes, function (node) {
            return node.className === 'portal';
        });

        return {

            bodyTable : function () {
                return bodyTable;
            },

            destroy : function () {

                container.empty();

                if (classWasAdded) {
                    container.removeClass('data-grid');
                }

            },

            thead : function () {
                return thead;
            },

            portal : function () {
                return portal;
            },

            scrollSizer : function () {
                return $(portal).find('.scroll-sizer');
            },

            writeBody : function (markup) {
                return body = write(bodyTable, markup, 'tbody');
            },

            writeHead : function (markup) {
                return thead = write(headTable, markup, 'thead');
            }
        
        };

    };

}(window.app || (window.app = {}), jQuery, _));
