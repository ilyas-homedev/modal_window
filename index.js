const fruits = [
    {id: 1, title: 'Apples', price: 20, img: 'https://images.heb.com/is/image/HEBGrocery/000320625'},
    {id: 2, title: 'Oranges', price: 30, img: 'https://producemadesimple.ca/wp-content/uploads/2015/01/orange-web-600x450.jpg'},
    {id: 3, title: 'Mango', price: 40, img: 'https://a.allegroimg.com/s512/11d3b2/2c069bd0495d9f74579eea104ce9/Mango-Dojrzale-z-drzewa-BY-AIR-PERU'}
]

const modal = $.modal({
    titlse: "Users title",
    closable: true,
    content: `
    <h1>Ilyas Ilyasov</h1>
    <p>Hello World!</p>
    `,
    width: '600px',
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('primary btm clicked!');
            modal.close();
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('danger btm clicked!');
            modal.close();
        }}
    ]
})