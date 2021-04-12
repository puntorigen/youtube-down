//funciones para ruta /api

const connectToDatabase = require('../db'); // initialize connection
const Sequelize = require('sequelize'); // sequelize handler
var moment = require('moment');
var wait = require('wait.for');
var util = require('util');
var async = require('async');
var _ = require('underscore');
var fs = require('fs');
const fileType = require('file-type');
var path = require('path');
// requires globales segun requerimiento de codigos de funciones
const AWS = require('aws-sdk');
AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: 'us-east-1',
});
const AWS_s3 = new AWS.S3();
var colors = require('colors');

// funciones para cada ruta
var self = {};
self.api_download = async (req, res) => {
	let params = req.body;
const { videos } = await connectToDatabase()

if ((!_.has(params, 'url') || _.isUndefined(params.url) || _.isNull(params.url))  && (!_.has(params, 'format') || _.isUndefined(params.format) || _.isNull(params.format)) ) {
var resp = {
error : 400,
message : 'missing param'};
			res.send(resp);
}
 else {
			let ytdl = require('ytdl-core');
			let info = await ytdl.getBasicInfo(params.url);
			let titulo = info.title;
			let tiene_japo = require('japanese-characters');
			let asian = require('japanese');
			let es_japo = tiene_japo.presentIn(titulo);
if (es_japo==true||es_japo=='true') {
				titulo = asian.romanize(titulo);
}
			let clean = require('clean-text-utils');
			titulo = clean.strip.emoji(titulo);
titulo = clean.replace.diacritics(titulo);
titulo = clean.replace.smartChars(titulo);
			res.setTimeout(600000);
if (params.format=='mp3') {
if (process.env.START_TYPE ==  'development') console.log(' api_download: '.underline.yellow+'Downloading MP3: '+titulo,{});
let existe = await videos.findAll({where: { youtube_id: info.video_id, 
format: 'mp3' },
tableHint: Sequelize.TableHints.NOLOCK},{ raw:true });
let ID_405098535_where={ youtube_id: info.video_id, 
format: 'mp3' };
				let ffmpegbase = require('@ffmpeg-installer/ffmpeg');
				let ffmpeg = require('fluent-ffmpeg');
				let randomFile = require('random-file');
				ffmpeg.setFfmpegPath(ffmpegbase.path);
let path = require('path'), fs = require('fs');
let isThisLocalhost = function (req){
    let ip = req.connection.remoteAddress;
    let host = req.get('host');  
    return ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1" || host.indexOf("localhost") !== -1;
};
let dirtmp = (isThisLocalhost(req))?__dirname:'/etc/';
//let f_webm = path.resolve(dirtmp, randomFile({ extension:'mp4' }) );
let f_mp3 = path.resolve(dirtmp, randomFile({ extension:'mp3' }) );
				res.header('Content-Disposition', 'attachment; filename=audio.mp3"');
				stream = ytdl(params.url, { quality:'highestaudio'});
				bitmax = 128;
				ffmpeg(stream).audioBitrate(bitmax).save(f_mp3)
.on('error', function() {
      console.log('error guardando mp3');
      fs.unlink(f_mp3, function() {
         //console.log('mp3 eliminado');
      });
}).on('end', function() {
        fs.createReadStream(f_mp3).pipe(res).on('finish', function() {
            fs.unlink(f_mp3, function() {
               //console.log('mp3 eliminado');
            });
        }).on('error', function() {
            fs.unlink(f_mp3, function() {
               //console.log('mp3 eliminado');
            });
        });
});
if (existe && existe.length==0) {

await videos.create({
	youtube_id : info.video_id,
	requests : 1,
	title : titulo,
	format : 'mp3'
}).then(async function(ID_996202213) {
});
}
 else {
await videos.update({
requests : existe[0].requests+1,
title : titulo
}
,{ where: ID_405098535_where});
}}
 else {
if (process.env.START_TYPE ==  'development') console.log(' api_download: '.underline.yellow+'Downloading video: '+titulo,{});
let existe = await videos.findAll({where: { youtube_id: info.video_id, 
format: 'mp4' },
tableHint: Sequelize.TableHints.NOLOCK},{ raw:true });
let ID_1183471542_where={ youtube_id: info.video_id, 
format: 'mp4' };
if (existe && existe.length==0) {

await videos.create({
	youtube_id : info.video_id,
	requests : 1,
	title : titulo,
	format : 'mp4'
}).then(async function(ID_1701420860) {
});
}
 else {
await videos.update({
requests : existe[0].requests+1,
title : titulo
}
,{ where: ID_1183471542_where});
}				res.header('Access-Control-Allow-Origin','*');
				res.header('Content-Disposition', 'attachment; filename=video.mp4"');
				ytdl(params.url, { format: 'mp4'}).pipe(res);
}}}
self.api_info = async (req, res) => {
	let params = req.body;

if ((!_.has(params, 'url') || _.isUndefined(params.url) || _.isNull(params.url)) ) {
var resp = {
error : 400,
message : 'missing param'};
}
 else {
			let ytdl = require('ytdl-core');
			let info = await ytdl.getBasicInfo(params.url);
var resp = {
error : 0,
message : 'ok',
data : info.player_response.videoDetails};
}res.send(resp);
}

module.exports = self;
