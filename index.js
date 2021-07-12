const usersContent = `
<h1>Ilyas Ilyasov</h1>
<p>Hello World!</p>
`;
const modal = $.modal({
    title: "User's title",
    closable: true,
    content: `
    <h1>Content title</h1>
    <p>User's content</p>`,
    width: '600px'
});