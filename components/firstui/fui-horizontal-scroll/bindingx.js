// 
// #ifdef APP-NVUE
const BindingX = uni.requireNativePlugin('bindingx');
export default {
	methods: {
		getEl(el) {
			return this.$refs[el] ? this.$refs[el].ref : null;
		},
		nvueScrollHandler(e) {
			const anchor = this.getEl('fui_scroller_view')
			const element = this.getEl('fui_hor_indicator')
			if (!anchor || !element) return;
			const scrollLeft = e.contentOffset.x
			const contentWidth = e.contentSize.width
			if (this.scroll && element) {
				const barAllMoveWidth = this.bgWidth - this.blockWidth
				const platform = uni.getSystemInfoSync().platform
				const actionNum = platform.toLowerCase() === 'ios' ? 2 : 1
				const expression = `(x / ${actionNum}) / ${contentWidth - this.width} * ${barAllMoveWidth}`
				BindingX.bind({
					anchor,
					eventType: 'scroll',
					props: [{
						element,
						property: 'transform.translateX',
						expression
					}]
				})
			}
			if (scrollLeft + this.width === contentWidth) {
				this.scrollEvent('right')
			} else if (scrollLeft === 0) {
				this.scrollEvent('left')
			}
		}
	}
}

// #endif

// #ifndef APP-NVUE
export default {}
// #endif