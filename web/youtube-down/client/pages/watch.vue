<template>
	<v-app class="white">
		<v-container>
			<div class="text-xs-center">
				<center>
					<v-img :src="require('~/assets/logo_sobre_blanco.png')" data-aos-duration="700" :height="ui.logo.height" :width="ui.logo.width" data-aos="fade-up" alt="" />
					<br>
					</br>
					<v-card pt-4 flat>
						<v-text-field v-model="youtube_userlink" label="paste your link here">
						</v-text-field>
						<v-layout v-if="youtube_foto!='vacio'" row>
							<v-flex sm10 md10 lg10 xs10>
								<v-select v-model="format" item-value="value" item-text="name" color="red" :items="format_list" type="select" no-data-text="Video">
								</v-select>
							</v-flex>
							<v-flex pt-2>
								<v-btn v-on:click="click_ID_1980881427($event)" :loading="ui.download_progress" color="blue accent-3" dark>Download
								</v-btn>
							</v-flex>
						</v-layout>
					</v-card>
					<v-card v-if="youtube_foto!='vacio'" data-aos-duration="600" data-aos="fade-left" min-width="200" class="elevation-4" max-width="800">
						<v-img :src="youtube_foto" alt="" min-width="200" aspect-ratio="2.75" gradient="to top right, rgba(5,5,5,.1), rgba(25,32,72,.3)" max-width="800" />
						<v-card-title>
							<div class="font-weight-bold title text-xs-left">{{ youtube_info.titulo }}</div>
						</v-card-title>
						<v-card-text>
							<div class="caption text-xs-left">{{ youtube_info.descripcion }}</div>
						</v-card-text>
						<v-card-actions>
							<v-spacer />
							<div class="font-weight-bold">{{ youtube_info.segundos }} secs</div>
						</v-card-actions>
					</v-card>
				</center>
			</div>
		</v-container>
	</v-app>
</template>

<script>
import _ from 'underscore'

export default {
	head() {
		return {
			titleTemplate: 'Youtube-down.com - Download any video/mp3 from youtube! Save and download youtube videos without any software or app'
		};
	},
	data() {
		return {
			youtube_userlink: '',
			ui: {
				logo: {
					height: 120,
					width: 250
				},
				download_progress: false
			},
			video_id: '',
			youtube_info: {
				titulo: '',
				descripcion: '',
				segundos: 0
			},
			format: 'mp4'
		};
	},
	async mounted() {
		if (_.every('v'.split(','), _.partial(_.has, this.$route.query)) == true) {
			console.log('esta el param v', {});
			console.log('data dice', {
				"data": this.$route.params
			});
			this.video_id = this.$route.query.v;
			this.youtube_userlink = 'https://www.youtube.com/watch?v=' + this.video_id;
			this.$gtag('event', 'watch directo con video', {
				'event_category': 'watch'
			});
		} else {
			this.$gtag('event', 'watch simple', {
				'event_category': 'watch'
			});
		}
	},
	asyncComputed: {
		youtube_foto: {
			async get() {
				if ((_.isObject(this.video_id) || (_.isString(this.video_id)) && !_.isEmpty(this.video_id)) || _.isNumber(this.video_id) || _.isBoolean(this.video_id)) {
					this.$gtag('event', 'obteniendo foto e info', {
						'event_category': 'watch'
					});
					const lista_ = await this.$axios.post(process.env.urls.info, {
						url: this.youtube_userlink
					}, {
						progress: false
					});
					const lista = lista_.data;
					console.log('info video dice', {
						"data": lista.data
					});
					let resp = lista.data.thumbnail.thumbnails[lista.data.thumbnail.thumbnails.length - 1].url;
					this.youtube_info.titulo = lista.data.title;
					this.youtube_info.descripcion = lista.data.shortDescription;
					this.youtube_info.segundos = lista.data.lengthSeconds;
					this.ui.logo.width = 125;
					this.ui.logo.height = 60;
					return resp;
				} else {
					this.$gtag('event', 'busqueda vaciada', {
						'event_category': 'watch'
					});
					return 'vacio';
				}
			},
			default: 'vacio',
			watch: ['youtube_userlink']
		},
		format_list: {
			async get() {
				let test = parseInt(this.youtube_info.segundos);
				if (_.isNumber(test) && _.isNumber(300) && test > 300) {
					let format = [{
						name: 'Video',
						value: 'mp4'
					}];
					this.$gtag('event', 'duracion muy larga (5min+), solo permite descargar video', {
						'event_category': 'watch'
					});
					return format;
				} else {
					let format = [{
							name: 'Video',
							value: 'mp4'
						},
						{
							name: 'MP3',
							value: 'mp3'
						}
					];
					return format;
				}
			},
			default: [],
			watch: ['youtube_info.segundos']
		}
	},
	watch: {
		'youtube_userlink': function(newVal, oldVal) {
			let evento = {
				new: newVal,
				old: oldVal
			}
			if ((_.isObject(this.youtube_userlink) || (_.isString(this.youtube_userlink)) && !_.isEmpty(this.youtube_userlink)) || _.isNumber(this.youtube_userlink) || _.isBoolean(this.youtube_userlink)) {
				let dameID = require('get-youtube-id');
				this.video_id = dameID(this.youtube_userlink);
				console.log('video id dice', {
					"data": this.video_id
				});
				this.$gtag('event', 'youtube link modificado', {
					'event_category': 'watch'
				});
			} else {
				this.ui.logo.width = 250;
				this.ui.logo.height = 120;
				this.youtube_foto = 'vacio';
				this.$gtag('event', 'youtube link vaciado', {
					'event_category': 'watch'
				});
			}
		}
	},
	methods: {
		click_ID_1980881427: async function(evento) {
			this.ui = _.extend(this.ui, {
				download_progress: true
			});
			let fileDownload = require('js-file-download');
			if (this.format == 'mp4') {
				this.$gtag('event', 'descargando video', {
					'event_category': 'watch'
				});
			} else {
				this.$gtag('event', 'descargando mp3', {
					'event_category': 'watch'
				});
			}
			const bajar_ = await this.$axios.request({
				url: process.env.urls.download,
				method: 'post',
				data: {
					url: this.youtube_userlink,
					format: this.format
				},
				timeout: 400000,
				responseType: 'blob',
				maxContentLength: 5000000
			}, {
				progress: true
			});
			const bajar = bajar_.data;
			this.ui = _.extend(this.ui, {
				download_progress: false
			});
			this.$gtag('event', 'descarga exitosa', {
				'event_category': 'watch'
			});
			fileDownload(bajar, this.youtube_info.titulo + '.' + this.format);
		}
	}

}
</script>