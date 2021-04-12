// index.js
const sls = require('serverless-http')
const binaryMimeTypes = require('./binaryMimeTypes')
const express = require('express')
const app = express()
const { Nuxt } = require('nuxt')
const path = require('path')
const config = require('./nuxt.config.js')

// async handler nuxt 2.5.1+ 
async function nuxtApp() {
	app.use('/_nuxt', express.static(path.join(__dirname, '.nuxt', 'dist')))
	const nuxt = new Nuxt(config)
	await nuxt.ready()
	app.use(nuxt.render)
	return app
}

module.exports.nuxt = async (event, context) => {
	let nuxt_app = await nuxtApp()
	let handler = sls(nuxt_app, { binary: binaryMimeTypes })
	return await handler (event, context)
}
