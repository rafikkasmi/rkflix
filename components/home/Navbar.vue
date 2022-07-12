<template>
  <main class="navbar">
    <NuxtLink to="/">
      <h3>Rkflix</h3>
    </NuxtLink>
    <div class="search">
      <input
        type="text"
        placeholder="Search a show or a movie..."
        v-model="query"
      >
      <button @click="search"><img src="@/assets/search.png"></button>
    </div>
  </main>
</template>

<script setup>
const query = ref("")

const search = () => {
  navigateTo(`/search/${query.value}`)
}
</script>


<style lang="scss" scoped>
.navbar {
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 0;
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      outline: none;
      padding: 10px;
      text-align: center;
      border-radius: 10px;
      height: 45px;
      width: 300px;
      border: none;
      font-size: 1rem;
      background: rgb(243, 243, 243);
    }
    button {
      margin-left: 10px;
      background: var(--orange);
      width: 45px;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: 0.1s;
      &:active {
        transform: scale(0.95);
      }
      img {
        width: 90%;
      }
      border: none;
      border-radius: 10px;
    }
  }
}

@media screen and (max-width: 760px) {
  .navbar {
    display: grid;
    grid-template-columns: 1fr 5fr;
    padding: 0px 0 10px 0;
    .search {
      display: grid;
      grid-template-columns: 5fr 1fr;
      input {
        width: 100%;
      }
    }
  }
}
</style>