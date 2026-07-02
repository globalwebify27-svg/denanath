const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db_backup.json', 'utf-8'));
const depts = data.departments || data.Department || Object.values(data).find(v => Array.isArray(v) && v.length && v[0].slug) || [];
const neuro = depts.find(d => d.name && d.name.toLowerCase().includes('neurology'));
const cardio = depts.find(d => d.name && d.name.toLowerCase().includes('cardio-thoracic'));
console.log('Neurology length:', neuro?.description?.length || 0);
console.log('Cardio length:', cardio?.description?.length || 0);
