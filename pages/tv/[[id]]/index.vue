<template>
  <div>
    {{season}}
    <div v-if="pending">
      Loading ...
    </div>
    <div v-else>
      <div class="container">
        <div class="header">
          <img
            :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvshow.poster_path}`"
            :alt="tvshow.original_title"
          >
          <div class="text">
            <h1>{{tvshow.original_title || tvshow.original_name}}</h1>
            <p>{{tvshow.overview}}</p>
          </div>
        </div>
        <!-- {{JSON.stringify(tvshow)}} -->
        <select
          placeholder="Season"
          v-model="season"
          @change="changeSeason"
        >
          <option
            disabled
            value="0"
          >Please select one</option>
          <template v-for="{name ,season_number} in tvshow.seasons">
            <option
              :value="season_number"
              v-if="season_number != 0"
            >{{name}}</option>
          </template>
        </select>
        <select
          placeholder="Season"
          v-model="episode"
          v-if="season != 0"
        >
          <option
            disabled
            value="0"
          >Please select one</option>
          <option
            v-for="ep,i in episodes"
            :value="ep.episode_number"
          >{{ep.name}}</option>
        </select>
        <button
          v-if="episode && season"
          @click="watch"
        >Watch</button>
        {{`S${season}E${episode}`}}
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
const { pending, data: tvshow } = await movieAPI(`/tv/${route.params.id}`)
const showPlayer = ref(true)
const magnet = ref("")
const season = ref(0)
const episode = ref(0)
const episodes = ref([])


const changeSeason = async () => {
  const { data } = await movieAPI(`/tv/${route.params.id}/season/${season.value}`)
  episodes.value = data.value.episodes

}

const watch = async () => {
  const movie = `${tvshow.value.original_title || tvshow.value.original_name} S${("0" + season.value).slice(-2)}E${("0" + episode.value).slice(-2)}`
  const data = await $fetch('/api/get-magnet', { method: 'post', body: { movie } })
  magnet.value = data.magnet
  // showPlayer.value = true
  document.querySelector('#player').innerHTML = "";
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
    poster: `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvshow.value.poster_path}`,
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
