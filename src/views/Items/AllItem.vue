<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-main>
          <router-link style="text-decoration: none" to="/addnewitem"
            ><v-btn color="primary" class="mx-4"> Add Item </v-btn></router-link
          >

          <!-- <router-link style="text-decoration: none" to="/allcategories"
            ><v-btn color="success" class="mr-4">
              All Categories
            </v-btn></router-link
          > -->
          <router-link style="text-decoration: none" to="/"
            ><v-btn color="warning" class="mr-4 dark">
              Home
            </v-btn></router-link
          ></v-main
        >
        <v-card-title>
            <!-- Searchbar for Searching Category based on Categories name  -->
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <div>
          
  <!-- Data table for display all Items details -->
          <v-data-table :headers="headers" :items="filteredItems">
            <template v-slot:[`item.itemprice`]="{ item }">
              {{ item.itemprice | currency }}
            </template>
            <template v-slot:[`item.status`]="{ item }">
              <v-switch
                flat
                v-model=item.status 
                color="success"
                :label="`${item.status.toString() == ('true' || true) ? 'Active' : 'Deactive'}`"
                @change="changeStatus(item)"
              ></v-switch>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
             <!-- Edit button -->
              <router-link
                style="text-decoration: none"
                :to="`/edititem/${item.id}`"
                ><v-icon small class="mr-2"> mdi-pencil </v-icon></router-link
              >
              <!-- Delete button -->
              <v-icon small @click="removeid(item.id)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </div>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </v-container>
</template>
<script>
import swal from "sweetalert";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "AllItem",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Id",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Title", value: "itemname" },
        { text: "Category", value: "itemcategory" },
        { text: "Description", value: "itemdes" },
        { text: "Status", value: "status" },
        { text: "Item-Price", value: "itemprice" },
        { text: "Action", value: "actions" },
      ],
      items: [],
    };
  },
  computed: {
    ...mapGetters(["allitem"]),
     // Filter Item data based on Item name
    filteredItems() {
      return this.allitem.filter((item) => {
        console.log(item);
        return item.itemname.toLowerCase().match(this.search);
      });
    },
  },
  methods: {
    ...mapActions(["getItem", "deletItem"]),
    // Remove Item function
    removeid(id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task details!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.deletItem(id);
          swal("Poof! Your Item details has been deleted!", {
            icon: "success",
          });
          this.$router.go();
        } else {
          swal("Your Item details  is safe!");
        }
      });
    },
    async changeStatus(item) {
      const response = await axios.put(
        `http://localhost:3000/item/${item.id}`,
        {
          itemname: item.itemname,
          itemcategory: item.itemcategory,
          itemdes: item.itemdes,
          status: item.status.toString(),
          itemprice: item.itemprice,
        }
      );
      console.log(response, "edit");
    },
  },
  created() {
    this.getItem();
  },
  
  
};
</script>