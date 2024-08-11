import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/mongo'; // Adjust the path based on where you saved mongodb.ts

type Data = {
  [key: string]: any;
  error?: string;
};

// Define the expected shape of the data you expect to receive
interface IPData {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  languages: string;
  asn: string;
  org: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      // Connect to the MongoDB client
      const client = await clientPromise;
      const db = client.db('test'); // Replace with your database name
      const collection = db.collection('userdata'); // Replace with your collection name

      // Get IP data from the request body
      const ipData: IPData = req.body;

      // Prepare the data to insert
      const dataToInsert = {
        ...ipData,
        timestamp: new Date(), // Add timestamp if needed
      };

      // Insert the data into the collection
      await collection.insertOne(dataToInsert);

      // Optionally, fetch all data from the collection to return
      const data = await collection.find({}).toArray();

      // Send the JSON data as the response
      res.status(200).json(data);
    } catch (error) {
      // Handle error
      res.status(500).json({ error: 'Failed to connect to the database' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
