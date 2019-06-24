<template>
  <div class="loading">
    <div class="text-center">
      <section id="shapes">
        <div class="loading-container">
          <div class="loading-shape square"></div>
          <div class="loading-shape heart"></div>
          <div class="loading-shape triangle"></div>
          <div class="loading-shape circle"></div>
        </div>
        <div class="loading-text"></div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loading',
};
</script>

<style scoped>
@keyframes arch {
  0% {
    opacity: 0;
    top: 100px;
    left: 0;
    transform: rotate(-90deg);
  }
  50% {
    top: 0;
    opacity: 1;
    right: calc(200px / 2);
  }
  100% {
    opacity: 0;
    top: 100px;
    right: 0;
    transform: rotate(90deg);
  }
}

#shapes {
  width: 250px;
  margin: 10px auto;
  position: relative;
}
#shapes .loading-container {
  height: calc(100px + 50px);
  width: 200px;
}
#shapes .loading-container .loading-shape {
  margin: 5px;
  position: absolute;
  top: 0;
  left: 200px;
  opacity: 0;
  animation-name: arch;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  transform-origin: bottom center;
  animation-iteration-count: infinite;
}
#shapes .loading-container .square {
  height: 20px;
  width: 20px;
  background-color: rgba(193, 89, 241, 0.966);
  animation-delay: 0s;
}
#shapes .loading-container .heart {
  width: 24px;
  height: calc(24px * 0.9);
  animation-delay: calc(3s / 4);
}
#shapes .loading-container .heart:before,
#shapes .loading-container .heart:after {
  position: absolute;
  content: '';
  left: calc(24px / 2);
  top: 0;
  width: calc(24px / 2);
  height: calc(24px * 0.8);
  background: #f17dc1;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}
#shapes .loading-container .heart:after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}
#shapes .loading-container .triangle {
  height: 0;
  width: 0;
  border-top: 20px solid #e2f15d;
  border-left: calc(20px / 2) solid transparent;
  border-right: calc(20px / 2) solid transparent;
  animation-delay: calc((3s / 4) * 2);
}
#shapes .loading-container .circle {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #6af15d;
  animation-delay: calc((3s / 4) * 3);
}

@keyframes loading-text {
  0% {
    content: 'Loading';
  }
  25% {
    content: 'Loading.';
  }
  50% {
    content: 'Loading..';
  }
  75% {
    content: 'Loading...';
  }
}

#shapes .loading-text {
  position: absolute;
  left: calc((250px / 2) - 20px);
}

#shapes .loading-text::after {
  content: 'Loading';
  font-style: italic;
  color: #929090;
  animation-name: loading-text;
  animation-duration: 3s;
  animation-timing-function: steps(5, jump-start);
  animation-iteration-count: infinite;
}
</style>