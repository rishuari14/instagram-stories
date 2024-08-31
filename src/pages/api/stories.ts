// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';
import path from 'path';

// Define the type for the expected data
type Data = {
  // Adjust this type based on the structure of your JSON file
  [key: string]: any;
};

// Define the API handler function
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Define the path to the JSON file
  const filePath = path.resolve('public', 'stories.json');
  
  // Read the file asynchronously
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      // Handle error (e.g., file not found)
      res.status(500).json({ error: 'Failed to read the JSON file' });
      return;
    }
    
    // Parse the JSON data
    const jsonData = JSON.parse(data);
    
    // Send the JSON data as the response
    res.status(200).json(jsonData);
  });
}