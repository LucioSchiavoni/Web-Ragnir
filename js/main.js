
class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;


    }

}

let usuarios = [];

localStorage.getItem("usuarios") ? usuarios = JSON.parse(localStorage.getItem("usuarios")) : localStorage.setItem("usuarios", JSON.stringify(usuarios));




const form = document.getElementById("idForm");
const divUsuarios = document.getElementById("divUsuarios");
const botonUsuarios = document.getElementById("botonUsuarios");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let datForm = new FormData(e.target);
    let usuario = new User(datForm.get("nombre"), datForm.get("email"));
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    form.reset();

})


botonUsuarios.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("usuarios"));
    divUsuarios.innerHTML = "";
    arrayStorage.forEach((usuario, indice) => {
        divUsuarios.innerHTML += `
     <div class="card-content" id="usuario${indice}" style="max-width: 20rem; margin: 4px;">
        <div><h2>Bienvenido ${usuario.name}</h2></div>
        <div >
            <p><b>Su registro fue aprobado con su mail:</b> ${usuario.email}</p>
            <button class="btn btn-primary ">Eliminar</button>
        </div>
    </div>
    `
    });



    arrayStorage.forEach((usuario, indice) => {
        let botonCard = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild;
        botonCard.addEventListener("click", () => {
            document.getElementById(`usuario${indice}`).remove();
            usuarios.splice(indice, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            console.log(`${usuario.name} Eliminada`);

        });
    });


});
