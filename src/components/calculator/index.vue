<template>
  <div>
    <div class="calculator">
      <template v-for="(_, num)  in fractions">
        <div :key="`fraction-${num}`" class="fractions">
          <div class="fraction">
            <button
              class="btn-delete"
              v-if="fractions.length > 1"
              @click="fractions.splice(num, 1)"
            >
              delete
            </button>
            <calculator-fraction v-model="fractions[num]"/>
          </div>
          <div class="plus" v-if="num < fractions.length -1">+</div>
        </div>
      </template>
      <result v-model="fractions" />
    </div>
    <div class="actions">
      <button
        @click="fractions.push({...emptyFraction})"
        :disabled="fractions.length >= limit"
      >
        add new element
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CalculatorFraction from '@/components/calculator/fraction.vue';
import Result from '@/components/calculator/result.vue';
import { TFraction } from '@/components/calculator/types';
import { FRACTIONS_LIMIT } from './constants';

@Component({
  name: 'Calculator',
  components: { Result, CalculatorFraction },
})
export default class CalculatorClass extends Vue {
  /** Пара добавляемая в дробь по умолчанию */
  emptyFraction = { numerator: 1, denominator: 1 }

  /** Массив дробей */
  fractions: Array<TFraction> = [{ ...this.emptyFraction }];

  limit = FRACTIONS_LIMIT;
}
</script>

<style scoped lang="scss">
$pair-width: 60px;

.calculator {
  display: flex;
  flex-direction: row;
  align-items: center;
  .fractions {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #666666;
    .fraction {
      position: relative;
      display: flex;
      flex-direction: column;
    }
  }
  .plus {
    font-size: 4rem;
    padding: 0 0.75rem;
  }
}

.btn-delete {
  position: absolute;
  margin-top: -2.2rem;
  margin-left: 13px;
  line-height: 1.5rem;
  width: 50px;
  background: #C33;
  border: 0;
  color: #FFFFFF;
  cursor: pointer;
}

.actions {
  padding-top: 2rem;
  button {
    padding: 0.5rem;
  }
}
</style>
