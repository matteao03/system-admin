<template>
	<el-aside>
		<el-menu class="sj-sidebar-menu" router :collapse-transition="false" unique-opened 
							:default-active="$route.path" :collapse="collapse">
			<template v-for="(level1, index1) in $router.options.routes">
				<template v-for="(level2, index2) in level1.children">
					<el-submenu v-if="level2.children" :index="`/${level2.path}`" :key="index1+'-'+index2">
						<template slot="title">
							<i :class="level2.meta.icon"></i>
							<span slot="title">{{$t(level2.meta.menuName)}}</span>
						</template>
						<el-menu-item v-for="(level3, index3) in level2.children" :index="`/${level2.path}/${level3.path}`" :key="index1+'-'+index2+'-'+index3">
							{{$t(level3.meta.menuName)}}
						</el-menu-item>
					</el-submenu>
					<el-menu-item v-else :index="`/${level2.path}`" :key="index1+'-'+index2">
						<i :class="level2.meta.icon"></i>
						<span slot="title">{{$t(level2.meta.menuName)}}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</el-aside>
</template>

<script>
	export default {
		props:{
			collapse: Boolean,
		},
	}
</script>

<style scoped lang="scss">
 .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
		
		.sj-sidebar-menu{
			height:100%;
		}
  }	
	
</style>