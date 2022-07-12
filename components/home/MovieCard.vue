<template>
  <div class="movie-card">
    <img
      class="bg"
      :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${image}`"
      :alt="title"
    >
    <div class="overlay">
      <div class="top">
        <span>★ {{`${vote}`.slice(0,3)}}/10</span>
      </div>
      <div class="bottom">
        <h1 class="card-title">{{title}}</h1>
        <img
          class="play"
          src="@/assets/play.png"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  id: Number,
  title: String,
  image: String,
  vote: Number,
  date: String
})

</script>

<style lang="scss" >
.movie-card {
  height: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  border: 1px solid lightgrey;
  box-shadow: 0 5px 5px rgba(41, 41, 41, 0.2);
  /* padding: 20px 0; */
  cursor: pointer;
  transition: 0.5s;
  overflow: hidden;
  &:hover {
    transform: translateY(-5px) scale(1.02);
  }
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.6)
    );
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    .top {
      font-weight: bold;
    }
    .bottom {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .play {
        display: none;
        z-index: 1;
        width: 50px;
      }
    }
    h1 {
      margin: 20px 0 0 0;
      font-size: 1.2rem;
    }
  }
}
</style>