<template>
  <div class="layout">
    <Navbar />
    <SocialBar />
    <main class="layout__main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  &__main {
    flex: 1;
  }
}
</style>
