<template>
  <div>
    {{test}}
    <div v-if="pending">
      Loading ...
    </div>
    <div v-else>
      <div class="container">
        <div class="header">
          <img
            :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`"
            :alt="movie.original_title"
          >
          <div class="text">
            <h1>{{movie.original_title || movie.original_name}}</h1>
            <p>{{movie.overview}}</p>
          </div>
        </div>
        <button @click="watch">Watch</button>

        <!-- <div v-if="showPlayer">
          <video
            controls
            :src="magnet"
            :poster="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`"
            width="100%"
            :data-title="movie.original_title || movie.original_name"
          ></video>
        </div> -->

        <div
          id="player"
          class="webtor"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const test = ref("rafik")

const route = useRoute();
const { pending, data: movie } = await movieAPI(`/movie/${route.params.id}`)
const showPlayer = ref(false)
const magnet = ref("")


const watch = async () => {
  const title = movie.value.original_title || movie.value.original_name
  const data = await $fetch('/api/get-magnet', { method: 'post', body: { movie: title } })
  magnet.value = data.magnet
  // showPlayer.value = true
  window.webtor = window.webtor || [];
  window.webtor.push({
    id: 'player',
    magnet: data.magnet,
    on: function (e) {
      if (e.name == window.webtor.TORRENT_FETCHED) {
        console.log('Torrent fetched!', e.data);
      }
      if (e.name == window.webtor.TORRENT_ERROR) {
        console.log('Torrent error!');
      }
    },
    poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.value.poster_path}`,
    subtitles: [
      {
        srclang: 'en',
        label: 'test',
        src: 'https://raw.githubusercontent.com/andreyvit/subtitle-tools/master/sample.srt',
        default: true,
      }
    ],
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
<style scoped>
.container {
  width: 90%;
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
</style>
