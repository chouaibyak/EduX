const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const { User, connectDB } = require('./config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Connexion DB
connectDB();

// Routes
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => res.render('login'));

app.get('/signup', (req, res) => res.render('signup'));

// Route d'inscription
app.post('/signup', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;

    // Validation
    if (password !== confirmPassword) {
      return res.status(400).render('signup', {
        error: 'Les mots de passe ne correspondent pas'
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).render('signup', {
        error: 'Ce nom d\'utilisateur existe déjà'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).render('signup', {
      error: 'Erreur lors de l\'inscription'
    });
  }
});

// Route de connexion
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).render('login', {
        error: 'Utilisateur non trouvé'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', {
        error: 'Mot de passe incorrect'
      });
    }

    // Ici vous devriez créer une session
    res.send('Connexion réussie!');
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).render('login', {
      error: 'Erreur lors de la connexion'
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});