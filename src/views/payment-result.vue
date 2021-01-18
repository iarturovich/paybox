<template>
<div class="w-100 mx-auto">
    <div :class="[isSuccessPay ? 'success' : 'error', 'rounded mb-3 text-azure text-center']">
        <span v-if="isSuccessPay">&#10004;</span>
        <span v-else>&#10006;</span>
    </div>
    <div class="text-center font-size-20px mb-3">
        {{isSuccessPay ? 'Перевод совершен' : 'Ошибка платежа'}}
    </div>
    <div v-if="isSuccessPay">
        <div class="mb-2 d-flex payment">
            <span class="w-40 mr-2 text-right">Отправитель:</span>
            <span class="w-60">{{card.name}}</span>
        </div>
        <div class="mb-2 d-flex">
            <span class="w-40 mr-2 text-right">Сумма:</span>
            <span class="w-60">{{Intl.NumberFormat().format(calculation.totalSumm)}} &#8376;</span>
        </div>
        <div class="d-flex">
            <span class="w-40 mr-2 text-right">Коммисия:</span>
            <span class="w-60">{{Intl.NumberFormat().format(calculation.commision)}} &#8376;</span>
        </div>
    </div>
    <div class="text-center" v-else>Попробуйте еще раз</div>
    <router-link
        to="/"
        class="btn mt-5 d-flex justify-content-center align-items-center text-azure text-center">
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