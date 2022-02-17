let form = document.getElementById('productsForm');
let cardsContainer = document.getElementById('productsContainer')

fetch('/products').then(res=>res.json()).then(json=>{
    let products = json.payload;
    products.forEach(prod => {
        let { name, stock, thumbnail }= prod
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                        <p class="card-title">${name}</p>
                        <p class="card-stock">Stock: ${stock}</p>
                        <img src=${thumbnail}>
                        `
        cardsContainer.appendChild(card);
    });
})

const handleSubmit = (e, form, route) => {
    e.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData
    }).then(result => result.json()).then(json => console.log(json))
    form.reset();
}

form.addEventListener('submit', (e) => handleSubmit(e, e.target, '/products'))