const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.77rjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
	try{
		await client.connect();
		const inventoryItemCollections = client.db('laptopStock').collection('inventoryItem');

		app.get('/inventoryItem' ,async (req,res) => {
			const query = {};
			const cursor = inventoryItemCollections.find(query);
			const result = await cursor.toArray();
			res.send(result);
		})
	}
	finally{

	}
}

run().catch(console.dir);


app.get('/', (req, res) => {
	res.send('Laptop Stock Server is Running');
})

app.listen(port, () => {
	console.log('Lapto Stock is Runnnig');
})