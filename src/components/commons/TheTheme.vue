<template>
	<el-color-picker class="theme-picker" v-model="themeVal"></el-color-picker>
</template>

<script>
	import theme from "../../plugins/element-theme.js";
	export default {
		mixins: [theme()],	
	};
</script>

<style scoped lang="scss">
.theme-picker{
  vertical-align: middle;
	background-color: rgba(255, 255, 255, 0.7);
}
</style>