fetch('/pets').then(res => res.json()).then(json => {
    pets = json.payload;
    let container = document.getElementById('pet-container');
    pets.forEach(pet => {
        let {name, specie, thumbnail} = pet;
        let card = document.createElement('div');
        card.classList.add('pet-card');
        card.innerHTML=`
        <h1 class="pet-text">${name}</h1>
        <p class="pet-text">${specie}</p>
        <img src=${thumbnail}>
        `
        container.appendChild(card)
    });
})



let form = document.getElementById('petForm');
const handleSubmit = (e, form, route) => {
    e.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData
    }).then(result => result.json()).then(json => console.log(json))
    form.reset();
}
form.addEventListener('submit', (e) => {
    handleSubmit(e, e.target, '/pets')
})