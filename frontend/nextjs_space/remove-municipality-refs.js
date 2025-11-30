const fs = require('fs');

// Leer el archivo
const filePath = './app/admin/usuarios/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Eliminar líneas que definen municipalityId en interfaces
content = content.replace(/\s*municipalityId:\s*string\s*\|\s*null;/g, '');

// Eliminar el campo municipality del interface User
content = content.replace(/\s*municipality\?:\s*\{[^}]+\}\s*\|\s*null;/g, '');

// Eliminar el interface Municipality completo
content = content.replace(/interface Municipality \{[^}]+\}/g, '');

// Eliminar estados de municipalidades
content = content.replace(/\s*const \[municipalities,\s*setMunicipalities\]\s*=\s*useState<Municipality\[\]>\(\[\]\);/g, '');

// Eliminar municipalityId del formData
content = content.replace(/municipalityId:\s*'',/g, '');
content = content.replace(/municipalityId:\s*formData\.municipalityId\s*\|\|\s*null,/g, '');
content = content.replace(/municipalityId:\s*user\.municipalityId\s*\|\|\s*'',/g, '');

// Escribir el archivo
fs.writeFileSync(filePath, content, 'utf8');
console.log('Referencias a municipality eliminadas de', filePath);
