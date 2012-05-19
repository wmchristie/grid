(function (app, $, _, undefined) {

    var ByCell,
        ByTable,
        ByTemplate,
        max = 100,
        rowCount = 20,
        colCount = 10;

    ByTemplate = function () {

        this.body = $('tbody');
        this.body.empty();

        this.rowData = [];

        _.templateSettings.variable = 'x';

        var t1 = _.template('<td class="col<%= x.c %>"><td class="data"><span>cell_<%= x.r %>_<%= x.c %></span></div></td>');
        var t2 = _.template('<td class="col<%= x.c %>"><td class="data"><span>cell_<%= x.c %>_<%= x.r %></span></div></td>');

        for (var r = 0; r < rowCount; r++) {
            row = this.rowData[r] = r % 2 === 0 ? t1 : t2;
        }

        this.body = this.body[0];
        this.table = this.body.parentNode;


    };

    ByTemplate.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);

        },

        forward : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                markup += '<tr class="';
                markup += r % 0 === 0 ? '">' : 'odd">';

                row = rowData[r];

                for (c = 0; c < colCount; c++) {
                    markup += row({
                        r : r,
                        c : c
                    });
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (t = rowCount - 1; t >= 0; t--) {

                markup += '<tr class="';
                markup += t % 2 === 0 ? '">' : 'odd">';


                row = rowData[t];

                for (d = colCount - 1; d >= 0; d--) {
                    markup += row({
                        r : t,
                        c : d
                    });
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },




        foo : function (markup, tbody) {

            var m = '<table>';
            m += markup;
            m += '</table>'

            var div = document.createElement('div');

            div.innerHTML = m;
            return this.body = this.table.replaceChild(div.firstChild.firstChild, this.table.firstChild);
        }


    };

    ByCell = function () {

        this.body = $('tbody');
        this.body.empty();
        this.rows = [];

        for (var r = 0; r < rowCount; r++) {

            var $row = $('<tr></tr>').appendTo(this.body);

            var row = this.rows[r] = [];

            for (var c = 0; c < colCount; c++) {

                var col = $('<td class="col' + c + '"></td>').appendTo($row);

                row[c] = col[0];

            }

        }

        this.rowData = [];

        for (var r = 0; r < rowCount; r++) {

            row = this.rowData[r] = [];

            for (var c = 0; c < colCount; c++) {

                row[c] = '<div class="data"><span>cell_' + r + '_' + c + '</span></div>';

            }
        }

        this.body = this.body[0];

    };

    ByCell.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);


        },

        forward : function () {

            var ticks,
                body = this.body,
                rows = this.rows,
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                row = rowData[r];
                tr = rows[r];

                for (c = 0; c < colCount; c++) {
                    tr[c].innerHTML = row[c];
                }

            }

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                rows = this.rows,
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (r = 0, t = rowCount - 1; r < rowCount; r++, t--) {

                row = rowData[r];
                tr = rows[t];

                for (c = 0, d = colCount - 1; c < colCount; c++, d--) {
                    tr[d].innerHTML = row[c];
                }

            }

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        }


    };

    ByTable = function () {

        this.body = $('tbody');
        this.body.empty();

        this.rowData = [];

        for (var r = 0; r < rowCount; r++) {

            row = this.rowData[r] = [];

            for (var c = 0; c < colCount; c++) {

                row[c] = '<td class="col' + c + '><div class="data"><span>cell_' + r + '_' + c + '</span></div></td>';

            }
        }

        this.body = this.body[0];
        this.table = this.body.parentNode;

    };

    ByTable.prototype = {

        go : function () {

            var self = this,
                id = null;

            this.per = [];
            this.i = 0;

            this.ticks = 0;

            id = setInterval(function () {

                if (self.i >= max) {
                    clearInterval(id);
                    console.log(self.ticks, 'avg:', _.reduce(self.per, function (memo, time) {
                        return memo + time;
                    }, 0)/max, 'min:', _.min(self.per), 'max:', _.max(self.per));
                    return;
                }

                if (self.i % 2 === 0) {
                    self.forward();
                } else {
                    self.reverse();
                }

                self.i++;

            }, 20);


        },

        forward : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, c,
                row;

            ticks = new Date().getTime();

            for (r = 0; r < rowCount; r++) {

                markup += '<tr class="';
                markup += r % 2 === 0 ? '">' : 'odd">';


                row = rowData[r];

                for (c = 0; c < colCount; c++) {
                    markup += row[c];
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        reverse : function () {

            var ticks,
                body = this.body,
                markup = '',
                rowData = this.rowData,
                r, t, c, d,
                row;

            ticks = new Date().getTime();

            for (t = rowCount - 1; t >= 0; t--) {

                markup += '<tr class="';
                markup += t % 2 === 0 ? '">' : 'odd">';


                row = rowData[t];

                for (d = colCount - 1; d >= 0; d--) {
                    markup += row[d];
                }

                markup += '</tr>';

            }

            //body.innerHTML = markup;
            body = this.foo(markup, body);

            ticks = new Date().getTime() - ticks;
            this.per[this.i] = ticks;

            this.ticks += ticks;

            console.log('++', this.i, ticks, this.ticks);

        },

        foo : function (markup, tbody) {

            var m = '<table>';
            m += markup;
            m += '</table>'

            var div = document.createElement('div');

            div.innerHTML = m;
            return this.body = this.table.replaceChild(div.firstChild.firstChild, this.table.firstChild);
        }


    };

    $(function () {

        var data = [
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            },
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            },
            {
                values : [ 1, 2, 3, 4, 5 ],
                items : [
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] },
                    { values : [ 6, 7, 8, 9, 10 ], items : [ { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] }, { values : [ 11, 12, 13 ] } ] }
                ]
            }
        ];

        function count (row) {
            
            row.count = 1;
            row.vc = row.values.length;
            row.ic = row.items ? row.items.length : 0;

            if (row.items) {
                _.each(row.items, function (item) {
                    count(item);
                    row.count += item.count;
                });
            } 

        }

        var ticks = new Date().getTime();

        data.row = _.memoize(function (r) {

            var i = 0, 
                limit = this.length;

            for (; i < limit; i++) {

                if (this[i].__min >= r && this[i].__max <= r
            }

            if (r === 0) {
                return this[0];
            }

        });

        data.count = 0;

        _.each(data, function (item) {

            count(item);
            data.count += item.count;
            item.offset = 0;

            item.cell = _.memoize(function (c) {
                
            });

        });


        data.cell = function (r, c) {

            var row = this.row(r);

            return row.cell(c);

        };

        ticks = new Date().getTime() - ticks;

        console.log(ticks, data.count);

        return;

        /*

        map = [];
        map[0] = [];

        counts = [ 5, 5, 3 ];

        count = 5;

        1  -> map[0][0] = function () { return data[0]['values'][0]; };

        1  -> map[0][0] = function () { return data[0].values[0]; };
        2  -> map[0][1] = function () { return data[0].values[1]; };
        3  -> map[0][2] = function () { return data[0].values[2]; };
        4  -> map[0][3] = function () { return data[0].values[3]; };
        5  -> map[0][4] = function () { return data[0].values[4]; };

        count = 5;
        6  -> map[0][5] = function () { return data[0]['items'][0]['values'][0]; };

        6  -> map[0][5] = function () { return data[0].items[0].values[0]; };
        7  -> map[0][6] = function () { return data[0].items[0].values[1]; };
        8  -> map[0][7] = function () { return data[0].items[0].values[2]; };
        9  -> map[0][8] = function () { return data[0].items[0].values[3]; };
        10 -> map[0][9] = function () { return data[0].items[0].values[4]; };

        count = 3;

        11 -> map[0][10] = function () { return data[0]['items'][0]['items'][0]['values'][0]; };

        11 -> map[0][10] = function () { return data[0].items[0].items[0].values[0]; };
        12 -> map[0][11] = function () { return data[0].items[0].items[0].values[1]; };
        13 -> map[0][12] = function () { return data[0].items[0].items[0].values[2]; };

        function get (r, c) {
        };



        map[1] = [];

        map[1][0];
        map[1][1];
        map[1][2];
        map[1][3];
        map[1][4];
        map[1][5];
        map[1][6];
        map[1][7];
        map[1][8];
        map[1][9];
        map[1][10];
        map[1][11];
        map[1][12];


        $('#by_cell').on('click', function () {
            new ByCell().go();
        });

        $('#by_table').on('click', function () {
            new ByTable().go();
        });

        $('#by_template').on('click', function () {
            new ByTemplate().go();
        });

        var find = /<[a-z\/][^>]*>/g;

        var text = '<a href="#"><div class="data">This items a test of the emergency broadcast system.  This items only a test<br/></div></a>';
        var title = text.replace(find, function (match) {
            return '';
        });

        console.log(title);

        $('#title_test').attr('title', title).html(text);

        */


    });


}(window.app || (window.app = {}), jQuery, _))
