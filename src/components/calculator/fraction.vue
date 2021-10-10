<template>
  <div v-if="value">
    <input
      v-model="numerator"
      v-mask="'##'"
      :class="{error: numerator < 1 || numerator > 99}"
    />
    <hr/>
    <input
      v-model="denominator"
      v-mask="'##'"
      :class="{error: denominator < 1 || denominator > 99}"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { TFraction } from '@/components/calculator/types';

/** вычисление наибольшего общего делителя для двух чисел */
function gcd(a: number, b: number): number {
  return !b ? a : gcd(b, a % b);
}

@Component({
  name: 'calculator-fraction',
})
export default class CalculatorFractionClass extends Vue {
  @Prop() readonly value!: TFraction

  private get numerator(): number {
    return this.value.numerator;
  }

  private set numerator(v: number) {
    const copy = { ...this.value };
    copy.numerator = v;
    this.$emit('input', copy);
  }

  private get denominator(): number {
    return this.value.denominator;
  }

  private set denominator(v: number) {
    const copy = { ...this.value };
    copy.denominator = v;
    this.$emit('input', copy);
  }
}
</script>

<style scoped lang="scss">
input {
  width: 50px;
  padding: 12px;
  outline: none;
  border: 2px solid #999;
  border-radius: 5px;
  &.error {
    border-color: red;
  }
}
</style>
