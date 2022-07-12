<template>
  <div>
    <div v-if="pending">
      Loading ...
    </div>
    <div v-else>
      <div class="wrapper">
        <div class="topsection">
          <img
            class="bg"
            :src="`https://image.tmdb.org/t/p/w1920_and_h800_bestv2/${movie.backdrop_path}`"
          >
          <div class="overlay">
            <div
              class="content"
              v-if="step==0"
            >
              <i
                class="arrow"
                @click="$router.back()"
              ></i>
              <img
                :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`"
                :alt="movie.original_title || movie.original_name"
              >
              <div class="text">
                <h1>{{movie.original_title || movie.original_name}}</h1>
                <h4>Popularity:</h4>
                <ShowPie :vote="movie.vote_average" />
                <h4>Overview:</h4>
                <p>{{movie.overview}}</p>
                <button @click="watch">Watch now !</button>
              </div>
            </div>
            <div v-else>
              <i
                class="arrow"
                @click="step=0"
              ></i>
              <div
                id="player"
                class="webtor"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const test = ref("rafik")
const step = ref(0)
const route = useRoute();
const { pending, data: movie } = await movieAPI(`/movie/${route.params.id}`)
const showPlayer = ref(false)
const magnet = ref("")


const watch = async () => {
  step.value = 1;
  const title = movie.value.original_title || movie.value.original_name
  const data = await $fetch('/api/get-magnet', { method: 'post', body: { movie: title } })
  magnet.value = data.magnet
  // showPlayer.value = true
  window.webtor = window.webtor || [];
  window.webtor.push({
    id: 'player',
    magnet: data.magnet,
    on: function (e) {
      console.log(e)
      if (e.name == window.webtor.TORRENT_FETCHED) {
        console.log('Torrent fetched!', e.data);
      }
      if (e.name == window.webtor.TORRENT_ERROR) {
        console.log('Torrent error!');
      }
    },
    poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.value.poster_path}`,
    lang: 'en',
    i18n: {
      en: {
        common: {
          "prepare to play": "Preparing Video Stream... Please Wait...",
        },
        stat: {
          "seeding": "Seeding",
          "waiting": "Client initialization",
          "waiting for peers": "Waiting for peers",
          "from": "from",
        },
      },
    },
  });
  // return navigateTo(`${route.path}/watch`)
}
</script>
<style scoped lang="scss">
.wrapper {
  height: 100%;
  width: 100%;
  margin: auto;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
img {
  width: 300px;
}

.wrapper-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.topsection {
  position: relative;
  width: 100%;
  height: 100vh;
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      height: 100%;
      width: 80%;
      color: white;
      margin: auto;
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      p {
        margin-top: 20px;
        font-size: 0.9rem;
        max-width: 600px;
      }

      img {
        width: 250px;
        border-radius: 10px;
      }
    }
    button {
      cursor: pointer;
      margin-top: 20px;
      height: 40px;
      width: 100px;
      border: none;
      border-radius: 10px;
    }
  }
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   gap: 30px;
}

@media screen and (max-width: 700px) {
  .wrapper {
    overflow: auto;
  }
  .topsection {
    .bg {
      vertical-align: middle;
      height: 100%;
    }
    .overlay {
      padding: 50px 0;
      height: 100%;
      flex-direction: column;
      .content {
        flex-direction: column;
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
}

h4 {
  margin-top: 20px;
}

.arrow {
  position: absolute;
  top: 50px;
  left: 50px;
  cursor: pointer;
  --w: 10px;
  border: solid white;
  border-width: 0 var(--w) var(--w) 0;
  display: inline-block;
  padding: var(--w);
  transform: rotate(135deg);
}
.webtor {
  max-width: 100%;
}
</style>
