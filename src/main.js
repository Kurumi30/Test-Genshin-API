import fetch from "node-fetch"

async function getCharacterData(character) {
    try {
        if (!character) return console.error("Você precisa inserir o nome de um personagem!")

        let url = `https://genshin-db-api.vercel.app/api/characters?query=${character}&queryLanguages=portuguese`
        const response = await fetch(url).catch(err => console.error("Erro: ", err))
        const data = await response.json()

        return data
    } catch (error) {
        return console.error("Erro! Por favor tente novamente...")
    }
}

const character = "Lisa"
const { images, name, element, title, weapontype, constellation, rarity, region, affiliation, cv, version, birthdaymmdd } = await getCharacterData(character)

function setDate(date) {
    let birthday = date.split("/")
    let [month, day] = birthday

    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}`
}

const birthday = setDate(birthdaymmdd)
const weapon = weapontype === "Bow" ? "🏹  Arco" :
    weapontype === "Catalyst" ? "📖  Catalisador" :
        weapontype === "Claymore" ? "🪓  Espadão" :
            weapontype === "Polearm" ? "🔱  Lança" :
                weapontype === "Sword" ? "⚔️  Espada" : "Tipo de arma desconhecida!"

console.log(`
- Imagem: ${images.icon}
- Nome: ${name}
- Título: ${title} 📜
- Visão: ${element}
- Raridade: ${rarity}⭐
- Constelação: ${constellation}
- Nação: ${region} 🏳️
- Afiliação: ${affiliation}
- Aniversário: ${birthday} 🎂
- Arma: ${weapon}
- Dublador(a): ${cv.english}(Inglês) | ${cv.chinese}(Chinês) | ${cv.japanese}(Japonês) | ${cv.korean}(Coreano)
- Lançamento: ${version} 📅
`)
