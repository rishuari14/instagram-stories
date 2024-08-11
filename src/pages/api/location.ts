import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/mongo'; // Adjust the path based on where you saved mongodb.ts
import fetch from 'node-fetch'; // Install this with `npm install node-fetch`

type Data = {
  [key: string]: any;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db('test'); // Replace with your database name
    const collection = db.collection('userdata'); // Replace with your collection name

    // Fetch IP information from ipapi.co
    const ipapiUrl = 'https://ipapi.co/json/';
    const response = await fetch(ipapiUrl);
    const ipData:any = await response.json();

    // Prepare the data to insert
    const dataToInsert = {
      ip: ipData.ip,
      city: ipData.city,
      region: ipData.region,
      region_code: ipData.region_code,
      country: ipData.country,
      country_name: ipData.country_name,
      continent_code: ipData.continent_code,
      in_eu: ipData.in_eu,
      postal: ipData.postal,
      latitude: ipData.latitude,
      longitude: ipData.longitude,
      timezone: ipData.timezone,
      utc_offset: ipData.utc_offset,
      country_calling_code: ipData.country_calling_code,
      currency: ipData.currency,
      languages: ipData.languages,
      asn: ipData.asn,
      org: ipData.org,
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
    res.status(500).json({ error: 'Failed to fetch IP data or connect to the database' });
  }
}
