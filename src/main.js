import fetch from "node-fetch"

async function getCharacterData(character) {
    try {
        if (!character) return console.error("Você precisa inserir o nome de um personagem!")

        let url = `https://genshin-db-api.vercel.app/api/characters?query=${character}&queryLanguages=Portuguese&resultLanguage=Portuguese`
        const response = await fetch(url).catch(err => console.error("Erro: ", err))
        const data = await response.json()

        return data
    } catch (error) {
        throw new Error("Erro! Por favor tente novamente...")
    }
}

const character = process.argv[2] // nome do personagem
const { images, name, element, title, weapontype, constellation, rarity, region, affiliation, gender, cv, version, birthdaymmdd, description } = await getCharacterData(character)

function setDate(date) {
    let birthday = date.split("/")
    let [month, day] = birthday

    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}`
}

const birthday = setDate(birthdaymmdd)
const weapon = weapontype === "Arco" ? "Arco 🏹" :
    weapontype === "Catalisador" ? "Catalisador 📖" :
        weapontype === "Espadão" ? "Espadão 🪓" :
            weapontype === "Lança" ? "Lança 🔱" :
                weapontype === "Espada" ? "Espada ⚔️" : "Tipo de arma desconhecida!"

console.log(`
- Imagem: ${images.icon}
- Nome: ${name}
- Título: ${title} 📜
- Visão: ${element}
- Raridade: ${rarity}⭐
- Constelação: ${constellation}
- Nação: ${region} 🏳️
- Afiliação: ${affiliation}
- Sexo: ${gender}
- Aniversário: ${birthday} 🎂
- Arma: ${weapon}
- Dublador(a): ${cv.english}(Inglês)🎤 | ${cv.chinese}(Chinês)🎤 | ${cv.japanese}(Japonês)🎤 | ${cv.korean}(Coreano)🎤
- Lançamento: ${version} 📅
- Descrição: ${description}📝
`) // exemplo de como usar
