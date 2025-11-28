const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    // --- PERSONAL DETAILS ---
    fullName: { // Player's Full Name
        type: String,
        required: true,
        trim: true
    },
    dateOfBirth: { // Date of Birth (Used as 'Date to Birth' on the form)
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'], // Example enums, adjust as needed
        required: true
    },
    nationality: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        trim: true
    },
    residentialAddress: {
        type: String,
        trim: true
    },

    // --- PARENT/GUARDIAN INFORMATION ---
    parentGuardianName: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: { // Parent/Guardian Contact Number
        type: String,
        required: true
    },
    allergies: { // Allergies (if any)
        type: String,
        default: '',
        trim: true
    },
    relationshipToPlayer: { // Relationship to Player ('Rellationship to Plapien gact' on the form)
        type: String,
        trim: true
    },
    emailAddress: { // Parent/Guardian Email Address
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    emergencyConditions: { // Emergency Conditions (e.g. Asthma, Diabetes)
        type: String,
        default: '',
        trim: true
    },
    emergencyContactNumber: {
        type: String
    },
    
    // --- MEDICAL DETAILS ---
    bloodType: { // Optional
        type: String,
        trim: true
    },
    physicianName: {
        type: String,
        trim: true
    },
    physicianContactNumber: {
        type: String
    },
    // The form also mentions "Permission to administer first aid/emergency medical treatment" 
    // This is implicitly granted by the signature/declaration unless specified otherwise,
    // but you could add a field if explicit consent is needed:
    // medicalTreatmentConsent: { type: Boolean, default: false }, 

    // --- DECLARATION & SIGNATURE ---
    // The declaration section asks if the information provided is true, 
    // and if they allow photos/videos for promotional purposes. 
    // I'll add a field for the latter, and assume the act of submission implies the former.
    allowPromotionalMedia: {
        type: Boolean,
        default: false // Based on the "Yes / No" on the form
    },
    
    // --- ADMIN/SYSTEM FIELDS (Kept from your original model) ---
    isPaid: {
        type: Boolean,
        default: false // Default to not paid
    },
    registeredAt: {
        type: Date,
        default: Date.now
    }
    // You might also want fields for signature dates or images, but I'll omit those for simplicity.
});

// Changing the model name to Player for better context
module.exports = mongoose.model('Player', PlayerSchema);