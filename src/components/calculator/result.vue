<template>
<div class="result">
  <span v-html="result" />
</div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Vue from 'vue';
import { TFraction } from './types';
import { AFTER_POINT_LIMIT, SHOW_FRACTIONS_IN_RESULT } from '@/components/calculator/constants';

@Component({
  name: 'calculator-fraction',
})
export default class CalculatorFractionClass extends Vue {
  @Prop() readonly value!: Array<TFraction>;

  /** вычисление наибольшего общего делителя для двух чисел */
  gcd(a: number, b: number): number {
    return !b ? a : this.gcd(b, a % b);
  }

  get result(): string {
    const den = this.value.reduce((a, v) => a * v.denominator, 1);
    const sum = this.value.reduce((a, v) => a + v.numerator * (den / v.denominator), 0);
    if (Number.isNaN(sum / den)) {
      return null;
    }
    if (SHOW_FRACTIONS_IN_RESULT && String((sum % den) / den).length - 2 > AFTER_POINT_LIMIT) {
      const n = sum % den;
      const cd = this.gcd(n, den);
      return `= ${Math.floor(sum / den) || ''} <sup>${n / cd}</sup>/<sub>${den / cd}</sub>`;
    }
    return `= ${sum / den}`;
  }
}
</script>

<style scoped lang="scss">
.result {
  color: #666;
  font-size: 2.25rem;
  padding-left: 1rem;
}
</style>
