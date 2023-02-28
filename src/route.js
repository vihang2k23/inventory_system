import Vue from 'vue'
import Router from "vue-router"
import Home from "../src/views/HomeView.vue"
import AddCategory from "../src/views/Categories/AddCategory.vue"
import AllCategories from "../src/views/Categories/AllCategories.vue"
import EditCategories from "../src/views/Categories/EditCategories.vue"
import AddItem from "../src/views/Items/AddNewItem.vue"
import AllItem from "../src/views/Items/AllItem.vue"
import EditItem from "./views/Items/EditItem.vue"
Vue.use(Router)

export default new Router({
    mode :'history',
    routes:[
        {
            path:'/',
            name:'home',
            component:Home
        },
        {
            path:'/addcategory',
            name:'addcategory',
            component:AddCategory
            
        },   {
            path:'/editcategory/:id',
            name:'editcategory',
            component:EditCategories
        },   {
            path:'/allcategories',
            name:'allcategories',
            component:AllCategories
        },
        {
            path:'/addnewitem',
            name:'addnewitem',
         component:AddItem   
        },
        {
            path:'/allitem',
            name:'allitem',
            component:AllItem
        },
        {
            path:'/edititem/:id',
            name:'edititem',
            component:EditItem
        },
        

    ]
    
})