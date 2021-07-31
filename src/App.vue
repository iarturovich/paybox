<template>
<div id="app" class="mx-auto">
  <div class="d-flex justify-content-between flex-wrap-mobile">
    <div>
      <div class="d-flex">
          <i class="icon icon-bank"/><span class="ml-2 pt-2 text-gray">Карта отправителя</span>
      </div>
      <div class="card card-red mt-2 px-4 text-azure">
        <div class="d-flex pt-3">
          <i class="icon icon-visa ml-auto mr-2"/>
          <i class="icon icon-mastercard mr-2"/>
          <i class="icon icon-maestro"/>
        </div>
        <div class="mt-2">НОМЕР КАРТЫ</div>
        <div class="d-flex justify-content-between pt-2">
          <input
            class="card-input card-input-number"
            type="tel"
            v-model="card.numbers.first"
            :disabled="disabled"
            @input="inputCardNumber($event, 'first')">
          <input
            class="card-input card-input-number mx-2"
            type="text"
            v-model="card.numbers.second"
            :disabled="disabled"
            @input="inputCardNumber($event, 'second')"
            @keyup.delete="onDeleteCardNumber">
          <input
            class="card-input card-input-number mr-2"
            type="text"
            v-model="card.numbers.third"
            :disabled="disabled"
            @input="inputCardNumber($event, 'third')"
            @keyup.delete="onDeleteCardNumber">
          <input
            class="card-input card-input-number"
            type="text"
            v-model="card.numbers.fourth"
            :disabled="disabled"
            @input="inputCardNumber($event, 'fourth')"
            @keyup.delete="onDeleteCardNumber">
        </div>
        <div class="d-flex mt-5">
          <div>ИМЯ НА КАРТЕ</div>
          <div class="ml-auto">СРОК ДЕЙСТВИЯ</div>
        </div>
        <div class="d-flex mt-2">
          <input
            class="card-input card-input-name text-left"
            type="text"
            v-model.trim="card.name"
            :disabled="disabled"
            @input="inputCardName">
          <dropdown
            :list="months"
            :value="card.month"
            @input="card.month = $event"
            class="ml-auto"
          />
          <span class="mx-1" style="font-size: 34px;">/</span>
          <dropdown
            :list="years"
            :value="card.year"
            @input="card.year = $event"
          />
        </div>
      </div>
      <div class="card card-gray text-azure">
        <div class="magnet"/>
        <div class="d-flex align-items-center justify-content-right mr-6">
          <label for="cvc" class="ml-auto">CCV/CVC</label>
          <input
            id="cvc"
            class="card-input card-input-cvc ml-2"
            v-model="card.cvc"
            :disabled="disabled"
            @input="inputCVC"
            type="password">
        </div>
      </div>
    </div>
    <router-view class="payment pl-3 pt-5"/>
  </div>
</div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import Dropdown from './components/dropdown'
export default {
  components: {
    Dropdown
  },
  watch: {
    $route (newRoute) {
      this.setDisabled(newRoute.path === '/payment-result')
    }
  },
  computed: {
    ...mapState(['card', 'disabled', 'months', 'years'])
  },
  methods: {
    ...mapMutations(['setDisabled']),
    inputCVC (event) {
      let value = event.target.value
      if (value.match(/\D/)) {
        value = value.match(/\d/) ? value.match(/\d+/g).join('') : ''
      }
      if (value.length > 3) value = value.slice(0, 3)

      if (value.length === 3)  this.selectTab()

      this.card.cvc = event.target.value = value
    },
    onDeleteCardNumber (event) {
      if (!event.target.value) {
        event.target.previousSibling.focus()
      }
    },
    inputCardNumber(event, input) {
      let value = event.target.value
      let { selectionStart, selectionEnd } = event.target
      if (value.match(/\D/)) {
        value = value.match(/\d/) ? value.match(/\d+/g).join('') : ''
        selectionStart--
        selectionEnd--
      }
      if (value.length > 4) {
        if (selectionStart > 4) {
          value = value.slice(0, 4)
        } else {
          value = value.slice(0, selectionStart) + value.slice(selectionStart, 4)
        }
      }
      if (value.length >= 4 && selectionStart >= 4) {
        this.selectTab()
      }
      this.card.numbers[input] = event.target.value = value
      event.target.setSelectionRange(selectionStart, selectionEnd)
    },
    selectTab () {
      const nodeList = document.querySelectorAll('input')
      const nextIndex = [...nodeList].findIndex(f => f === event.target) + 1
      nodeList.item(nextIndex).focus()
      nodeList.item(nextIndex).setSelectionRange(0, 0)
    },
    inputCardName() {
      this.card.name = this.card.name.toUpperCase()
    }
  }
}
</script>
<style scoped>
@import url('./assets/styles/icon.css');
</style>
