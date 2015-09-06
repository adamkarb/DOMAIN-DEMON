'use strict';

var whois = require('node-whois');
var fs = require('fs');
var jade = require('jade');

$(document).ready(function () {

    var emailOutput = [];
    var urls = [];
    var urlLength = urls.length;
    var urlCount = 0;

    $('#results').hide();
    $('.loading').hide();

    $('#form').on('submit', function (event) {

        $('#results').hide();
        $('.loading').show();

        event.preventDefault();

        var domain = $('#domain').val();

        // regex the crap out of this url
        domain = trimDomain(domain);

        search(domain, function (error, data) {

            console.log('error', error);
            if (error) {
                $('.loading').hide();
                return $('#results').show().html(error);
            }

            var mikesizz = objectify(data);

            console.log('mikesizz', mikesizz);

            // Do this to allow iteration in jade over this key
            var superObj = {
                iterator: mikesizz
            };

            // fn -> function used to render template
            var fn = jade.compileFile('./template.jade');

            // newHtml -> html compiled and returned from fn
            var newHtml = fn(superObj);

            // Hide loading marker
            $('.loading').hide();

            // display results
            $('#results').show().html(newHtml);

            // Reset the search field
            $('#domain').val('');

        });

    });


    function search(urls, callback) {

        //urls.forEach(function(link) {

        whois.lookup(urls, function (err, data) {

            if (err) {
                console.log('err', err);
            }

            fs.writeFile('results.txt', data, function () {
                console.log("Written");
            });

            if ((data.indexOf('ERROR') !== -1) || (data.indexOf('No match') !== -1)) {
                return callback('No results found...', null);
            }

            callback(null, data);


            //if (urlCount === urlLength) {
            //    console.log(emailOutput);
            //}

        });

        //urlCount++;

        //});
    }

    function objectify(input) {

        input.replace(/\r\n/g, '\n');

        var newArray = input.split('\n');

        var obj = {};

        newArray.forEach(function (item) {

            if (item.indexOf(': ') !== -1) {

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

    function trimDomain(domain) {

        // remove any common website prefix
        domain = domain.replace(/^(?:http(?:s)?:\/\/)?(?:www(?:[0-9]+)?\.)?/gi, '');

        // remove anything after trailing slash, including slash
        domain = domain.replace(/\/.*$/, '');

        return domain;

    }

});