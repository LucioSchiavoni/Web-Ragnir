
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
    Toastify({
        text: "Se registro con exito",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #A90000, #000)",
        },
        onClick: function () { }
    }).showToast();
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

///Boton Dark mode

const btnSwitch = document.querySelector("#switch");

btnSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btnSwitch.classList.toggle("active");


    //Lo guardamos en el localstorage

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("dark-mode", "true");
    } else {
        localStorage.setItem("dark-mode", "false");
    }
});
//El modo actual
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark");
    btnSwitch.classList.add("active");
} else {
    document.body.classList.remove("dark");
    btnSwitch.classList.remove("active");
}