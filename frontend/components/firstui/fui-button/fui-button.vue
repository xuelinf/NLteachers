<template>
	<!--本文件由FirstUI授权予薛*风（会员ID：3 8 1 1）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view class="fui-button__wrap"
		:class="[!width || width==='100%' || width===true?'fui-button__flex-1':'',disabled && !disabledBackground ? 'fui-button__opacity' : '']"
		:style="{width: width,height: getHeight,marginTop:margin[0] || 0,	marginRight:margin[1]||0,marginBottom:margin[2] || margin[0]||0,marginLeft:margin[3] || margin[1]||0,borderRadius: getRadius,background:getBackground}"
		@touchstart="handleStart" @touchend="handleClick" @touchcancel="handleEnd">
		<button class="fui-button" :class="[
				bold ? 'fui-text__bold' : '',
				time && (plain || type==='link') ? 'fui-button__opacity' : '',
				!background && !disabledBackground && !plain?('fui-button__'+type):'',
				!width || width==='100%' || width===true?'fui-button__flex-1':'',
				time && !plain && type!=='link' ? 'fui-button__active' : '',
				pc && !disabled?(plain || type==='link'?'fui-button__opacity-pc':'fui-button__active-pc'):'',

			]" :style="{
				width: width,
				height: getHeight,
				lineHeight: getHeight,
				background: disabled ? (disabledBackground || getTypeColor) : (plain ? 'transparent' : getBackground),
				borderWidth:!borderColor || !isNvue?'0':borderWidth,
				borderColor: borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (background || 'transparent'),
				borderRadius: getRadius,
				fontSize: getSize,
				color: getColor
			}" :loading="loading" :form-type="formType" :open-type="openType" @getuserinfo="bindgetuserinfo"
			@getphonenumber="bindgetphonenumber" @contact="bindcontact" @error="binderror"
			@opensetting="bindopensetting" :disabled="disabled" :scope="scope" @tap.stop="handleTap">
			<text class="fui-button__text"
				:class="{'fui-btn__gray-color':!background && !disabledBackground && !plain && type==='gray' && color==='#fff','fui-text__bold':bold}"
				v-if="text"
				:style="{fontSize: getSize,lineHeight:getSize,color:color? (disabled && disabledBackground ? disabledColor : color):(type==='gray'?'#465CFF':'#FFFFFF')}">{{text}}</text>
			<slot></slot>
		</button>
		<!-- #ifndef APP-NVUE -->
		<view v-if="borderColor" class="fui-button__thin-border"
			:class="[time && (plain || type==='link') && !disabled ? 'fui-button__opacity' : '',disabled && !disabledBackground ? 'fui-button__opacity' : '']"
			:style="{borderWidth:borderWidth,borderColor:borderColor ? borderColor : disabled && disabledBackground ? disabledBackground : (background || 'transparent'),borderRadius: getBorderRadius}">
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		name: 'fui-button',
		emits: ['click', 'getuserinfo', 'contact', 'getphonenumber', 'error', 'opensetting'],
		// #ifndef VUE3
		// #ifdef MP-WEIXIN
		behaviors: ['wx://form-field-button'],
		// #endif
		// #endif
		props: {
			//样式类型：primary，success， warning，danger，link，purple，gray
			type: {
				type: String,
				default: 'primary'
			},
			//按钮背景色，当传入值时type失效
			background: {
				type: String,
				default: ''
			},
			//按钮显示文本
			text: {
				type: String,
				default: ''
			},
			//按钮字体颜色
			color: {
				type: String,
				default: ''
			},
			//按钮禁用背景色
			disabledBackground: {
				type: String,
				default: ''
			},
			//按钮禁用字体颜色
			disabledColor: {
				type: String,
				default: ''
			},
			// #ifdef APP-NVUE
			borderWidth: {
				type: String,
				default: '0.5px'
			},
			// #endif
			// #ifndef APP-NVUE
			borderWidth: {
				type: String,
				default: '1px'
			},
			// #endif
			borderColor: {
				type: String,
				default: ''
			},
			//宽度
			width: {
				type: String,
				default: '100%'
			},
			//高度
			height: {
				type: String,
				default: ''
			},
			//字体大小，单位rpx
			size: {
				type: [Number, String],
				default: 0
			},
			bold: {
				type: Boolean,
				default: false
			},
			//['20rpx','30rpx','20rpx','30rpx']->[上，右，下，左]
			margin: {
				type: Array,
				default () {
					return ['0', '0']
				}
			},
			//圆角
			radius: {
				type: String,
				default: ''
			},
			plain: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			formType: {
				type: String,
				default: ''
			},
			openType: {
				type: String,
				default: ''
			},
			//支付宝小程序
			//当 open-type 为 getAuthorize 时，可以设置 scope 为：phoneNumber、userInfo
			scope: {
				type: String,
				default: ''
			},
			index: {
				type: [Number, String],
				default: 0
			}
		},
		computed: {
			getTypeColor() {
				// #ifndef APP-NVUE
				return '';
				// #endif
				let colors = {
					primary: '#246BFD',
					success: '#09BE4F',
					warning: '#FFB703',
					danger: '#FF2B2B',
					link: 'transparent',
					purple: '#6831FF',
					gray: '#F8F8F8'
				}
				return colors[this.type] || 'transparent'
			},
			getBackground() {
				let color = this.getTypeColor
				if (this.disabled || this.plain) {
					color = 'transparent';
				}
				if (!this.disabled && !this.plain && this.background) {
					color = this.background
				}
				return color
			},
			getColor() {
				let color = '#fff'
				if (this.color) {
					color = this.disabled && this.disabledBackground ? this.disabledColor : this.color
				} else {
					if (this.disabled && this.disabledBackground) {
						color = this.disabledColor || '#FFFFFF'
					} else {
						color = this.type === 'gray' ? '#465CFF' : '#FFFFFF'
					}
				}
				return color;
			},
			getSize() {
				const size = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.size) || 32
				return `${this.size || size}rpx`
			},
			getHeight() {
				const height = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.height) || '96rpx'
				return this.height || height
			},
			// #ifndef APP-NVUE
			getBorderRadius() {
				let radius = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.radius) || '16rpx'
				radius = this.radius || radius || '0'
				if (~radius.indexOf('rpx')) {
					radius = (Number(radius.replace('rpx', '')) * 2) + 'rpx'
				} else if (~radius.indexOf('px')) {
					radius = (Number(radius.replace('px', '')) * 2) + 'px'
				} else if (~radius.indexOf('%')) {
					radius = (Number(radius.replace('%', '')) * 2) + '%'
				}
				return radius
			},
			// #endif
			getRadius() {
				const radius = (uni && uni.$fui && uni.$fui.fuiButton && uni.$fui.fuiButton.radius) || '16rpx'
				return this.radius || radius
			}
		},
		data() {
			let isNvue = false
			// #ifdef APP-NVUE
			isNvue = true
			// #endif
			return {
				isNvue: isNvue,
				time: 0,
				trigger: false,
				pc: false
			};
		},
		created() {
			// #ifdef H5
			this.pc = this.isPC()
			// #endif
		},
		methods: {
			handleStart(e) {
				// #ifndef APP-NVUE
				if (this.disabled) return;
				this.trigger = false;
				if (new Date().getTime() - this.time <= 150) return;
				this.trigger = true;
				this.time = new Date().getTime();
				// #endif
			},
			handleClick() {
				if (this.disabled || !this.trigger) return;
				this.time = 0;
			},
			// #ifdef H5
			isPC() {
				if (typeof navigator !== 'object') return false;
				var userAgentInfo = navigator.userAgent;
				var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
				var flag = true;
				for (var v = 0; v < Agents.length - 1; v++) {
					if (userAgentInfo.indexOf(Agents[v]) > 0) {
						flag = false;
						break;
					}
				}
				return flag;
			},
			// #endif
			handleTap() {
				if (this.disabled) return;
				this.$emit('click', {
					index: Number(this.index)
				});
			},
			handleEnd(e) {
				// #ifndef APP-NVUE
				if (this.disabled) return;
				setTimeout(() => {
					this.time = 0;
				}, 150);
				// #endif
			},
			bindgetuserinfo({
				detail = {}
			} = {}) {
				this.$emit('getuserinfo', detail);
			},
			bindcontact({
				detail = {}
			} = {}) {
				this.$emit('contact', detail);
			},
			bindgetphonenumber({
				detail = {}
			} = {}) {
				this.$emit('getphonenumber', detail);
			},
			binderror({
				detail = {}
			} = {}) {
				this.$emit('error', detail);
			},
			bindopensetting({
				detail = {}
			} = {}) {
				this.$emit('opensetting', detail);
			}
		}
	};
</script>

<style scoped>
	.fui-button__wrap {
		position: relative;
		/* #ifndef APP-NVUE */
		background: transparent !important;
		flex-direction: row;
		/* #endif */
	}

	.fui-button {
		border-width: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		/* #endif */
		border-style: solid;
		position: relative;
		padding-left: 0;
		padding-right: 0;
		/* #ifndef APP-NVUE */
		overflow: hidden;
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		user-select: none;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	.fui-button__thin-border {
		position: absolute;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5) translateZ(0);
		box-sizing: border-box;
		left: 0;
		top: 0;
		border-radius: 32rpx;
		border-style: solid;
		pointer-events: none;
	}

	/* #endif */

	.fui-button__flex-1 {
		flex: 1;
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
	}

	.fui-button::after {
		border: 0;
	}

	/* #ifdef H5 */
	.fui-button__active-pc {
		position: relative;
	}

	.fui-button__opacity-pc:active {
		opacity: 0.5;
	}

	.fui-button__active-pc:active::after {
		content: ' ';
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2));
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		transform: none;
		z-index: 2;
		border-radius: 0;
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	.fui-button__active {
		overflow: hidden !important;
	}

	.fui-button__active::after {
		content: ' ';
		background-color: var(--fui-bg-color-hover, rgba(0, 0, 0, 0.2));
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		transform: none;
		z-index: 2;
		border-radius: 0;
	}

	/* #endif */
	.fui-button__text {
		text-align: center;
		flex-direction: row;
		align-items: center;
		justify-content: center !important;
		padding-left: 0 !important;
	}

	.fui-button__opacity {
		opacity: 0.5;
	}

	.fui-text__bold {
		font-weight: bold;
	}

	.fui-button__link {
		border-color: transparent !important;
		background-color: transparent !important;
	}

	/* #ifndef APP-NVUE */
	.fui-button__primary {
		border-color: var(--fui-color-primary, #246BFD) !important;
		background: var(--fui-color-primary, #246BFD) !important;
	}


	.fui-button__success {
		border-color: var(--fui-color-success, #09BE4F) !important;
		background: var(--fui-color-success, #09BE4F) !important;
	}

	.fui-button__warning {
		border-color: var(--fui-color-warning, #FFB703) !important;
		background: var(--fui-color-warning, #FFB703) !important;
	}

	.fui-button__danger {
		border-color: var(--fui-color-danger, #FF2B2B) !important;
		background: var(--fui-color-danger, #FF2B2B) !important;
	}

	.fui-button__purple {
		border-color: var(--fui-color-purple, #6831FF) !important;
		background: var(--fui-color-purple, #6831FF) !important;
	}

	.fui-button__gray {
		border-color: var(--fui-bg-color-content, #F8F8F8) !important;
		background: var(--fui-bg-color-content, #F8F8F8) !important;
		color: var(--fui-color-primary, #246BFD) !important;
	}

	.fui-btn__gray-color {
		color: var(--fui-color-primary, #246BFD) !important;
	}

	/* #endif */
</style>