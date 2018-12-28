import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import myEnLocale from '../assets/lang/en'
import myZhLocale from '../assets/lang/zh-cn'

Vue.use(VueI18n)

const messages = {
  'en': Object.assign(myEnLocale, enLocale),
  'zh-cn': Object.assign(myZhLocale, zhLocale)
}

const lang = localStorage.getItem('system-language') || 'zh-cn'
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages, // set locale messages
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

export default i18n




	