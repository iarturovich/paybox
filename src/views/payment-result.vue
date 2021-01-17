<template>
<div class="text-center w-100 mx-auto">
    <div :class="[isSuccessPay ? 'success' : 'error', 'rounded mb-3']">
        <span v-if="isSuccessPay">&#10004;</span>
        <span v-else>&#10006;</span>
    </div>
    <div class="font-size-20px mb-3">
        {{isSuccessPay ? 'Перевод совершен' : 'Ошибка платежа'}}
    </div>
    <div v-if="isSuccessPay">
        <div class="mb-2">Отправитель: {{card.name}}</div>
        <div class="mb-2">Сумма: {{calculation.totalSumm}}</div>
        <div>Коммисия: {{calculation.commision}}</div>
    </div>
    <span v-else>
        Попробуйте еще раз
    </span>
    <router-link
        to="/"
        class="text-azure btn mt-5 d-flex justify-content-center align-items-center">
        {{isSuccessPay ? 'OK' : 'ПОВТОРИТЬ'}}
    </router-link>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapState(['isSuccessPay', 'card']),
        ...mapGetters(['calculation'])
    }
}
</script>