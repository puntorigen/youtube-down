<template>
	<v-app class="white">
		<v-container fill-height>
			<v-layout row wrap align-center>
				<v-flex offset-sm3 xs12 sm6>
				</v-flex>
			</v-layout>
		</v-container>
	</v-app>
</template>

<script>
import _ from 'underscore'

export default {
	async mounted() {
		if (_.every('v'.split(','), _.partial(_.has, this.$route.query)) == true) {
			console.log('esta el param v', {});
			let pam = this.$route.query.v;
			this.$gtag('event', 'index con param', {
				'event_category': 'index'
			});
			this.$router.push({
				path: '/watch',
				query: {
					v: pam
				}
			})
		} else {
			this.$gtag('event', 'index', {
				'event_category': 'index'
			});
			this.$router.push('/watch')
		}
	}
}
</script>