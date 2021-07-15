const usersContent = `
<h1>Ilyas Ilyasov</h1>
<p>Hello World!</p>
`;

const footerButtons = [
    {text: 'Ok', type: 'primary', handler() {
        console.log('primary btm clicked!');
        modal.close();
    }},
    {text: 'Cancel', type: 'danger', handler() {
        console.log('danger btm clicked!');
        modal.close();
    }}
]
const modal = $.modal('Users title', true, usersContent, '600px', footerButtons);