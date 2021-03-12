const mongoose = require('mongoose');

// import enviromnet varibles from variables.env
require('dotenv').config({ path: 'variables.env' }); // to access config via proces.env

// Connect to database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise; // mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
});

require('./models/Book');
require('./models/Order');
require('./models/User');

const app = require('./app');
app.set('port', process.env.PORT || 6000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running => PORT ${server.address().port}`);
});
