require.config({
    paths: {
        jquery: '../vendor/jquery/jquery',
        lodash: '../vendor/lodash/lodash.compat',
        tpl: '../vendor/requirejs-tpl/tpl',
        bootstrap: '../vendor/bootstrap/bootstrap',
        text: '../vendor/requirejs-plugins/text',
        json: '../vendor/requirejs-plugins/json',
        templates: '../templates'
    },
    shim: {
        'handlebars': {
            exports: 'Handlebars'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    },
    waitSeconds: 30 //default = 7
});

require([
    'jquery',
    'app', 
    'bootstrap'
], function($, App) {
    'use strict';
    
    console.log('MAIN loaded');
    $('document').ready(function(){
        App.init();
    });
});
