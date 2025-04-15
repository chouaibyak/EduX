const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {  // Changé de 'name' à 'username' pour cohérence
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Edux');
    console.log('✅ MongoDB connecté avec succès');
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = { User, connectDB };