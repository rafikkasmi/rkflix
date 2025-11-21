<template>
  <div class="container-noflex">
    <div v-if="pending">Loading ...</div>
    <div v-else class="wrapper">
      <div class="topsection">
        <div class="overlay">
          <img
            class="bg"
            :src="`https://image.tmdb.org/t/p/w1920_and_h800_bestv2/${tvshow.backdrop_path}`"
          />
          <div class="content" v-if="step == 0">
            <i class="arrow" @click="$router.back()"></i>
            <img
              :src="`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${tvshow.poster_path}`"
              :alt="tvshow.original_title || tvshow.original_name"
            />
            <div class="text">
              <h1>{{ tvshow.original_title || tvshow.original_name }}</h1>
              <h4>Popularity:</h4>
              <ShowPie :vote="tvshow.vote_average" />
              <h4>Overview:</h4>
              <p>{{ tvshow.overview }}</p>
              <select
                placeholder="Season"
                v-model="season"
                @change="changeSeason"
              >
                <option disabled value="0">Please select one</option>
                <template v-for="{ name, season_number } in tvshow.seasons">
                  <option :value="season_number" v-if="season_number != 0">
                    {{ name }}
                  </option>
                </template>
              </select>
              <select placeholder="Season" v-model="episode" v-if="season != 0">
                <option disabled value="0">Please select one</option>
                <option v-for="(ep, i) in episodes" :value="ep.episode_number">
                  {{ ep.name }}
                </option>
              </select>
              <button v-if="episode && season" @click="watch">
                Watch Now !
              </button>
              {{ `S${season}E${episode}` }}
            </div>
          </div>
          <div class="container" v-else>
            <i class="arrow" @click="step = 0"></i>
            <div class="wrapper-iframe">
              <iframe
                :src="`https://vidsrc-me.ru/embed/tv/${route.params.id}/${season}/${episode}?autoplay=true`"
                loading="lazy"
                style="border: none; height: 100%; width: 100%"
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowfullscreen="true"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const step = ref(0);

const route = useRoute();
const { pending, data: tvshow } = await movieAPI(`/tv/${route.params.id}`);
const showPlayer = ref(true);
const magnet = ref("");
const season = ref(0);
const episode = ref(0);
const episodes = ref([]);

const changeSeason = async () => {
  const { data } = await movieAPI(
    `/tv/${route.params.id}/season/${season.value}`
  );
  episodes.value = data.value.episodes;
};

const watch = async () => {
  step.value = 1;
  const movie = `${
    tvshow.value.original_title || tvshow.value.original_name
  } S${("0" + season.value).slice(-2)}E${("0" + episode.value).slice(-2)}`;
  const data = await $fetch("/api/get-magnet", {
    method: "post",
    body: { movie },
  });

  // return navigateTo(`${route.path}/watch`)
};
</script>
<style scoped lang="scss">
.wrapper {
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
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
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
    height: 100%;
  }
  .topsection {
    height: 100%;
    .overlay {
      flex-direction: column;
      height: auto;
      min-height: 100vh;
      .content {
        height: auto;
        margin: 100px auto;
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

select {
  margin: 10px 0;
  display: block;
  width: 300px;
  height: 40px;
  border: none;
  border-radius: 5px;
}

.container-noflex {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper-iframe {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  aspect-ratio: 16/9;
  max-width: 1000px;
}
</style>
