<template>
  <div class="container">
    <h2 style="text-align: center;">Add Withdrawal</h2>
    <form class="form" @submit.prevent="addWithdrawal">
      <fieldset>
        <div class="column">
          <h3 class="color-1">Date</h3>
        </div>
        <input v-model="withdrawal.date" type="date">
        <div class="row">
          <div class="column">
            <h3 class="color-1">Amounts</h3>
          </div>
          <div class="column">
            <button class="button button-1" type="button" name="autofill">Auto Fill Amounts *</button>
          </div>
        </div>
        <div class="row">
          <div class="column">
            USD
          </div>
          <div class="column">
            <input placeholder="USD Rate" v-model="withdrawal.amounts.usd" type="number">
          </div>
        </div>
        <div class="row">
          <div class="column">
            EUR
          </div>
          <div class="column">
            <input placeholder="EUR Rate" v-model="withdrawal.amounts.eur" type="number">
          </div>
        </div>
        <div class="row">
          <div class="column">
            ETH
          </div>
          <div class="column">
            <input placeholder="ETH Rate" v-model="withdrawal.amounts.eth" type="number">
          </div>
        </div>
        <div class="row">
          <div class="column">
            BTC
          </div>
          <div class="column">
            <input placeholder="BTC Rate" v-model="withdrawal.amounts.btc" type="number">
          </div>
        </div>
        <div class="row">
          <div class="button-list">
            <input class="button button-1 " value="Save" type="submit">
          </div>
          <div class="button-list">
            <router-link to="/dashboard" class="button button-1">Cancel</router-link>
          </div>
        </div>
      </fieldset>
    </form>
    <div>
      * Auto Fill Amounts will use the current rates to fill in the zero values
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      withdrawal: {
        date: null,
        amounts: {
          usd: 0,
          eur: 0,
          eth: 0,
          btc: 0
        }
      }
    }
  },
  methods: {
    addWithdrawal() {
      this.$store.dispatch('addWithdrawal', {withdrawal: this.withdrawal});
      this.$router.replace('/dashboard');
    }
  }
}
</script>
