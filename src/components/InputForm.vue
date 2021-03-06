<template>
  <div>
    <form class="form" action="submit">
      <input type="checkbox" v-model="form.checked" v-on:click="toggle" />
      <input
        v-model="form.name"
        class="form__name"
        type="text"
        placeholder="Product name"
      />
      <input
        v-model="form.price"
        class="form__price"
        type="number"
        oninput="validity.valid||(value='');"
        placeholder="Price"
      />
      <input
        v-model="form.quantity"
        class="form__quantity"
        type="number"
        min="1"
        oninput="validity.valid||(value='');"
        placeholder="Qty"
      />
      <button @click.prevent="submitItem(form)" type="submit">Add</button>
    </form>
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
type Form = {
  name: string;
  price: number;
  quantity: number;
  checked: boolean;
};
declare interface Data {
  form: Form;
}

declare module "vue/types/vue" {
  interface Vue {
    form: {
      name: string;
      price: number;
      quantity: number;
      checked: boolean;
    };
    initForm: {
      name: string;
      price: number;
      quantity: number;
      checked: boolean;
    };
    getStorage: () => void;
    setStorage: () => void;
  }
}

export default Vue.extend<Data>({
  initForm: {
    name: "",
    price: Number,
    quantity: 1,
    checked: false,
  },
  data() {
    return {
      form: {
        name: "",
        price: "",
        quantity: 1,
        checked: false,
      },
    };
  },
  watch: {
    form: {
      handler: function (): void {
        this.updateStorage();
      },
      deep: true,
    },
  },
  created() {
    let storedForm = this.getStorage();
    this.form = { ...this.$options.initForm, ...storedForm };
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  methods: {
    ...mapActions(["addItemToCart", "checkItems"]),
    submitItem(form: Form) {
      this.form = { ...this.$options.initForm };
      this.form.checked = false;
      return this.addItemToCart(form);
    },
    getStorage() {
      return JSON.parse(localStorage.getItem("myform"));
    },
    setStorage(val: Record<string, unknown>) {
      localStorage.setItem("myform", JSON.stringify(val));
    },
    updateStorage() {
      let storedForm = this.getStorage();
      if (!storedForm) storedForm = {};

      storedForm = JSON.parse(JSON.stringify(this.form));
      this.setStorage(storedForm);
    },
    toggle() {
      this.form.checked = false;
      return this.checkItems();
    },
  },
});
</script>
