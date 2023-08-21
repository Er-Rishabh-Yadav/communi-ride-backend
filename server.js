// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const apiRoutes = require('./routes/api');
// Define your routes here

app.use('/api', apiRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
