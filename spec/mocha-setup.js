(function (factory) {
    if (typeof define === 'function' && define['amd']) {
        define(['chai', 'sinon-chai'], factory);
    } else if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        factory(require('chai'), require('sinon-chai'));
    } else {
        factory(chai);
    }
} (function (chai, sinonChai) {
    'use strict';
    chai.use(sinonChai);
}));