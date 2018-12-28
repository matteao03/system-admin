<template>
	<el-container direction="vertical">
	  <the-header :collapse.sync="isCollapse"/>
	  <el-container>
			<the-sidebar :collapse="isCollapse" :style="asideStyle"/>
			<el-container direction="vertical">
				<tags-view></tags-view>
				<el-main>
					<transition name="fade" mode="out-in">
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</transition>
				</el-main>
				<the-footer />
			</el-container>
	  </el-container>
	</el-container>
</template>

<script>
	import TheHeader from './TheHeader'
	import TheSidebar from './TheSidebar'
	import TheFooter from './TheFooter'
	import TagsView from '../commons/TagsView'
	
	export default {
		data(){
			return{
				isCollapse:false,
			}
		},
		computed: {
			asideStyle: function () {
				return this.isCollapse ? {width:'60px'}:{width:'200px'}
			}
		},
		components:{
			'the-header': TheHeader,
			'the-sidebar': TheSidebar,
			'the-footer': TheFooter,
			'tags-view':TagsView
		}
	}
</script>

<style scoped lang="scss">
  .el-main {
    background-color: #E9EEF3;
    color: #333;
		height: calc(100vh - 130px);
  }
	
</style>