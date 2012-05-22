(function (app, $, _, undefined) {

    app.gridDom = function (container) {

        var table,
            template = _.template('<table><<%= item.tag %>><%= item.markup %></<%= item.tag %>></table>'),
            write;

        container.innerHTML = '<table><thead></thead><tbody></tbody></table>';

        table = _.first(container.getElementsByTagName('table'));

        function write (markup, tag) {

            var temp = document.createElement('div');

            temp.innerHTML = template({
                markup : markup, 
                tag : tag
            });

            table.replaceChild(
                temp.childNodes[0].childNodes[0], // extract the new element
                _.first(table.getElementsByTagName(tag)) // find the existing element
            );


        }

        return {

            writeBody : function (markup) {
                write(markup, 'tbody');
            },

            writeHead : function (markup) {
                write(markup, 'thead');
            }
        
        };

    };

}(window.app || (window.app = {}), jQuery, _))
