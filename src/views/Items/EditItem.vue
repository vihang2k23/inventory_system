<template>
    <v-container fluid>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-form ref="form" @submit.prevent="updatedata(item.id)" v-model="valid" lazy-validation>
            <v-text-field
              v-model.lazy="item.itemname"
              :counter="10"
              :rules="nameRules"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model.lazy="item.itemcategory"
              :counter="10"
              :rules="categoryRules"
              label="Category"
              required
            ></v-text-field>
            <v-textarea
              v-model.lazy="item.itemdes"
              :counter="50"
              :rules="DescriptionRules"
              label="Description"
              required
            ></v-textarea>
            <v-text-field
              v-model.lazy="item.itemprice"
              :counter="10"
              :rules="PriceRules"
              label="ItemPrice"
              type="number"
              required
            ></v-text-field>
            <v-radio-group v-model.lazy="item.status" row >
              <v-radio label="Active" value="true"></v-radio>
              <v-radio label="InActive" value="false"></v-radio>
            </v-radio-group>
  
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              type="submit"
            >
              EditItem
            </v-btn>
  
          </v-form></v-col
        >

       
      </v-row>
    </v-container>
  </template>
        <script>
import axios from 'axios';
  export default {
    data: () => ({
      valid: true,
      item: [],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      categoryRules: [
        (v) => !!v || "Category is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      DescriptionRules: [
        (v) => !!v || "Description is required",
        (v) => (v && v.length <= 50) || "Description must be valid",
      ],
      PriceRules:[
      (v) => !!v || "Price is required",
        
      ]
      
    }),
//     filters:{
// currency : function(value){
//     return "$ " + parseFloat(value).toFixed(2);
// }
//     },
async mounted() {
    axios
      .get("http://localhost:3000/item/" + this.$route.params.id)
      .then((res) => {
        this.item = res.data;
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
    console.log(this.todata);
  },
  // Update Method
  methods: {
    async updatedata(id) {
        console.log(id);
      try {
      
        const user = await axios.put("http://localhost:3000/item/" + id, {
            itemname: this.item.itemname,
        itemcategory: this.item.itemcategory,
        itemdes:this.item.itemdes,
        status: this.item.status,
        itemprice:this.item.itemprice
         
        });
        console.log(user, "sucessss");
        this.$router.push("/allitem");
        this.alert("Data Update Successfully");
      } catch (e) {
        console.log(e);
      }
    },
    alert(data) {
      this.$swal(data);
    },
  },
  };
  </script>