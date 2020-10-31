<template>
  <div class="loader">
    <div class="" :class="{ 'dg-backdrop': loading }"></div>
    <div class="clock-loader"></div>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
    
}
</script>

<style scoped>
.loader {
  display: flex;
  /* position: absolute;
  top: 15rem; */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.clock-loader {
  --clock-color: var(--primary-color);
  --clock-width: 4rem;
  --clock-radius: calc(var(--clock-width) / 2);
  --clock-minute-length: calc(var(--clock-width) * 0.4);
  --clock-hour-length: calc(var(--clock-width) * 0.2);
  --clock-thickness: 0.2rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -15rem;
  width: var(--clock-width);
  height: var(--clock-width);
  border: 3px solid var(--clock-color);
  border: 3px solid #DFAB24;
  border-radius: 50%;
  z-index: 5000;
}
.clock-loader::before, .clock-loader::after {
  position: absolute;
  content: "";
  top: calc(var(--clock-radius) * 0.25);
  width: var(--clock-thickness);
  background: var(--clock-color);
  background-color: #DFAB24;
  border-radius: 10px;
  transform-origin: center calc(100% - calc(var(--clock-thickness) / 2));
  animation: spin infinite linear;
}
.clock-loader::before {
  height: var(--clock-minute-length);
  animation-duration: 2s;
}
.clock-loader::after {
  top: calc(var(--clock-radius) * 0.25 + var(--clock-hour-length));
  height: var(--clock-hour-length);
  animation-duration: 15s;
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}
.dg-backdrop {
    background-color: #190d02;
    opacity: 0.7;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5000;
}
</style>