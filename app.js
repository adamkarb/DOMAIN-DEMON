'use strict';

var whois = require('node-whois');
var fs = require('fs');
var jade = require('jade');

$(document).ready(function() {

    var emailOutput = [];
    var urls = [];
    var urlLength = urls.length;
    var urlCount = 0;

    $('#results').hide();
    $('.loading').hide();

    $('#form').on('submit', function(event) {

        $('#results').hide();
        $('.loading').show();

       event.preventDefault();

        var domain = $('#domain').val();

        search(domain, function(error, data) {

            //console.log('data', data);
            if (error){
                return console.log(err);
            }

            var mikesizz = objectify(data);

            console.log('mikesizz', mikesizz);

            var fn = jade.compileFile('./template.jade');

            var newHtml = fn(mikesizz);

            $('.loading').hide();

            $('#results').show().html(newHtml);


            //console.log('output', output);



        });

    });


    function search( urls , callback ) {

        //urls.forEach(function(link) {

            whois.lookup(urls, function(err, data) {


                fs.writeFile('results.txt', data, function() {
                    console.log("Written");
                });

                callback(null, data);


                //if (urlCount === urlLength) {
                //    console.log(emailOutput);
                //}

            });

            //urlCount++;

        //});
    }

    function objectify (input) {

        input.replace( /\r\n/g, '\n');

        var newArray = input.split('\n');

        var obj = {};

        newArray.forEach(function(item) {

            if ( item.indexOf(': ') !== -1 ) {

                var mike = item.split(": ");

                mike[0] = mike[0].replace(/\s+/g, '_').toLowerCase();
                mike[1] = mike[1].trim();

                obj[mike[0]] = mike[1];

                if (mike[0] === 'NameServer') {
                    var breakOut = true;
                }
            }

        });

        return obj;

    }
});