// nuxt.config.js
const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  mode: 'spa',
  loading: {
    color: 'blue',
    height: '2px',
    continuous: true
  },
  head: {
    title: 'Youtube-down.com - Download any video/mp3 from youtube! Save and download youtube videos without any software or app',
    meta: [{'charset':'utf-8'},{'content':'true','hid':'B326B5062B2F0E69046810717534CB09','name':'HandheldFriendly'},{'content':'yes','hid':'A6105C0A611B41B08F1209506350279E','name':'mobile-web-app-capable'},{'content':'default','hid':'C21F969B5F03D33D43E04F8F136E7682','name':'apple-mobile-web-app-status-bar-style'},{'content':'##ffffff','hid':'5478D54E61FE6EDB1EE2CB9AFB5EF091','name':'theme-color'},{'content':'width','hid':'EAAE26A6FB20ED3EF54FB23BFA0B1FCC','name':'MobileOptimized'},{'content':'width=device-width, initial-scale=1','hid':'5E1C970618EB8A7A0BF508931E214FB5','name':'viewport'},{'content':'Youtube-down.com','hid':'4BC8C3B9CF823ECD83BE3B7A0C4B9A84','name':'name'},{'content':'Youtube-down.com - Download any video/mp3 from youtube! Save and download youtube videos without any software or app','hid':'CDC8103557494AEC8C8C90D0040717FB','name':'title'},{'content':'Our free YouTube video downloader lets you save/download youtube videos on computer ,laptop and mobile without any software and app,the best way to download youtube videos in MP4 and MP3 at the best quality and high download speed.','hid':'9E7C8832EE31D5CCBF5EBAC9964EDFEC','name':'description'},{'hid':'9CFEFED8FB9497BAA5CD519D7D2BB5D7','lang':'en'},{'content':'save youtube,youtube converter,no software,online free,without software,url trick,best way,youtube downloader,youtube down,youtube to mp4,youtube to mp3,youtube video downloader,youtube music downloader,get videos,youtube video converter,save video,to computer,download YouTube videos,download YouTube','hid':'38097C5EB8A92173E829A9C60886101D','name':'keywords'}],
    link: [
      { rel: 'icon', type: 'image/x-icon', href:'/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ],
  script: [],
  __dangerouslyDisableSanitizers: ['script'],
  },
  axios: {
		browserBaseURL : 'http://api.yourserver.com',
		https : true,
		baseURL : 'http://api.yourserver.com'
	},
  env: {
		urls : {
			info : '/api/info',
			download : '/api/download'
		},
		seo : {
			'apple-mobile-web-app-status-bar-style' : 'default',
			'theme-color' : '##ffffff',
			language : 'en',
			keywords : [],
			charset : 'utf-8',
			handheldfriendly : true,
			mobileoptimized : 'width',
			'mobile-web-app-capable' : 'yes',
			viewport : 'width=device-width, initial-scale=1',
			name : 'Youtube-down.com',
			title : 'Youtube-down.com - Download any video/mp3 from youtube! Save and download youtube videos without any software or app',
			description : 'Our free YouTube video downloader lets you save/download youtube videos on computer ,laptop and mobile without any software and app,the best way to download youtube videos in MP4 and MP3 at the best quality and high download speed.'
		}
	},
  debug: true,
  modules: ['@nuxtjs/pwa','@nuxtjs/axios'],
  buildModules: [['@nuxtjs/google-gtag',{
		id : 'UA-151979444-2',
		debug : true
	}]],
  plugins: [
    {
      src: '~/plugins/vuetify.js'
    },
    {
      src: '~/plugins/aos.js',
      mode: 'client'
    },
    {
      src: '~/plugins/vuemoment.js'
    },
    {
      src: '~/plugins/vueasynccomputed.js'
    }
  ],
  css: [
    {
      src: '~/assets/css/app.styl',
      lang: 'styl'
    }
  ],
  build: {
    publicPath: '/_nuxt/',
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    vendor: ["aos"],
    extractCSS: true,
    extend(config, ctx) {
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/,/^aos/],
          })
        ]
      }
      config.module.rules.push({
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'vue-beautify-loader',
        options: {
          jsBeautify: {
            'indent_scripts': 'keep',
            'indent_with_tabs': true
          }
        }
      });
    }
  },
  srcDir: 'client/',
  performance: {
    gzip: false
  },
  router: {
    base: '/'
  },
  dev: false
}
