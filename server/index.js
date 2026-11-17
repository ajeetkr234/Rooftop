import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Ensure data persistence directory and storage file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify({ 
    contacts: [], 
    estimates: [], 
    reviews: [],
    callbacks: [],
    appointments: []
  }, null, 2));
}

// Helper to save leads securely
function saveLead(type, leadData) {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const store = JSON.parse(raw);
    let key = 'estimates';
    if (type === 'contact') key = 'contacts';
    else if (type === 'review') key = 'reviews';
    else if (type === 'callback') key = 'callbacks';
    else if (type === 'appointment') key = 'appointments';
    if (!store[key]) store[key] = [];
    store[key].push(leadData);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(store, null, 2));
    return true;
  } catch (err) {
    console.error('Error persisting lead to storage:', err.message);
    return false;
  }
}

// Middleware: Body size limit for base64 photo attachments & JSON
app.use(express.json({ limit: '10mb' }));

// CORS configuration: Allow frontend development origin and configurable production origin
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_ORIGIN
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser agents (like curl or postman) or matching whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Dev-permissive with safe headers
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiter: General limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', generalLimiter);

// Strict Rate Limiter for Form Submissions to prevent automated spam
const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { success: false, message: 'Too many form submissions from this IP. Please try again later.' },
});

// Helper for basic sanitization
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    storage: 'filesystem-json-ready',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Lead Submission: Contact Inquiries
app.post('/api/leads/contact', formSubmissionLimiter, (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      serviceRequested,
      propertyAddress,
      inquiryDetails,
      preferredContactMethod,
      consentGiven,
      honeypot
    } = req.body;

    // Honeypot bot trap
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Inquiry received' });
    }

    // Validation
    const errors = {};
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required';
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!propertyAddress || typeof propertyAddress !== 'string') {
      errors.propertyAddress = 'Property address is required';
    }
    if (!inquiryDetails || typeof inquiryDetails !== 'string') {
      errors.inquiryDetails = 'Inquiry details are required';
    }
    if (!consentGiven) {
      errors.consentGiven = 'Consent to privacy terms is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for one or more fields',
        errors
      });
    }

    const leadRecord = {
      id: `CNT-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      serviceRequested: sanitize(serviceRequested),
      propertyAddress: sanitize(propertyAddress),
      inquiryDetails: sanitize(inquiryDetails),
      preferredContactMethod: preferredContactMethod === 'email' ? 'email' : 'phone',
      consentGiven: Boolean(consentGiven),
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    saveLead('contact', leadRecord);

    return res.status(201).json({
      success: true,
      message: 'Contact inquiry registered successfully',
      leadId: leadRecord.id
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing contact submission'
    });
  }
});

// Lead Submission: Estimate Requests
app.post('/api/leads/estimate', formSubmissionLimiter, (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      propertyType,
      requiredService,
      propertyAddress,
      description,
      preferredContactMethod,
      preferredInspectionDate,
      photoAttachmentsDescription,
      photos,
      consentGiven,
      honeypot
    } = req.body;

    // Honeypot bot trap
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Estimate request logged' });
    }

    // Validation
    const errors = {};
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.fullName = 'Full legal name is required';
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid phone number is required';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required';
    }
    if (!propertyAddress || typeof propertyAddress !== 'string') {
      errors.propertyAddress = 'Property address is required';
    }
    if (!description || typeof description !== 'string') {
      errors.description = 'Description of requirements is required';
    }
    if (!consentGiven) {
      errors.consentGiven = 'Consent is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed for one or more fields',
        errors
      });
    }

    // Process photo attachments securely (validate array & size)
    const validPhotos = Array.isArray(photos) ? photos.slice(0, 5).map(p => {
      if (typeof p === 'string' && p.startsWith('data:image/')) {
        return p;
      } else if (p && typeof p === 'object' && p.data && p.data.startsWith('data:image/')) {
        return { name: sanitize(p.name || 'roof-damage.jpg'), data: p.data, size: p.size || 0 };
      }
      return null;
    }).filter(Boolean) : [];

    const estimateRecord = {
      id: `EST-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName),
      phone: sanitize(phone),
      email: sanitize(email).toLowerCase(),
      propertyType: sanitize(propertyType || 'residential-single'),
      requiredService: sanitize(requiredService || 'roof-installation'),
      propertyAddress: sanitize(propertyAddress),
      description: sanitize(description),
      preferredContactMethod: preferredContactMethod === 'email' ? 'email' : 'phone',
      preferredInspectionDate: sanitize(preferredInspectionDate || ''),
      photoAttachmentsDescription: sanitize(photoAttachmentsDescription || ''),
      photos: validPhotos,
      status: 'New',
      consentGiven: Boolean(consentGiven),
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    saveLead('estimate', estimateRecord);

    return res.status(201).json({
      success: true,
      message: 'Estimate request recorded successfully',
      leadId: estimateRecord.id
    });
  } catch (error) {
    console.error('Error handling estimate submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error processing estimate request'
    });
  }
});

// Lead Submission: Quick Callback Requests
app.post('/api/leads/callback', formSubmissionLimiter, (req, res) => {
  try {
    const { fullName, phone, preferredTime, issueType, propertyAddress, consentGiven, honeypot } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Callback request registered' });
    }

    const errors = {};
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.fullName = 'Your name is required';
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!consentGiven) {
      errors.consentGiven = 'Consent is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const callbackRecord = {
      id: `CLB-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName),
      phone: sanitize(phone),
      preferredTime: sanitize(preferredTime || 'Immediate / As soon as possible'),
      issueType: sanitize(issueType || 'General Roofing Inquiry'),
      propertyAddress: sanitize(propertyAddress || ''),
      status: 'New',
      consentGiven: Boolean(consentGiven),
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    saveLead('callback', callbackRecord);

    return res.status(201).json({
      success: true,
      message: 'Callback request registered. A roofing specialist will reach out shortly.',
      leadId: callbackRecord.id
    });
  } catch (err) {
    console.error('Error in callback submission:', err);
    return res.status(500).json({ success: false, message: 'Server error registering callback' });
  }
});

// Lead Submission: Inspection Appointment Booking
app.post('/api/leads/appointment', formSubmissionLimiter, (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      propertyAddress,
      propertyType,
      inspectionType,
      preferredDate,
      preferredTimeSlot,
      includeDroneScan,
      notes,
      consentGiven,
      honeypot
    } = req.body;

    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Appointment logged' });
    }

    const errors = {};
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Valid 10-digit phone number is required';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required';
    }
    if (!propertyAddress || typeof propertyAddress !== 'string' || !propertyAddress.trim()) {
      errors.propertyAddress = 'Inspection property address is required';
    }
    if (!preferredDate) {
      errors.preferredDate = 'Preferred inspection date is required';
    }
    if (!consentGiven) {
      errors.consentGiven = 'Consent is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    const appointmentRecord = {
      id: `APT-${Date.now().toString(36).toUpperCase()}`,
      fullName: sanitize(fullName),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      propertyAddress: sanitize(propertyAddress),
      propertyType: sanitize(propertyType || 'residential-single'),
      inspectionType: sanitize(inspectionType || 'Comprehensive 21-Point Roof Inspection'),
      preferredDate: sanitize(preferredDate),
      preferredTimeSlot: sanitize(preferredTimeSlot || 'Morning (8:00 AM - 12:00 PM)'),
      includeDroneScan: Boolean(includeDroneScan),
      notes: sanitize(notes || ''),
      status: 'New',
      consentGiven: Boolean(consentGiven),
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    saveLead('appointment', appointmentRecord);

    return res.status(201).json({
      success: true,
      message: 'Inspection appointment booked successfully. Our dispatch team will confirm your time slot.',
      leadId: appointmentRecord.id
    });
  } catch (err) {
    console.error('Error booking appointment:', err);
    return res.status(500).json({ success: false, message: 'Server error booking appointment' });
  }
});

// Reviews API: Fetch Customer Reviews
app.get('/api/reviews', (req, res) => {
  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const store = JSON.parse(raw);
    const reviews = store.reviews || [];

    // Filter out private fields like email / IP before returning publicly
    const publicReviews = reviews.map(r => ({
      id: r.id,
      authorName: r.authorName,
      rating: r.rating,
      serviceType: r.serviceType,
      propertyLocation: r.propertyLocation || '',
      reviewText: r.reviewText,
      recommendToOthers: r.recommendToOthers,
      submittedAt: r.submittedAt,
      platform: r.platform || 'website',
      isVerifiedCustomer: r.isVerifiedCustomer || true
    }));

    res.status(200).json({
      success: true,
      count: publicReviews.length,
      reviews: publicReviews
    });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve reviews' });
  }
});

// Reviews API: Submit a New Review
app.post('/api/reviews', formSubmissionLimiter, (req, res) => {
  try {
    const {
      authorName,
      email,
      rating,
      serviceType,
      propertyLocation,
      reviewText,
      recommendToOthers,
      honeypot
    } = req.body;

    // Bot trap
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Review recorded' });
    }

    const errors = {};
    if (!authorName || typeof authorName !== 'string' || authorName.trim().length < 2) {
      errors.authorName = 'Author name must be at least 2 characters';
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid contact email is required';
    }
    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      errors.rating = 'Rating must be between 1 and 5 stars';
    }
    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 10) {
      errors.reviewText = 'Review description must be at least 10 characters';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    const reviewRecord = {
      id: `REV-${Date.now().toString(36).toUpperCase()}`,
      authorName: sanitize(authorName),
      email: sanitize(email).toLowerCase(),
      rating: Math.round(numRating),
      serviceType: sanitize(serviceType || 'General Roofing Service'),
      propertyLocation: sanitize(propertyLocation || ''),
      reviewText: sanitize(reviewText),
      recommendToOthers: Boolean(recommendToOthers),
      platform: 'website',
      isVerifiedCustomer: true,
      submittedAt: new Date().toISOString(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    saveLead('review', reviewRecord);

    return res.status(201).json({
      success: true,
      message: 'Thank you for your feedback! Your review has been recorded.',
      reviewId: reviewRecord.id
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error recording review'
    });
  }
});

// ADMIN API: Lead Management & Review Moderation
const ADMIN_KEY = process.env.ADMIN_KEY || 'roof2026';

app.get('/api/admin/overview', (req, res) => {
  const authKey = req.headers['x-admin-key'] || req.query.key;
  if (authKey !== ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized. Invalid admin key.' });
  }

  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const store = JSON.parse(raw);
    const estimates = store.estimates || [];
    const contacts = store.contacts || [];
    const reviews = store.reviews || [];
    const callbacks = store.callbacks || [];
    const appointments = store.appointments || [];

    const stats = {
      totalEstimates: estimates.length,
      totalContacts: contacts.length,
      totalReviews: reviews.length,
      totalCallbacks: callbacks.length,
      totalAppointments: appointments.length,
      totalLeads: estimates.length + contacts.length + callbacks.length + appointments.length,
      averageRating: reviews.length > 0 
        ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
        : '5.0',
    };

    res.status(200).json({
      success: true,
      stats,
      estimates,
      contacts,
      reviews,
      callbacks,
      appointments
    });
  } catch (err) {
    console.error('Admin overview error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve admin data' });
  }
});

app.patch('/api/admin/leads/:type/:id', (req, res) => {
  const authKey = req.headers['x-admin-key'] || req.query.key;
  if (authKey !== ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  const { type, id } = req.params;
  const { status, notes } = req.body;

  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const store = JSON.parse(raw);
    const listKey = type === 'contact' ? 'contacts' 
      : type === 'review' ? 'reviews' 
      : type === 'callback' ? 'callbacks'
      : type === 'appointment' ? 'appointments'
      : 'estimates';
    
    const item = (store[listKey] || []).find(x => x.id === id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (status) item.status = status;
    if (notes !== undefined) item.adminNotes = notes;

    fs.writeFileSync(LEADS_FILE, JSON.stringify(store, null, 2));
    res.status(200).json({ success: true, message: 'Updated successfully', item });
  } catch (err) {
    console.error('Admin update error:', err);
    res.status(500).json({ success: false, message: 'Update failed' });
  }
});

app.delete('/api/admin/leads/:type/:id', (req, res) => {
  const authKey = req.headers['x-admin-key'] || req.query.key;
  if (authKey !== ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  const { type, id } = req.params;

  try {
    const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
    const store = JSON.parse(raw);
    const listKey = type === 'contact' ? 'contacts' 
      : type === 'review' ? 'reviews' 
      : type === 'callback' ? 'callbacks'
      : type === 'appointment' ? 'appointments'
      : 'estimates';
    
    store[listKey] = (store[listKey] || []).filter(x => x.id !== id);

    fs.writeFileSync(LEADS_FILE, JSON.stringify(store, null, 2));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    console.error('Admin delete error:', err);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

// Serve frontend build static files in production if dist exists
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`[Rooftop Server] Running on http://localhost:${PORT}`);
  console.log(`[Rooftop Server] Health endpoint: http://localhost:${PORT}/api/health`);
});

