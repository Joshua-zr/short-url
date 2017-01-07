module.exports = app => {
  var redirectHost = [];
  app.get('/', (req, res) => {
    res.send('hello, world');
  });

  app.get('/:id', (req, res) => {
    var searchItem = req.params.id,
        index = -1;
    for (var i = 0; i < redirectHost.length; i++) {
      if (redirectHost[i].randomNum === searchItem) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      res.redirect(redirectHost[index].originalHost);
    } else {
      res.send('This url is not on the database.');
    }
  });

  app.get('/new/*', (req, res) => {
    var originalUrl = req.originalUrl;
    var matchUrl = originalUrl.match(/\/new\/http(s)?\:\/\/(.)+/i);
    if (matchUrl !== null) {
      var newRedirectHost = {
        originalHost: originalUrl.replace('/new/', ''),
        randomNum: 1000 + Math.floor(Math.random() * 8000) + ''
      };
      redirectHost.push(newRedirectHost);
      res.send({
        originalUrl: newRedirectHost.originalHost,
        shortUrl: req.hostname + '/' + newRedirectHost.randomNum
      });
    } else {
      res.send('网址格式有问题, 请仔细检查');
    }
  });

};
