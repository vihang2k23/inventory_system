<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <!-- Form to Add Category -->
        <v-form
          ref="form"
          @submit.prevent="updatedata(category.id)"
          v-model="valid"
          lazy-validation
        >
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

          <v-radio-group v-model="category.status" row>
            <v-radio label="Active" value="true"></v-radio>
            <v-radio label="Deactive" value="false"></v-radio>
          </v-radio-group>

          <v-btn :disabled="!valid" color="success" class="mr-4" type="submit">
            EditCategory
          </v-btn>
          <router-link style="text-decoration: none" to="/allcategories"
            ><v-btn color="primary" class="mr-4">
              All Categories
            </v-btn></router-link
          >
        </v-form></v-col
      >
    </v-row>
  </v-container>
</template>
        <script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    category: [],
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    DescriptionRules: [
      (v) => !!v || "Description is required",
      (v) => (v && v.length <= 50) || "Description must be valid",
    ],
  }),

  // To get Items
  async mounted() {
    axios
      .get("http://localhost:3000/category/" + this.$route.params.id)
      .then((res) => {
        this.category = res.data;
        console.log(this.category);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  // Update Method
  methods: {
    async updatedata(id) {
      console.log(this.category.status);
      try {
        const user = await axios.put(`http://localhost:3000/category/${id}`, {
          categoryname: this.category.categoryname,
          categorydes: this.category.categorydes,
          status: this.category.status,
        });
        console.log(user, "sucessss");

        this.$router.push("/allcategories");
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