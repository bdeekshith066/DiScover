// index.js

const express = require('express');
const mongoose = require('mongoose');
const placeRouter = require('./routes/places');
const categoryRouter = require('./routes/categories');
const { router: authRouter, verifyToken } = require('./routes/auth');
const userInteractionsRouter = require('./routes/userInteractions');
const searchRouter = require('./routes/search');
const authenticationRouter = require('./routes/authentication');
const userPlacesRouter = require('./routes/userPlaces');
const placeRatingsRouter = require('./routes/placeRatings');
const placeSortingRouter = require('./routes/placeSorting');
const userProfileRouter = require('./routes/userProfile');
const mapsIntegrationRouter = require('./routes/mapsIntegration');
const placeFiltersRouter = require('./routes/placeFilters');
const securityEnhancementsRouter = require('./routes/securityEnhancements');
const paginationRouter = require('./routes/pagination');
const notificationsRouter = require('./routes/notifications');
const socialInteractionsRouter = require('./routes/socialInteractions');
const analyticsRouter = require('./routes/analytics');
const performanceOptimizationRouter = require('./routes/performanceOptimization');
const communityController = require('./controllers/communityController');
const errorHandler = require('./security/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/travelApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(express.json());

// Authentication routes
app.use('/auth', authRouter);

// Secure routes
app.use('/places', verifyToken, placeRouter);
app.use('/categories', verifyToken, categoryRouter);
app.use('/user', verifyToken, userInteractionsRouter);
app.use('/user/places', verifyToken, userPlacesRouter);
app.use('/place', verifyToken, placeRatingsRouter);
app.use('/places/sort', verifyToken, placeSortingRouter);
app.use('/user/profile', verifyToken, userProfileRouter);
app.use('/maps', verifyToken, mapsIntegrationRouter);
app.use('/places/filter', verifyToken, placeFiltersRouter);
app.use('/security', verifyToken, securityEnhancementsRouter);
app.use('/pagination', verifyToken, paginationRouter);
app.use('/notifications', verifyToken, notificationsRouter);
app.use('/social', verifyToken, socialInteractionsRouter);
app.use('/analytics', verifyToken, analyticsRouter);
app.use('/performance', verifyToken, performanceOptimizationRouter);

// Community Filter Route
app.get('/community/filter/:filterType', async (req, res) => {
  try {
    const { filterType } = req.params;
    const filteredPlans = await communityController.getFilteredCommunityPlans(filterType);
    res.json(filteredPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




