<template>
  <div class="table">
    <div class="table__header">
      <p class="row">Product name</p>
      <p class="row">Price</p>
      <p class="row">Qty</p>
      <p class="row">Summ</p>
    </div>
    <div class="table__body">
      <table-row v-for="row in item_data" :key="row.name" :row_data="row">
      </table-row>
    </div>
    <div class="footer">
      <button class="table__delete_button" @click="deleteCheckedItem">
        Delete
      </button>
      <div class="total">Total: $ {{ sumValues }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import TableRow from "./TableRow.vue";
import { mapGetters, mapActions } from "vuex";
declare module "vue/types/vue" {
  interface Vue {
    deleteItemFromCart: () => void;
  }
}
export default {
  created(): void {
    console.log(this.cart);
  },
  components: {
    TableRow,
  },
  computed: {
    ...mapGetters(["cart"]),
    sumValues(): number {
      return this.cart.reduce(
        (Sum: number, product: []) => product.price * product.quantity + Sum,
        0
      );
    },
  },
  name: "v-table",
  props: {
    item_data: {},
  },
  methods: {
    ...mapActions(["deleteItemFromCart"]),
    deleteCheckedItem() {
      return this.deleteItemFromCart();
    },
  },
};
</script>
