'use strict';

var whois = require('node-whois');
var fs = require('fs');

$(document).ready(function() {

    var emailOutput = [];
    var urls = [];
    var urlLength = urls.length;
    var urlCount = 0;

    $('#form').on('submit', function(event) {

       event.preventDefault();

        var domain = $('#domain').val();

        search(domain, function(error, data) {

            //console.log('data', data);
            if (error){
                return console.log(err);
            }

            data = data.toString().replace( /\r\n/g, '<br>');
            console.log(data);

            $('#results').html(data);

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
});