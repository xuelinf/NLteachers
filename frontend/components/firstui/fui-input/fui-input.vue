<template>
	<!--本文件由FirstUI授权予薛*风（会员ID：  38 11）专用，请尊重知识产权，勿私下传播，违者追究法律责任。-->
	<view :class="{'fui-input__border':inputBorder,'fui-radius__fillet':isFillet}" :style="getStyles" @tap="fieldClick">
		<view class="fui-input__wrap"
			:class="{'fui-radius__fillet':isFillet,'fui-input__border-radius':inputBorder && !isFillet}"
			:style="{paddingTop:padding[0] || 0,paddingRight:padding[1] || 0,paddingBottom:padding[2] || padding[0] || 0,paddingLeft:padding[3] || padding[1] || 0,backgroundColor:backgroundColor}">
			<view v-if="borderTop && !inputBorder"
				:style="{background:borderColor,left:topLeft+'rpx',right:topRight+'rpx'}" class="fui-input__border-top">
			</view>
			<!-- #ifdef APP-NVUE -->
			<view class="fui-input__required" v-if="required">
				<text :style="{color:requiredColor}">*</text>
			</view>
			<!-- #endif -->
			<!-- #ifndef APP-NVUE -->
			<view class="fui-input__required" :style="{color:requiredColor}" v-if="required">*</view>
			<!-- #endif -->
			<view class="fui-input__label" :style="{minWidth:labelWidth+'rpx'}" v-if="label">
				<text :style="{fontSize:getLabelSize,color:labelColor}">{{label}}</text>
			</view>
			<slot name="left"></slot>
			<!-- 小程序不支持v-bind="{'password':password}" -->
			<!-- #ifdef APP-PLUS || H5 -->
			<input v-bind="attribute" class="fui-input__self" :class="{'fui-input__text-right':textRight}"
				:style="{fontSize:getSize,color:color}" placeholder-class="fui-input__placeholder" :type="type"
				:name="name" :value="val" :placeholder="placeholder" :placeholder-style="placeholderStyl"
				:disabled="disabled || readonly" :cursor-spacing="cursorSpacing" :maxlength="maxlength" :focus="focused"
				:confirm-type="confirmType" :confirm-hold="confirmHold" :cursor="cursor"
				:selection-start="selectionStart" :selection-end="selectionEnd" :adjust-position="adjustPosition"
				:hold-keyboard="holdKeyboard" :auto-blur="autoBlur" :enableNative="false" :always-embed="alwaysEmbed"
				@focus="onFocus" @blur="onBlur" @input="onInput" @confirm="onConfirm"
				@keyboardheightchange="onKeyboardheightchange" />
			<!-- #endif -->

			<!-- #ifndef APP-PLUS || H5 -->
			<input class="fui-input__self" :class="{'fui-input__text-right':textRight}"
				:style="{fontSize:getSize,color:color}" placeholder-class="fui-input__placeholder" :type="type"
				:name="name" :value="val" :placeholder="placeholder" :password="password"
				:placeholder-style="placeholderStyl" :disabled="disabled || readonly" :cursor-spacing="cursorSpacing"
				:maxlength="maxlength" :focus="focused" :confirm-type="confirmType" :confirm-hold="confirmHold"
				:cursor="cursor" :selection-start="selectionStart" :selection-end="selectionEnd"
				:adjust-position="adjustPosition" :hold-keyboard="holdKeyboard" :auto-blur="autoBlur"
				:enableNative="false" :always-embed="alwaysEmbed" @focus="onFocus" @blur="onBlur" @input="onInput"
				@confirm="onConfirm" @keyboardheightchange="onKeyboardheightchange" />
			<!-- #endif -->
			<view class="fui-input__clear-wrap" :style="{background:clearColor}" v-if="clearable && val != ''"
				@tap.stop="onClear">
				<view class="fui-input__clear">
					<view class="fui-input__clear-a"></view>
				</view>
				<view class="fui-input__clear">
					<view class="fui-input__clear-b"></view>
				</view>
			</view>
			<slot></slot>
			<view v-if="borderBottom  && !inputBorder"
				:style="{background:borderColor,left:bottomLeft+'rpx',right:bottomRight+'rpx'}"
				class="fui-input__border-bottom"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fui-input",
		emits: ['input', 'update:modelValue', 'focus', 'blur', 'confirm', 'click', 'keyboardheightchange'],
		// #ifndef VUE3
		// #ifdef MP-WEIXIN
		//加group是为了避免在表单中使用时给组件加value属性
		behaviors: ['wx://form-field-group'],
		// #endif
		// #ifdef MP-BAIDU || MP-QQ
		//如果在这些平台不需要也能识别，则删除
		behaviors: ['uni://form-field'],
		// #endif
		// #endif
		// #ifdef MP-WEIXIN
		options: {
			addGlobalClass: true,
			virtualHost: true
		},
		// #endif
		props: {
			//是否为必填项
			required: {
				type: Boolean,
				default: false
			},
			requiredColor: {
				type: String,
				default: '#FF2B2B'
			},
			//左侧标题
			label: {
				type: String,
				default: ''
			},
			//标题字体大小
			labelSize: {
				type: [Number, String],
				default: 0
			},
			labelColor: {
				type: String,
				default: '#333'
			},
			//label 最小宽度 rpx
			labelWidth: {
				type: [Number, String],
				default: 140
			},
			clearable: {
				type: Boolean,
				default: false
			},
			clearColor: {
				type: String,
				default: '#CCCCCC'
			},
			//获取焦点
			focus: {
				type: Boolean,
				default: false
			},
			placeholder: {
				type: String,
				default: ''
			},
			placeholderStyle: {
				type: String,
				default: ''
			},
			//输入框名称
			name: {
				type: String,
				default: ''
			},
			//输入框值 vue2
			value: {
				type: [Number, String],
				default: ''
			},
			// #ifdef VUE3
			//输入框值
			modelValue: {
				type: [Number, String],
				default: ''
			},
			// #endif
			//vue3
			modelModifiers: {
				default: () => ({})
			},
			//兼容写法，type为text时也做Number处理，NaN时返回原值
			number: {
				type: Boolean,
				default: false
			},
			//与官方input type属性一致
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			readonly:{
				type: Boolean,
				default: false
			},
			maxlength: {
				type: [Number, String],
				default: 140
			},
			min: {
				type: [Number, String],
				default: 'NaN'
			},
			max: {
				type: [Number, String],
				default: 'NaN'
			},
			cursorSpacing: {
				type: Number,
				default: 0,
			},
			confirmType: {
				type: String,
				default: 'done'
			},
			confirmHold: {
				type: Boolean,
				default: false,
			},
			cursor: {
				type: Number,
				default: -1
			},
			selectionStart: {
				type: Number,
				default: -1
			},
			selectionEnd: {
				type: Number,
				default: -1
			},
			adjustPosition: {
				type: Boolean,
				default: true
			},
			holdKeyboard: {
				type: Boolean,
				default: false
			},
			autoBlur: {
				type: Boolean,
				default: false
			},
			alwaysEmbed: {
				type: Boolean,
				default: false
			},
			size: {
				type: [Number, String],
				default: 0
			},
			color: {
				type: String,
				default: '#333'
			},
			inputBorder: {
				type: Boolean,
				default: false
			},
			isFillet: {
				type: Boolean,
				default: false
			},
			radius: {
				type: [Number, String],
				default: -1
			},
			borderTop: {
				type: Boolean,
				default: false
			},
			topLeft: {
				type: [Number, String],
				default: 0
			},
			topRight: {
				type: [Number, String],
				default: 0
			},
			borderBottom: {
				type: Boolean,
				default: true
			},
			bottomLeft: {
				type: [Number, String],
				default: 32
			},
			bottomRight: {
				type: [Number, String],
				default: 0
			},
			borderColor: {
				type: String,
				default: '#EEEEEE'
			},
			trim: {
				type: Boolean,
				default: true
			},
			textRight: {
				type: Boolean,
				default: false
			},
			padding: {
				type: Array,
				default () {
					return ['28rpx', '32rpx']
				}
			},
			backgroundColor: {
				type: String,
				default: '#FFFFFF'
			},
			marginTop: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				placeholderStyl: '',
				focused: false,
				val: '',
				attribute: {}
			}
		},
		computed: {
			getStyles() {
				let styles = `margin-top:${this.marginTop}rpx;`

				// #ifdef APP-NVUE
				if (this.inputBorder) {
					styles += `border-color:${this.borderColor};`
				}
				// #endif

				if (!this.inputBorder && !this.borderTop && !this.borderBottom && this.radius != -1) {
					styles += `border-radius:${this.radius}rpx;overflow:hidden;`
				}
				return styles
			},
			getSize() {
				const size = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.size) || 32
				return `${this.size || size}rpx`
			},
			getLabelSize() {
				const labelSize = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.labelSize) || 32
				return `${this.labelSize || labelSize}rpx`
			}
		},
		watch: {
			focus(val) {
				this.$nextTick(() => {
					this.focused = val
				})
			},
			placeholderStyle() {
				this.fieldPlaceholderStyle()
			},
			// #ifdef VUE3
			modelValue(newVal) {
				this.val = newVal
			},
			// #endif
			value(newVal) {
				this.val = newVal
			},
			password:{
				handler(val){
					if (val) {
						this.attribute = {
							password: true
						}
					} else {
						this.attribute = {}
					}
				},
				immediate:true
			}
		},
		created() {
			// #ifndef VUE3
			this.val = this.value
			// #endif

			// #ifdef VUE3
			if (this.value && !this.modelValue) {
				this.val = this.value
			} else {
				this.val = this.modelValue
			}
			// #endif

			this.fieldPlaceholderStyle()
		},
		mounted() {
			this.$nextTick(() => {
				// #ifdef MP-TOUTIAO
				setTimeout(() => {
					this.focused = this.focus
				}, 300)
				// #endif
				// #ifndef MP-TOUTIAO
				setTimeout(() => {
					this.focused = this.focus
				}, 120)
				// #endif
			})
		},
		methods: {
			fieldPlaceholderStyle() {
				if (this.placeholderStyle) {
					this.placeholderStyl = this.placeholderStyle
				} else {
					const _size = (uni.$fui && uni.$fui.fuiInput && uni.$fui.fuiInput.size) || 32
					const size = uni.upx2px(this.size || _size)
					this.placeholderStyl = `font-size:${size}px`
				}
			},
			onInput(event) {
				let value = event.detail.value;
				if (this.trim) value = this.trimStr(value);
				this.val = value;
				if (this.modelModifiers.number || this.number || this.type === 'digit' || this.type === 'number') {
					const currentVal = Number(value)
					let eVal = this.type === 'digit' ? value : currentVal
					if (typeof currentVal === 'number') {
						const min = Number(this.min)
						const max = Number(this.max)
						if (typeof min === 'number' && currentVal < min) {
							eVal = min
						} else if (typeof max === 'number' && max < currentVal) {
							eVal = max
						}
					}
					value = isNaN(eVal) ? value : eVal
				}
				this.$nextTick(() => {
					//当输入框为空时，输入框显示不赋值为0
					event.detail.value !== '' && (this.val = value);
				})
				//如果为空时返回0 ，当双向绑定会将输入框赋值0
				const inputValue = event.detail.value !== '' ? value : ''
				// TODO　兼容　vue2
				this.$emit('input', inputValue);
				// TODO　兼容　vue3
				// #ifdef VUE3
				this.$emit('update:modelValue', inputValue)
				// #endif
			},
			onFocus(event) {
				this.$emit('focus', event);
			},
			onBlur(event) {
				this.$emit('blur', event);
			},
			onConfirm(e) {
				this.$emit('confirm', e);
			},
			onClear(event) {
				if (this.disabled && !this.readonly) return;
				uni.hideKeyboard()
				this.val = '';
				this.$emit('input', '');
				// #ifdef VUE3
				this.$emit('update:modelValue', '')
				// #endif
			},
			fieldClick() {
				this.$emit('click', {
					name: this.name
				});
			},
			onKeyboardheightchange(e) {
				this.$emit('keyboardheightchange', e.detail)
			},
			trimStr(str) {
				return str.replace(/^\s+|\s+$/g, '');
			}
		}
	}
</script>

<style scoped>
	.fui-input__wrap {
		/* #ifndef APP-NVUE */
		width: 100%;
		box-sizing: border-box;
		display: flex;
		/* #endif */
		flex-direction: row;
		flex: 1;
		align-items: center;
		position: relative;
		border-radius: 24rpx;
	}

	.fui-input__border-top {
		position: absolute;
		top: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */

		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		transform-origin: 0 0;
		z-index: 1;
		/* #endif */
	}

	.fui-input__border-bottom {
		position: absolute;
		bottom: 0;
		/* #ifdef APP-NVUE */
		height: 0.5px;
		z-index: -1;
		/* #endif */
		/* #ifndef APP-NVUE */
		height: 1px;
		-webkit-transform: scaleY(0.5) translateZ(0);
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 100%;
		z-index: 1;
		/* #endif */
	}


	.fui-input__required {
		position: absolute;
		left: 12rpx;
		/* #ifndef APP-NVUE */
		height: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		line-height: 1.15;
		/* #endif */

		/* #ifdef APP-NVUE */
		flex: 1;
		align-items: center;
		justify-content: center;
		line-height: 1;
		/* #endif */
	}


	.fui-input__label {
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		flex-shrink: 0;
		/* #endif */
	}

	.fui-input__self {
		flex: 1;
		padding-right: 12rpx;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		overflow: visible;
		/* #endif */
		background-color: transparent;
	}

	.fui-input__clear-wrap {
		width: 32rpx;
		height: 32rpx;
		transform: rotate(45deg) scale(1.1);
		position: relative;
		/* #ifndef APP-NVUE */
		border-radius: 50%;
		flex-shrink: 0;
		/* #endif */

		/* #ifdef APP-NVUE */
		border-radius: 32rpx;
		/* #endif */

		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */

	}

	.fui-input__clear {
		width: 32rpx;
		height: 32rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		transform: scale(0.5) translateZ(0);
	}

	.fui-input__clear-a {
		width: 32rpx;
		border: 2rpx solid #fff;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-input__clear-b {
		height: 32rpx;
		border: 2rpx solid #fff;
		background-color: #fff;
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
	}

	.fui-input__placeholder {
		/* #ifndef APP-NVUE */
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
		/* #endif */
		/* #ifdef APP-NVUE */
		color: #ccc;
		font-size: 32rpx;
		/* #endif */
	}

	/* #ifdef MP */
	::v-deep .fui-input__placeholder {
		color: var(--fui-color-minor, #ccc);
		overflow: visible;
	}

	/* #endif */

	.fui-input__border {
		border-radius: 8rpx;
		position: relative;
		/* #ifdef APP-NVUE */
		border-style: solid;
		border-width: 0.5px;
		/* #endif */
		/* #ifndef APP-NVUE */
		border-width: 0;
		/* #endif */
	}

	.fui-input__border-radius {
		border-radius: 8rpx;
	}

	/* #ifndef APP-NVUE */
	.fui-input__border::after {
		content: ' ';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1px solid var(--fui-color-border, #EEEEEE);
		transform-origin: 0 0;
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 16rpx;
		pointer-events: none;
	}

	.fui-radius__fillet::after {
		border-radius: 200px !important;
	}

	/* #endif */
	.fui-radius__fillet {
		border-radius: 100px !important;
	}

	.fui-input__text-right {
		text-align: right;
	}
</style>