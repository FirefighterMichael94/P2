const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const cron = require('node-cron');
const Story = require('../models/Story');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Define a cron job to run every hour
cron.schedule('0 * * * *', async () => {
    try {
      // Find stories created more than 24 hours ago
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const expiredStories = await Story.findAll({
        where: {
          date_created: {
            [Op.lt]: twentyFourHoursAgo
          }
        }
      });
  
      // Delete expired stories
      for (const story of expiredStories) {
        await story.destroy();
      }
  
      console.log(`${expiredStories.length} expired stories deleted.`);
    } catch (error) {
      console.error('Error deleting expired stories:', error);
    }
  });


// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
