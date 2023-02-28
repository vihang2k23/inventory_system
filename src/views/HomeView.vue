<template>
    <v-container>
    <v-row>
       
        <v-col >
           <!-- <v-card>
            <template >
            <v-switch
              flat
              v-model="status"
              color="success"
              class="d-flex justify-content-center"
              :label="`${status ? 'AllCategory' : 'AllItem'}`"
              inset
            ></v-switch>
          </template>
           </v-card> -->
           <div class="d-flex align-center flex-column bg-teal pa-6">
    <v-btn-toggle
  active-class="teal"
    background-color="deep-purple accent-3"
      v-model="toggle"
      divided
    >
      <v-btn class="" @click="()=>!toogle">Allitems</v-btn>
      <v-btn @click="()=>toggle"> AllCategories</v-btn>
    </v-btn-toggle>
  </div>
            <div v-if="toggle">
              <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table :headers="headers" :items="filteredItems" caption="AllCategories" dark>
          <template v-slot:[`item.status`]="{ item }">
            <v-switch
              flat
              v-model="item.status"
              color="success"
              :label="`${item.status === 'true' ? 'Active' : 'InActive'}`"
              
            ></v-switch>
          </template>
          
        </v-data-table >
            </div>
            <div v-else>
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
          <v-data-table :headers="headers1" :items="filteredItems1" class="rounded" dark caption="AllItems">
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
      toggle: "",
      search: "",

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
      ],headers1: [
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
    filteredItems() {
      return this.allcategory.filter((item) => {
        console.log(item);
        return item.categoryname.match(this.search);
      });
    },
    filteredItems1() {
      return this.allitem.filter((item) => {
        console.log(item);
        return item.itemname.match(this.search);
      });
    }
  },
  methods: {
    ...mapActions(["getCategory", "getItem"]),
  },
  created() {
    this.getCategory();
    this.getItem();
  },
};
</script>