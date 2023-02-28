
<template v-for="data in allcategory " :key="data.id">
  <v-container fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-main>
          <router-link style="text-decoration: none" to="/addcategory"
            ><v-btn color="primary" class="mx-4">
              Add Categories
            </v-btn></router-link
          >

          <!-- <router-link style="text-decoration: none" to="/allitem"
            ><v-btn color="success" class="mr-4">
              All items
            </v-btn></router-link
          > -->
          <router-link style="text-decoration: none" to="/"
            ><v-btn color="warning" class="mr-4 dark">
              Home
            </v-btn></router-link
          ></v-main
        >
        <!-- Searchbar for Searching Category based on Categories name  -->
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
 <!-- Data table for display all Categories details -->
        <v-data-table :headers="headers" :items="filteredItems">
          <template v-slot:[`item.status`]="{ item }">
            <v-switch
              flat
              v-model=item.status
              color="success"
              :label="`${item.status.toString() == ('true' || true)? 'Active' : 'Deactive'}`"
              @change="changeStatus(item)"
            ></v-switch>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <router-link
              style="text-decoration: none"
              :to="`/editcategory/${item.id}`"
              ><v-icon small class="mr-2"> mdi-pencil </v-icon></router-link
            >
            <v-icon small @click="removecategory(item.id)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import swal from "sweetalert";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "AllCategories",
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Title", value: "categoryname" },
        { text: "Description", value: "categorydes" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions" },
      ],
      category: [],
      search: "",
    };
  },

  computed: {
    ...mapGetters(["allcategory"]),

      // Filter Category data based on category name
      filteredItems() {
      return this.allcategory.filter((item) => {
        console.log(item, "item");
        return item.categoryname.toLowerCase().match(this.search);
      });
    },
    
  },
  methods: {
    ...mapActions(["getCategory", "deleteCategory"]),
//Remove Category function
    removecategory(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Category details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.deleteCategory(id);

          swal("Poof! Your Category details has been deleted!", {
            icon: "success",
          });
          this.$router.go();
        } else {
          swal("Your Category details  is safe!");
        }
      });
    },

    // Status change function
    async changeStatus(item) {
      console.log(item.status, "all status");
      const response = await axios.put(
        `http://localhost:3000/category/${item.id}`,
        {
          categoryname: item.categoryname,
          categorydes: item.categorydes,
          status: item.status.toString(),
        }
      );

      console.log(response, "edit");
    },
  },

  
 

  created() {
    this.getCategory();
  },
  mounted() {
    let response = this.$store.state.category;
    this.category = response.category;
    // console.log(this.category);
  },
};
</script>