<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex align-center flex-column bg-teal pa-6">

        <!-- Toggle Button for move All Categories to All Items -->
          <v-btn-toggle
            active-class="teal"
            background-color="deep-purple accent-3"
            v-model="toggle"
            divided
          >
            <v-btn class="" @click="() => toogle = 0">Allitems</v-btn>
            <v-btn @click="() => toggle = 1"> AllCategories</v-btn>
          </v-btn-toggle>
        </div>

        <!--If Toggle then Display All Categories Table   -->
        <div v-if="toggle === 1">

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
          <div>
            <v-data-table
            :headers="headers_cat"
            :items="filtercategory"
            caption="AllCategories"
            dark
          >
            <template v-slot:[`item.status`]="{ item }">
              <v-switch
                flat
                v-model="item.status"
                color="success"
                :label="`${item.status.toString() === ('true' || true) ? 'Active' : 'DeActive'}`"
              ></v-switch>
            </template>
          </v-data-table>
          </div>
        </div>


         <!-- Doesn't Toggle Button for move to Vice versa -->
        <div v-else>

          <!-- Searchbar for Searching Item based on Item name  -->
          <v-card-title>
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
            <v-data-table
              :headers="headers_item"
              :items="filteredItems"
              class="rounded"
              dark
              caption="AllItems"
            >
              <template v-slot:[`item.itemprice`]="{ item }">
                {{ item.itemprice | currency }}
              </template>
              <template v-slot:[`item.status`]="{ item }">
                <v-switch
                  flat
                  v-model="item.status"
                  color="success"
                  :label="`${item.status ? 'Active' : 'Deactive'}`"
                ></v-switch>
              </template>
            </v-data-table>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home-view",
  data() {
    return {
      toggle: 0,
      search: "",

      dialog: false,
      headers_cat: [
        {
          text: "Id",
          align: "start",
          sortable: true,
          value: "id",
        },
        { text: "Title", value: "categoryname" },
        { text: "Description", value: "categorydes" },
        { text: "Status", value: "status" },
      ],
      headers_item: [
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
      ],
    };
  },
  computed: {
    ...mapGetters(["allcategory", "allitem"]),

    // Filter Category data based on category name
    filtercategory() {
      return this.allcategory.filter((item) => {
        console.log(item);
        return item.categoryname.match(this.search);
      });
    },
     // Filter Category data based on Item name
    filteredItems() {
      return this.allitem.filter((item) => {
        console.log(item);
        return item.itemname.match(this.search);
      });
    },
  },
  methods: {
    //Actions for get category and items
    ...mapActions(["getCategory", "getItem"]),
  },
  created() {
    this.getCategory();
    this.getItem();
  },
};
</script>