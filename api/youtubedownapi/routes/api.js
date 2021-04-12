/**
* Servicios en ruta /api
* @namespace {object} api
*/
var express = require('express'),
    wait = require('wait.for');
var router = express.Router();
var api = require('../models/api');

//
	/**
	 * (POST) Funcion no documentada
	 *
	 * @method
	 * @name api / info
	 * @alias info
	 * @memberof! api
	 * @param {String} url* 
	 * @return {Object} { error:0, message:'ok', data:{} }
	 */
	router.post('/info', function(req, res, next) {
		wait.launchFiber(api.api_info, req, res);
	});

	/**
	 * (POST) Funcion no documentada
	 *
	 * @method
	 * @name api / download
	 * @alias download
	 * @memberof! api
	 * @param {String} url* youtube video link
	 * @param {String} format* mp3,mp4
	 * @return {object}
	 */
	router.post('/download', function(req, res, next) {
		wait.launchFiber(api.api_download, req, res);
	});

module.exports = router;
