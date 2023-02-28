<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
 <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
        <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
      
    >
    <v-list><v-list-item router :to="home">
      <v-list-item-action >
        <v-icon >mdi-home</v-icon>    </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
    </v-list-item></v-list>
    <v-divider></v-divider>
    <v-subheader :inset="inset">
        Category
      </v-subheader>

      <v-list>
        <template v-for="(item, index) in Category"  >
          <v-list-item
            v-if="item.action"
            :key="item.title" 
            router :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
<v-divider></v-divider>
      <v-subheader :inset="inset">
        Items
      </v-subheader>

      <v-list>
        <template v-for="(item, index) in items"  >
          <v-list-item
            v-if="item.action"
            :key="item.title" 
            router :to="item.route"
          >
            <v-list-item-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="inset"
          ></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name:"NavBar",
  data() {
    return {
      inset: true,
      drawer: false,
      group:null,
      home:'/',
      Category: [
      {
          action: 'mdi-label', text: 'AllCategories', route: '/allcategories' 

        },
        {
          divider: true,
        },{
          action: 'mdi-label',   text: 'AddCategory', route: '/addcategory' 

        }
       ],
        items: [
        {
          action: 'mdi-label', text: 'AllItems', route: '/allitem' 

        },
        {
          divider: true,
        },{
          action: 'mdi-label',   text: 'AddItem', route: '/addnewitem' 

        }
        ]
    }
  },watch: {
      group () {
        this.drawer = false
      },
    },
}
</script>

<style>
</style>