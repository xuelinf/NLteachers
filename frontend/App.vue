
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/fui-app.css';
	/* #ifndef APP-NVUE */
	@import './components/firstui/fui-theme/fui-theme.css';
	/* #endif */
</style>