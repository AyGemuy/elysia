import fetch from 'node-fetch';

let darejson = [];
let truthjson = [];
let bucinjson = [];

async function dare() {
  if (!darejson.length) {
    const response = await fetch(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/dare.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    darejson = await response.json();
  }
  return darejson[Math.round(darejson.length * Math.random())];
}

async function truth() {
  if (!truthjson.length) {
    const response = await fetch(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/truth.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    truthjson = await response.json();
  }
  return truthjson[Math.floor(truthjson.length * Math.random())];
}

async function bucin() {
  if (!bucinjson.length) {
    const response = await fetch(
      'https://raw.githubusercontent.com/BochilTeam/database/master/kata-kata/bucin.json',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    bucinjson = await response.json();
  }
  return bucinjson[Math.floor(bucinjson.length * Math.random())];
}

export default async function handler(req, res) {
  try {
    const { type } = req.query; // Ambil parameter 'type' dari query string

    let result;
    switch (type) {
      case 'dare':
        result = await dare();
        break;
      case 'truth':
        result = await truth();
        break;
      case 'bucin':
        result = await bucin();
        break;
      default:
        return res.status(400).json({ error: 'Invalid type. Use "dare", "truth", or "bucin".' });
    }

    res.status(200).json({ result }); // Mengembalikan hasil
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
