const { app } = require('./lib/routers');
const PORT = 4000;

const main = function(){
  app.listen(PORT, () => process.stdout.write(`listening ${PORT}`));
};

main();
