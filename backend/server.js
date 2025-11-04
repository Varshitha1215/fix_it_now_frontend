const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Admin Credentials (Hardcoded)
const DEFAULT_ADMIN = {
  username: 'Varshitha1215',
  email: 'varshitha1215@gmail.com',
  password: 'varshitha1215'
};

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/fixitnow')
.then(() => {
  console.log('✅ MongoDB Connected');
  createDefaultAdmin();
})
.catch(err => console.log('❌ MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Scheduled Service Request Schema
const scheduledServiceSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  fromDate: { type: String, required: true },
  toDate: { type: String, required: true },
  contact: { type: String, required: true },
  extraInfo: { type: String },
  estimatedCost: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  numLiters: { type: Number },
  numPeople: { type: Number },
  serviceFrequency: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const ScheduledService = mongoose.model('ScheduledService', scheduledServiceSchema);

// Instant Service Request Schema (NEW)
const instantServiceSchema = new mongoose.Schema({
  serviceType: { type: String, required: true }, // "Plumbing", "Electrical", "Carpentry", "Painting"
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  problemDescription: { type: String, required: true },
  urgency: { type: String, default: 'Normal' }, // "Urgent", "Normal"
  estimatedCost: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, In Progress, Completed
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const InstantService = mongoose.model('InstantService', instantServiceSchema);

const generalServiceSchema = new mongoose.Schema({
  serviceCategory: { type: String, required: true }, // "Interior", "Exterior", "Eco-Friendly"
  selectedService: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  pincode: { type: String, required: true },
  preferredDate: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  instructions: { type: String },
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, In Progress, Completed
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const GeneralService = mongoose.model('GeneralService', generalServiceSchema);

// Create Default Admin Function
async function createDefaultAdmin() {
  try {
    const adminExists = await User.findOne({ username: DEFAULT_ADMIN.username });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(DEFAULT_ADMIN.password, 10);
      
      const defaultAdmin = new User({
        username: DEFAULT_ADMIN.username,
        email: DEFAULT_ADMIN.email,
        password: hashedPassword,
        isAdmin: true
      });
      
      await defaultAdmin.save();
      console.log('🔐 Default admin account created successfully!');
      console.log(`   Username: ${DEFAULT_ADMIN.username}`);
      console.log(`   Email: ${DEFAULT_ADMIN.email}`);
      console.log(`   Password: ${DEFAULT_ADMIN.password}`);
    } else {
      console.log('✅ Default admin account already exists');
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error);
  }
}

// ==================== AUTHENTICATION MIDDLEWARE ====================

// Middleware to verify JWT token and extract userId
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, 'your_jwt_secret_key_change_this_in_production', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.userId = user.userId;
    req.isAdmin = user.isAdmin;
    next();
  });
};

// ==================== AUTH ROUTES ====================

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (username === DEFAULT_ADMIN.username || email === DEFAULT_ADMIN.email) {
      return res.status(403).json({ message: 'This username/email is reserved for admin' });
    }

    if (isAdmin === true) {
      return res.status(403).json({ message: 'Admin registration is not allowed. Only the default admin can access admin panel.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false
    });

    await newUser.save();
    console.log(`✅ New user registered: ${username} (Admin: false)`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('❌ Register Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password, isAdmin } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    if (isAdmin === true) {
      if (
        (username === DEFAULT_ADMIN.username || username === DEFAULT_ADMIN.email) &&
        password === DEFAULT_ADMIN.password
      ) {
        const adminUser = await User.findOne({ username: DEFAULT_ADMIN.username });

        if (!adminUser) {
          return res.status(500).json({ message: 'Admin account not found in database' });
        }

        const token = jwt.sign(
          { userId: adminUser._id, isAdmin: true },
          'your_jwt_secret_key_change_this_in_production',
          { expiresIn: '24h' }
        );

        console.log(`✅ Admin logged in: ${adminUser.username}`);
        
        return res.json({
          message: 'Admin login successful',
          token,
          user: {
            id: adminUser._id,
            username: adminUser.username,
            email: adminUser.email,
            isAdmin: true
          }
        });
      } else {
        return res.status(403).json({ 
          message: 'Invalid admin credentials. Only default admin can login.' 
        });
      }
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isAdmin === true) {
      return res.status(403).json({ 
        message: 'This is an admin account. Please use Admin Login.' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: false },
      'your_jwt_secret_key_change_this_in_production',
      { expiresIn: '24h' }
    );

    console.log(`✅ User logged in: ${user.username}`);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: false
      }
    });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== USER-SPECIFIC ORDER ROUTES ====================

// Get all orders for a specific user
app.get('/api/user/orders', authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all three types of services for this user
    const scheduledServices = await ScheduledService.find({ userId }).sort({ createdAt: -1 });
    const instantServices = await InstantService.find({ userId }).sort({ createdAt: -1 });
    const generalServices = await GeneralService.find({ userId }).sort({ createdAt: -1 });

    // Combine all services with type indicator
    const allOrders = [
      ...scheduledServices.map(service => ({ ...service.toObject(), orderType: 'Scheduled' })),
      ...instantServices.map(service => ({ ...service.toObject(), orderType: 'Instant' })),
      ...generalServices.map(service => ({ ...service.toObject(), orderType: 'General' }))
    ];

    // Sort by creation date (most recent first)
    allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(`✅ Fetched ${allOrders.length} orders for user ${userId}`);
    res.json(allOrders);
  } catch (error) {
    console.error('❌ Get User Orders Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== SCHEDULED SERVICE ROUTES ====================

// Create Scheduled Service Request (UPDATED with authentication)
app.post('/api/services/scheduled', authenticateToken, async (req, res) => {
  try {
    const { 
      serviceType, 
      name, 
      address, 
      fromDate, 
      toDate, 
      contact, 
      extraInfo, 
      estimatedCost,
      numLiters,
      numPeople,
      serviceFrequency
    } = req.body;

    if (!serviceType || !name || !address || !fromDate || !toDate || !contact || !estimatedCost) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newService = new ScheduledService({
      serviceType,
      name,
      address,
      fromDate,
      toDate,
      contact,
      extraInfo: extraInfo || '',
      estimatedCost,
      numLiters,
      numPeople,
      serviceFrequency,
      userId: req.userId, // Add userId from authenticated token
      status: 'Pending'
    });

    await newService.save();
    console.log(`✅ New scheduled service created for user ${req.userId}: ${serviceType} by ${name}`);
    
    res.status(201).json({ 
      message: 'Service scheduled successfully!',
      service: newService
    });
  } catch (error) {
    console.error('❌ Schedule Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Scheduled Services
app.get('/api/services/scheduled', async (req, res) => {
  try {
    const services = await ScheduledService.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('❌ Fetch Scheduled Services Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Scheduled Service Status
app.patch('/api/services/scheduled/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const service = await ScheduledService.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    console.log(`✅ Scheduled service status updated: ${service.serviceType} - ${status}`);
    res.json(service);
  } catch (error) {
    console.error('❌ Update Scheduled Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete Scheduled Service
app.delete('/api/services/scheduled/:id', async (req, res) => {
  try {
    const service = await ScheduledService.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    console.log(`✅ Scheduled service deleted: ${service.serviceType}`);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('❌ Delete Scheduled Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== INSTANT SERVICE ROUTES ====================

// Create Instant Service Request (UPDATED with authentication)
app.post('/api/services/instant', authenticateToken, async (req, res) => {
  try {
    const { 
      serviceType, 
      name, 
      address, 
      contact, 
      problemDescription, 
      urgency,
      estimatedCost
    } = req.body;

    if (!serviceType || !name || !address || !contact || !problemDescription || !estimatedCost) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const newService = new InstantService({
      serviceType,
      name,
      address,
      contact,
      problemDescription,
      urgency: urgency || 'Normal',
      estimatedCost,
      userId: req.userId, // Add userId from authenticated token
      status: 'Pending'
    });

    await newService.save();
    console.log(`✅ New instant service created for user ${req.userId}: ${serviceType} by ${name}`);
    
    res.status(201).json({ 
      message: 'Instant service booked successfully!',
      service: newService
    });
  } catch (error) {
    console.error('❌ Instant Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Instant Services
app.get('/api/services/instant', async (req, res) => {
  try {
    const services = await InstantService.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('❌ Fetch Instant Services Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Instant Service Status
app.patch('/api/services/instant/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const service = await InstantService.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    console.log(`✅ Instant service status updated: ${service.serviceType} - ${status}`);
    res.json(service);
  } catch (error) {
    console.error('❌ Update Instant Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete Instant Service
app.delete('/api/services/instant/:id', async (req, res) => {
  try {
    const service = await InstantService.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    console.log(`✅ Instant service deleted: ${service.serviceType}`);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('❌ Delete Instant Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== GENERAL SERVICE ROUTES ====================

// Create General Service Request (UPDATED with authentication)
app.post('/api/services/general', authenticateToken, async (req, res) => {
  try {
    const { 
      serviceCategory,
      selectedService,
      name, 
      contact,
      pincode,
      preferredDate,
      gender,
      address,
      instructions
    } = req.body;

    if (!serviceCategory || !selectedService || !name || !contact || !pincode || !preferredDate || !gender || !address) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    
    const newService = new GeneralService({
      serviceCategory,
      selectedService,
      name,
      contact,
      pincode,
      preferredDate,
      gender,
      address,
      instructions: instructions || '',
      userId: req.userId, // Add userId from authenticated token
      status: 'Pending'
    });

    await newService.save();
    console.log(`✅ New general service created for user ${req.userId}: ${serviceCategory} - ${selectedService} by ${name}`);
    
    res.status(201).json({ 
      message: 'General service booked successfully!',
      service: newService
    });
  } catch (error) {
    console.error('❌ General Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All General Services
app.get('/api/services/general', async (req, res) => {
  try {
    const services = await GeneralService.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    console.error('❌ Fetch General Services Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update General Service Status
app.patch('/api/services/general/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const service = await GeneralService.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    console.log(`✅ General service status updated: ${service.serviceCategory} - ${service.selectedService} - ${status}`);
    res.json(service);
  } catch (error) {
    console.error('❌ Update General Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete General Service
app.delete('/api/services/general/:id', async (req, res) => {
  try {
    const service = await GeneralService.findByIdAndDelete(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    console.log(`✅ General service deleted: ${service.serviceCategory} - ${service.selectedService}`);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('❌ Delete General Service Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== OTHER ROUTES ====================

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'FixItNow Backend API is running!',
    defaultAdmin: {
      username: DEFAULT_ADMIN.username,
      email: DEFAULT_ADMIN.email,
      note: 'Only default admin can access admin panel'
    },
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      users: 'GET /api/users',
      userOrders: 'GET /api/user/orders (requires auth)',
      scheduleService: 'POST /api/services/scheduled (requires auth)',
      getScheduledServices: 'GET /api/services/scheduled',
      updateScheduledService: 'PATCH /api/services/scheduled/:id',
      deleteScheduledService: 'DELETE /api/services/scheduled/:id',
      instantService: 'POST /api/services/instant (requires auth)',
      getInstantServices: 'GET /api/services/instant',
      updateInstantService: 'PATCH /api/services/instant/:id',
      deleteInstantService: 'DELETE /api/services/instant/:id',
      generalService: 'POST /api/services/general (requires auth)',
      getGeneralServices: 'GET /api/services/general',
      updateGeneralService: 'PATCH /api/services/general/:id',
      deleteGeneralService: 'DELETE /api/services/general/:id'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`🔐 Default Admin: ${DEFAULT_ADMIN.username}`);
});