import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({
    message: 'I am a server yea route and can also be hot reloaded!'
  })
});

export default app;
