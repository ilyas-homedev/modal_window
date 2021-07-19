let fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://images.heb.com/is/image/HEBGrocery/000320625'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://producemadesimple.ca/wp-content/uploads/2015/01/orange-web-600x450.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://a.allegroimg.com/s512/11d3b2/2c069bd0495d9f74579eea104ce9/Mango-Dojrzale-z-drzewa-BY-AIR-PERU'}
]

let modalInfo = {
    title: "Price",
    closable: true,
    width: '600px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            modal.close();
        }}
    ]
}

// Mock of fruit card
const toHTML = fruit => `
<div class="col">
    <div class="card">
        <img src="${fruit.img}" style="height: 300px;" class="card-img-top" alt="${fruit.title}">
        <div class="card-body">
            <h5 class="card-title">${fruit.title}</h5>
            <a href="#" data-btn="price" data-id="${fruit.id}" class="btn btn-primary">See price</a>
            <a href="#" data-btn="remove" data-id="${fruit.id}" class="btn btn-danger">Delete</a>
        </div>
    </div>
</div>
`


// Function for rendering list of fruits
function render() {
    const html = fruits.map((fruit) => toHTML(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html;
}

render();








// Detecting card in the DOM
// const cards = document.querySelectorAll('.card');
// cards.forEach(card => {
//     const cardTitle = card.querySelector('.card-title');
//     const seePrice = card.querySelector('[data-seeprice]');


//     seePrice.addEventListener('click', function() {
//         fruits.forEach(fruit => {
//             console.log(fruit.id)
//             if(cardTitle.textContent === fruit.title) {
//                 modalInfo.title = fruit.title;
//                 modalInfo.closable = false;
//                 modalInfo.content = `<h2>Price of ${fruit.title}: ${fruit.price}$</h2>`;
//                 modalInfo.width = '400px';
//                 modalInfo.footerButtons = [
//                     {text: 'Ok', type: 'primary', handler() {
//                         console.log('primary btm clicked!');
//                         modal.close();
//                     }}
//                 ];
//                 console.log(modalInfo);
//             }
//         })
//         $.modal(modalInfo);

//         modal.open();
//     })
// });

const modal = $.modal(modalInfo);

document.addEventListener('click', function(event) {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

    if(btnType === "price") {
        modal.setContent(`
        <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)

        modal.open();
    }

    if(btnType === "remove") {
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You are deleting fruit: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id);
            render();
        })
        .catch(() => {
            console.log('Cancel');
        })
    }
})