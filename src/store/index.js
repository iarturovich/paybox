import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import lunhAlgorithm from '../functions/lunhAlgorithm'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    card: {
      numbers: {
        first: null,
        second: null,
        third: null,
        fourth: null,
      },
      name: null,
      month: null,
      year: null,
      cvc: null,
      agree: true
    },
    months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    years: ['21', '22', '23', '24'],
    summ: null,
    isSuccessPay: false,
    disabled: false,
    isValid: true
  },
  mutations: {
    setIsSuccessPay (state, value) {
      state.isSuccessPay = value
    },
    setDisabled (state, value) {
      state.disabled = value
    },
    setSumm (state, value) {
      state.summ = value
    },
    setIsValid (state, value) {
      state.isValid = value
    }
  },
  actions: {
    makePayment ({ state, commit }) {
      commit('setIsValid', validatePayment(state.card, state.summ))
      if (state.isValid) {
        const result = lunhAlgorithm(state.card.numbers)
        console.log(result)
        commit('setDisabled', true)
        setTimeout(() => {
          commit('setIsSuccessPay', +(Math.random() * 100).toFixed() > 50)
          router.push('/payment-result')
        }, 1000)
      }
    }
  },
  getters: {
    calculation: state => {
      if (state.summ) {
        const value = state.summ.match(/\d/) ? +state.summ.match(/\d+/g).join('') : 0
        if (value >= 500) {
            return {
                commision: Intl.NumberFormat().format(value / 100),
                totalSumm: Intl.NumberFormat().format(Math.abs(value - value / 100))
            }
        }
      }
      return {
          commision: 0,
          totalSumm: 0
      }
    }
  }
})

function validatePayment(card, summ) {
  if (+summ < 500) return false

  for (const digit in card.numbers) {
    if (!card.numbers[digit] || card.numbers[digit].length !== 4) return false
  }

  if (!card.name) return false
  else if (!card.month || card.month.length !== 2) return false
  else if (!card.year || card.year.length !== 2) return false
  else if (!card.cvc || card.cvc.length !== 3) return false

  return true
}