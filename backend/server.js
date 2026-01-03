const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mokshayatra', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
// app.use('/api/bookings', require('./routes/booking'));
app.use("/api/bookings", require("./routes/booking"));

// app.use('/api/payments', require('./routes/payment'));
// app.use('/api/admin', require('./routes/admin'));

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'MokshaYatra Backend API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



app.get("/test-db", async (req, res) => {
  const Test = mongoose.connection.db.collection("test");
  await Test.insertOne({ project: "mokshayatra", time: new Date() });
  res.send("Test data inserted");
});
