import axios from "axios";

const state = {
    category:[ ],
    item:[]
};
const getters ={
    allcategory : state =>state.category,
    allitem: state =>state.item
};
const actions ={
async getCategory({commit}){
    const response = await axios.get("http://localhost:3000/category")
    commit("getcategories",response.data)
},
async getItem({commit}){
    const response = await axios.get("http://localhost:3000/item")
    commit("getitem",response.data)
},
async setCategory({commit},category){
    const response = await axios.post("http://localhost:3000/category",category)
    commit("setcategories",response.data)
    // console.log(response,"dtaaaa")
},
async setItem({commit},item){
    const response = await axios.post("http://localhost:3000/item",item)
    commit("setcategories",response.data)
    // console.log(response,"dtaaaa item")
},
async deleteCategory({commit},id){
    await axios.delete(`http://localhost:3000/category/${id}`);
    commit("removecategory",id);
    // console.log(id,"id")

},
async deletItem({commit},id){
    await axios.delete(`http://localhost:3000/item/${id}`);
   
    commit("removeitem",id);
    
},
async editCategory({commit},category,id){
    const response =  await axios.put(`http://localhost:3000/category/${id}`,category);
    commit("editcategories",response.data)
    // console.log(response,"edit")
}
};
const mutations ={
    getcategories:(state,category) =>(state.category = category),
    setcategories:(state,category)=>(state.category.unshift(category)),
    getitem:(state,item) =>(state.item = item),
    setitem:(state,item)=>(state.item.unshift(item)),
    removecategory : (state,id) =>(state.category.filter(data=>data.id!==id)),
    removeitem : (state,id) =>(state.item.filter(data=>data.id!==id))
    ,editcategories : (state,category)=>(state.category = category)
}

export default{
    state,
    getters,
    actions,
    mutations
}