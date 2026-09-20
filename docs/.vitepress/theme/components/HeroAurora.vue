<template>
  <!-- 首页 hero 背景装饰：极光光斑 + 点阵网格（纯装饰，不拦截交互） -->
  <div class="hero-aurora" aria-hidden="true">
    <div class="aurora-blob b1" />
    <div class="aurora-blob b2" />
    <div class="aurora-blob b3" />
    <div class="aurora-grid" />
  </div>
</template>

<style scoped>
.hero-aurora {
  position: relative;
  height: 0;
  pointer-events: none;
}

.aurora-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  will-change: transform;
}

.b1 {
  width: 420px;
  height: 420px;
  left: 6%;
  top: -40px;
  opacity: 0.35;
  background: radial-gradient(circle at 30% 30%, #7c3aed, transparent 65%);
  animation: aurora-drift-1 18s ease-in-out infinite alternate;
}

.b2 {
  width: 380px;
  height: 380px;
  right: 10%;
  top: -80px;
  opacity: 0.28;
  background: radial-gradient(circle at 60% 40%, #ec4899, transparent 65%);
  animation: aurora-drift-2 22s ease-in-out infinite alternate;
}

.b3 {
  width: 300px;
  height: 300px;
  left: 42%;
  top: 120px;
  opacity: 0.18;
  background: radial-gradient(circle, #06b6d4, transparent 65%);
  animation: aurora-drift-3 26s ease-in-out infinite alternate;
}

/* 点阵网格，向下淡出 */
.aurora-grid {
  position: absolute;
  left: 0;
  right: 0;
  top: -20px;
  height: 460px;
  background-image: radial-gradient(var(--vp-c-divider) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: 0.5;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 68%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 18%, #000 68%, transparent);
}

@keyframes aurora-drift-1 {
  to {
    transform: translate(60px, 40px) scale(1.15);
  }
}

@keyframes aurora-drift-2 {
  to {
    transform: translate(-70px, 30px) scale(1.1);
  }
}

@keyframes aurora-drift-3 {
  to {
    transform: translate(40px, -50px) scale(1.2);
  }
}

/* 深色模式：光斑更收敛 */
.dark .aurora-blob {
  opacity: 0.22;
}
</style>
