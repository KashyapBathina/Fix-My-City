const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://kbathina05:MDGiAndmwvrRTWdq@cluster0.z1zttxf.mongodb.net/COP4331?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(url);
client.connect()
	.then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
app.use(cors());
app.use(bodyParser.json());








const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary configuration
cloudinary.config({
  cloud_name: '{secret}', // Store these in .env file
  api_key: "{secret}",
  api_secret: "{secret}"
});

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fix-my-city',
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

// Create multer upload middleware
const upload = multer({ storage: storage });










app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});






app.post('/api/register', async (req, res, next) => {
    // Incoming: firstName, lastName, login, password
    // Outgoing: success message or error
    const { firstName, lastName, login, password, phone  } = req.body;
    let error = '';

    try {
        const db = client.db();
        const usersCollection = db.collection('Users');

        // Check if username already exists
        const existingUser = await usersCollection.findOne({ Login: login });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Generate a new UserId (you could use a counter system or ObjectId)
        const lastUser = await usersCollection.find().sort({ UserId: -1 }).limit(1).toArray();
        const newUserId = lastUser.length > 0 ? lastUser[0].UserId + 1 : 1;

        const newUser = {
            UserId: newUserId,
            FirstName: firstName,
            LastName: lastName,
            Login: login,
	    Phone: phone,
            Password: password, // Optional: hash this later
        };

        await usersCollection.insertOne(newUser);
        res.status(200).json({ message: 'User registered successfully', error: '' });
    } catch (e) {
        res.status(500).json({ message: '', error: e.toString() });
    }
});





app.post('/api/addIssue', upload.single('image'), async (req, res) => {
  try {
    // The image URL comes from Cloudinary via the multer middleware
    const imageUrl = req.file ? req.file.path : null;
    
    const { 
      userId, 
      firstName, 
      lastName,
      phone,
      issueName, 
      location, 
      zip, 
      description,
      status = 'New'
    } = req.body;
    
    const db = client.db();
    const issues = db.collection('Issues');
    
    const newIssue = {
      IssueId: new Date().getTime(),
      UserId: userId,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      Title: issueName,
      Address: location,
      Zip: zip,
      Description: description,
      status: status,
      ImageUrl: imageUrl, // Store the Cloudinary URL
      DateCreated: new Date()
    };
    
    await issues.insertOne(newIssue);
    res.status(200).json({message: 'Issue added successfully' });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});








app.post('/api/deleteIssue', async (req, res) => {
	const { issueId } = req.body;
	try{
		const db = client.db();
		const issues = db.collection('Issues');
		await issues.deleteOne({ IssueId: issueId });
		res.status(200).json({message: 'Issue deleted successfully'});
	}catch (e){
		res.status(500).json({ error: e.toString() });
	}
});

app.patch('/api/editIssue', async (req, res) => {
	const {issueId, description, zip, address, imageUrl } = req.body;
	try{
		const db = client.db();
		const issues = db.collection('Issues');
		const updateFields = {};
		if (address !== undefined) updateFields.Address = address;
		if (description !== undefined) updateFields.Description = description;
        	if (zip !== undefined) updateFields.Zip = zip;
        	if (imageUrl !== undefined) updateFields.ImageUrl = imageUrl;
        	if (Object.keys(updateFields).length === 0) {
            		return res.status(400).json({ error: "No fields to update" });
        	}

        	await issues.updateOne(
            		{ IssueId: issueId },
            		{ $set: updateFields }
        	);

        	res.status(200).json({ message: 'Issue updated successfully' });
    	} catch (e) {
        	res.status(500).json({ error: e.toString() });
    	}
});

app.post('/api/searchIssue', async (req, res) => {
    const search = req.body.search?.toString().trim() || '';
    let error = '';
    try {
        const db = client.db();
        const issues = db.collection('Issues');
        const results = await issues.find({
            $or: [
                { Title: { $regex: search, $options: 'i' } },
                { Description: { $regex: search, $options: 'i' } }
            ]
        }).toArray();
        res.status(200).json({ results });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

app.post('/api/searchByZip', async (req, res) => {
    const { zip } = req.body;
    try {
        const db = client.db();
        const issues = db.collection('Issues');
        const results = await issues.find({ Zip: zip }).toArray();
        res.status(200).json({ results });
    } catch (e) {
        res.status(500).json({ error: e.toString() });
    }
});

app.post('/api/login', async (req, res, next) => {
    // incoming: login, password
    // outgoing: id, firstName, lastName, error
    var error = '';
    const { login, password } = req.body;
    const db = client.db();
    const results = await
        db.collection('Users').find({ Login: login, Password: password }).toArray();
    var id = -1;
    var fn = '';
    var ln = '';
    if (results.length > 0) {
        id = results[0].UserId;
        fn = results[0].FirstName;
        ln = results[0].LastName;
	ph = results[0].Phone
    }
    var ret = { id: id, firstName: fn, lastName: ln, phone: ph, error: '' };
    res.status(200).json(ret);
});




app.listen(5000); // start Node + Express server on port 5000
