<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-form ref="form" @submit.prevent="onSubmit" v-model="valid" lazy-validation>
          <v-text-field
            v-model.lazy="category.categoryname"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-textarea
            v-model.lazy="category.categorydes"
            :counter="50"
            :rules="DescriptionRules"
            label="Description"
            required
          ></v-textarea>

          <v-radio-group v-model.lazy="category.status" row >
            <v-radio label="Active" value=true></v-radio>
            <v-radio label="Deactive" value=false></v-radio>
          </v-radio-group>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            type="submit"
          >
            AddCategory
          </v-btn>
          <router-link style="text-decoration: none;" to="/allcategories"><v-btn
            
            color="primary"
            class="mr-4"
      
          >
            All Categories
          </v-btn></router-link>
        </v-form></v-col
      >
     
    </v-row>
  </v-container>
</template>
      <script>
      import { mapActions } from 'vuex';
export default {
  data: () => ({
    valid: true,
    category: {
      categoryname: "",
      categorydes: "",
      status: null,
    },
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    DescriptionRules: [
      (v) => !!v || "Description is required",
      (v) => (v && v.length <= 50) || "Description must be valid",
    ],
    
  }),

  methods: {
    ...mapActions(["setCategory"]),
    onSubmit() {
      console.log(this.category.status,"status");
      this.$refs.form.validate();
      this.setCategory({
        categoryname:this.category.categoryname,
        categorydes:this.category.categorydes,
        status : this.category.status
      })
     
      this.category.categoryname = "",
      this.category.categorydes ="",
      this.category.status =""
      this.$refs.form.reset();
      this.$swal("Category Suceesfully Added")  
      this.$router.push("/allcategories");
    
    },
    
    
  },
  mounted(){
    console.log(this.category.status,"status");
  }
};
</script>