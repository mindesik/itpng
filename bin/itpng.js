#!/usr/bin/env node

var fs = require('fs');
var tinify = require('tinify');
var env = require('dotenv').config({path: process.env.HOME + '/.itpng'});
var extensions = ['png', 'jpg', 'jpeg'];

if (!env.TINYPNG_API_KEY) {
    return console.log('TINYPNG_API_KEY is not set');
}

tinify.key = env.TINYPNG_API_KEY;

var args = process.argv.slice(2);

var toConvert = [];

fs.readdirSync(process.cwd()).forEach(function (file) {
    var parts = file.split('.');
    if (parts.length > 1) {
        if (extensions.indexOf(parts[parts.length - 1]) !== -1) {
            var path = process.cwd() + '/' + file;
            toConvert.push(path);
        }
    }
});

if (toConvert.length > 0) {
    toConvert.forEach(function (file) {
        var source = tinify.fromFile(file);
        var parts = file.split('.');
        var extension = parts.pop();
        source.toFile(parts.join('.') + '_compressed' + '.' + extension);
    });
    console.log('Done converting ' + toConvert.length + ' files!');
} else {
    console.log('No files to convert');
}