<template>
	<el-header class="header theme-bg-blue">
		<router-link to="/home" class="banner-left banner-item " :class="{'only-logo': collapse}">
			<img src="../../assets/image/logo.png" class="logo"/>
			<span class="logo-name">{{$t('logo.name')}}</span>
		</router-link>
		<div class="banner-center banner-item">
			<i class="el-icon-d-arrow-left" v-show="!collapse" @click="navOpenToggle"></i>
			<i class="el-icon-d-arrow-right" v-show="collapse" @click="navOpenToggle"></i>
		</div>
		<div class="banner-right banner-item">
			<div class="banner-right-item">
				{{$t('header.themeChange')}}
				<the-theme />
			</div>
			<div class="banner-right-item" @click="clickLanguage">
				<el-dropdown trigger="click" class="right-item-dropdown" @command="changeLanguage">
				  <p class="el-dropdown-link">
						{{$t('header.languageSelect')}}
						<i class="el-icon-arrow-down el-icon--right drop-icon" id="langDropIcon"></i>
				  </p>
				  <el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="zh-cn" :disabled="this.$i18n.locale === 'zh-cn'">{{$t('header.langZh')}}</el-dropdown-item>
					<el-dropdown-item command="en" :disabled="this.$i18n.locale === 'en'">{{$t('header.langEn')}}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			<div class="banner-right-item">
				<el-dropdown trigger="click" class="right-item-dropdown"  @command="setAuth">
					<p class="el-dropdown-link">
						{{$store.state.auth.auth}}<i class="el-icon-setting el-icon--right"></i>
					</p>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="changePassword">{{$t('header.modifyPass')}}</el-dropdown-item>
						<el-dropdown-item command="logout">{{$t('header.logout')}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</el-header>
</template>

<script>
import TheTheme from "../commons/TheTheme";
	
export default {
	data(){
		return {
			langDrop:false
		}
	},
	props:{
		collapse: Boolean,
	},
	methods:{
		navOpenToggle(){
			this.$emit('update:collapse', !this.collapse)
		},
		changeLanguage(language){
			localStorage.setItem('system-language', language)
			this.$i18n.locale = language
		},
		clickLanguage(){
			let langDropIcon = document.getElementById("langDropIcon")
			if (this.langDrop){
				langDropIcon.style.transform = 'rotate(0deg)'
			} else {
				langDropIcon.style.transform = 'rotate(-180deg)'
			}
			this.langDrop = !this.langDrop
		},
		setAuth(type){
			if (type === 'logout'){
				this.$store.dispatch('logout')
			} else if (type === 'changePassword'){
				this.$router.push('/settings/password')
			}
		}
	},
	components:{
		'the-theme': TheTheme,
	}
}
</script>

<style scoped lang="scss">
.header{
	color: #fff;
	line-height: 60px;
	user-select: none;
	
	.banner-item{
		display:inline-block;
	}
	.banner-left{
		width:200px;
		text-align: center;
		margin-left:-20px;
		border-right:1px solid #e6e6e6;
		box-sizing: border-box;
		
		.logo-name{
			padding-left:10px;
			font-size:20px;
		}
	}
	.only-logo{
		width:60px;
		.logo-name{
			display:none;
		}
	}
	.banner-center{
		padding-left:20px;
	}
	.banner-right{
		float:right;
		
		.banner-right-item{
			display:inline-block;
			padding:0 15px;
			font-size:14px;
			cursor:pointer;
			
			.right-item-dropdown{
				color:#fff;
				outline:none;
			}
			
			.drop-icon {
				transition: transform 0.2s;
			}
		}
	}
	.logo{
		width:40px;
		vertical-align: middle;
	}
}
	
</style>