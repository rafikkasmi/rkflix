
export default defineEventHandler(async (event) => {
    const { movie: title } = await useBody(event)
    const data = await $fetch(`https://knaben.eu/search/?cat=All&q=${title.split(' ').join("+")}&fast=0`)
    const regex = /(\b(magnet:\?xt=)[^"]*)/i
    const found = data.match(regex);
    return {
        magnet: found[0]
    }
})