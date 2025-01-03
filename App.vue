<!--本文件由FirstUI授权予薛*风（会员ID：   3811）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
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