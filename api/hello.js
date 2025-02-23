// api/hello.js
app.get('/api/hello', (req, res) => {
    res.json({
        message: "Hello from the Node.js API!"  // This message will be shown in the HTML
    });
});
