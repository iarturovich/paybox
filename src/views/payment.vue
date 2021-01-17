<template>
<form id="payment" @submit.prevent="makePayment">
    <input
        class="input-payment text-center"
        type="text"
        placeholder="СУММА ПЛАТЕЖА"
        @input="inputSumm"
        :disabled="disabled"
        :value="summ">
    <div class="d-flex justify-content-between mt-5">
        <span>Коммисия:</span>
        <span class="text-nowrap">{{calculation.commision}} &#8376;</span>
    </div>
    <div class="d-flex justify-content-between mt-3">
        <span class="mr-2">Итоговая сумма:</span>
        <span class="text-nowrap">{{calculation.totalSumm}} &#8376;</span>
    </div>
    <div v-show="!isValid" class="error-text mt-5 text-center text-danger">
        Пожалуйста, заполните все поля.
    </div>
    <button
        type="submit"
        form="payment"
        :disabled="disabled || !card.agree"
        class="btn text-azure mt-5 mx-auto position-relative">
        <div
            v-if="disabled"
            class="position-absolute">
            <div class="spiner">
                <div></div><div></div><div></div><div></div>
            </div>
        </div>
        <span>ОПЛАТИТЬ</span>
    </button>
    <div class="text-center mt-3 text-gray font-size-15px">
        <input
            type="checkbox"
            v-model="card.agree">
        Я ознакомлен и присоединяюсь <router-link to="#">к договору</router-link>
    </div>
    <div class="text-center text-gray mt-3 font-size-15px">
        Коммисия может быть удержана банком эмитентом отправителя
    </div>
</form>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    computed: {
        ...mapState(['summ', 'disabled', 'card', 'isValid']),
        ...mapGetters(['calculation'])
    },
    methods: {
        ...mapActions(['makePayment']),
        ...mapMutations(['setSumm']),
        inputSumm (event) {
            let value = event.target.value
            const { selectionStart, selectionEnd } = event.target
            if (value.match(/\D/)) {
                value = value.match(/\d/) ? value.match(/\d+/g).join('') : ''
            }
            event.target.value = +value ? Intl.NumberFormat().format(value) : ''
            this.setSumm(event.target.value)
            if (event.data === null) {
                event.target.setSelectionRange(selectionStart, selectionEnd)
            } else {
                event.target.setSelectionRange(selectionStart + 1, selectionEnd + 1)
            }
        },
    }
}
</script>