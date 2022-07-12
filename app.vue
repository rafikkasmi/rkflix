<template>
  <div>

    <Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js"
        charset="utf-8"
        async
      ></Script>
    </Head>
    <NuxtLayout class="root">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@300;400&display=swap");
:root {
  --orange: rgb(255, 140, 16);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
}
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
