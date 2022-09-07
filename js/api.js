const games = document.getElementById("games");


document.addEventListener("DOMContentLoaded", e => {
    fetchData();
});




const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'd115807915msh4d1237c55059dedp1c9fd0jsn321522399b47',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

const fetchData = async () => {
    try {
        const res = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc', options);
        const data = await res.json();
        console.log(data);
        gamesId(data);
        inputName(data);

    } catch (error) {
        console.log(error);
    };


};



const gamesId = data => {
    let elementos = "";
    data.forEach(element => {
        elementos += `
        <div class="card">
        <div class="item-content">
                    <h2>${element.title}</h2><br>
                    <img src="${element.thumbnail}"/>
                    <p><b>Genero:</b> ${element.genre}</p >
                    <p><b>Plataforma:</b> ${element.platform}</p>
                    <p><b>Empresa:</b> ${element.publisher}</p>
                    <p><b>Publicado:</b> ${element.release_date}</p>
                    <button class="btn btn-dark button"><a href="${element.game_url}"><b>Jugar</b></a></button>
                </div>
            </div>
            `
        games.innerHTML = elementos;
    })
}


const formJuegos = document.getElementById("formJuegos");
const inputGames = document.getElementById("inputGames");
const inputName = data => {
    formJuegos.addEventListener("keyup", e => {
        e.preventDefault();
        const letraUser = inputGames.value.toLowerCase();
        const arrayFilter = data.filter(item => {
            const inputData = item.title.toLowerCase();
            if (inputData.indexOf(letraUser) !== -1) {
                return item;
            };
        });
        gamesId(arrayFilter);
    });
};