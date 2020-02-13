const { app } = require('./lib/handlers');
const PORT = 4000;
app.listen(PORT, () => console.log('listening', PORT));
