const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

console.log('Reading Produtos.xlsx...');
const wb = XLSX.readFile('Produtos.xlsx');
const sheet = wb.Sheets[wb.SheetNames[0]];
const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

console.log('Total raw rows:', rows.length);
const header = rows[0];
console.log('Header:', header);

// We need to parse:
// Col 0: Código do produto (SKU)
// Col 1: Nome do produto (Nome)
// Col 2: Classificação Fiscal (NCM bruto com possíveis sufixos como R1, IS, .00, etc.)
// Col 3: Ativo (Produto) (Boolean / text)

const produtos = [];
const seenSkus = new Set();

for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  if (!row || row.length === 0) continue;
  
  const rawSku = String(row[0] || '').trim();
  const rawNome = String(row[1] || '').trim();
  const rawNcm = String(row[2] || '').trim();
  const rawAtivo = row[3];

  if (!rawSku || !rawNome) continue;

  // Extrai apenas os números do NCM ou pega os primeiros 8 dígitos
  const ncmDigitsOnly = rawNcm.replace(/[^0-9]/g, '');
  // Normaliza NCM padrão de 8 dígitos
  const ncm8 = ncmDigitsOnly.slice(0, 8);
  
  let ncmFormatado = ncm8;
  if (ncm8.length >= 8) {
    ncmFormatado = `${ncm8.slice(0, 4)}.${ncm8.slice(4, 6)}.${ncm8.slice(6, 8)}`;
  } else if (ncm8.length >= 4) {
    ncmFormatado = `${ncm8.slice(0, 4)}.${ncm8.slice(4)}`;
  }

  // Identifica se é do Anexo IX (Adubos 31, Defensivos 38, Sementes 10/12, Ração 23)
  const isAnexoIX = ['31', '38', '10', '12', '23', '30'].some(p => ncm8.startsWith(p));

  // Identifica fabricante se presente no nome (ex: PALINI, BAYER, YARA, STIHL, etc.)
  let fabricante = '';
  const nomeUpper = rawNome.toUpperCase();
  if (nomeUpper.includes('PALINI')) fabricante = 'Palini Alves';
  else if (nomeUpper.includes('PINHALENSE')) fabricante = 'Pinhalense';
  else if (nomeUpper.includes('YARA')) fabricante = 'Yara Brasil';
  else if (nomeUpper.includes('BAYER') || nomeUpper.includes('FLINT') || nomeUpper.includes('SPHERE')) fabricante = 'Bayer CropScience';
  else if (nomeUpper.includes('BASF') || nomeUpper.includes('OPERA')) fabricante = 'BASF';
  else if (nomeUpper.includes('SYNGENTA') || nomeUpper.includes('PRIORI') || nomeUpper.includes('ENGEO')) fabricante = 'Syngenta';
  else if (nomeUpper.includes('CORTEVA') || nomeUpper.includes('ROUNDUP')) fabricante = 'Corteva Agriscience';
  else if (nomeUpper.includes('STIHL')) fabricante = 'STIHL';
  else if (nomeUpper.includes('HUSQVARNA')) fabricante = 'Husqvarna';
  else if (nomeUpper.includes('TRAMONTINI')) fabricante = 'Tramontini';
  else if (nomeUpper.includes('VICON')) fabricante = 'Vicon Maquinários';
  else if (nomeUpper.includes('HERINGER')) fabricante = 'Fertilizantes Heringer';
  else if (nomeUpper.includes('MOSAIC')) fabricante = 'Mosaic Fertilizantes';
  else if (nomeUpper.includes('ROCHFER')) fabricante = 'Rochfer';
  else if (nomeUpper.includes('GUARANY')) fabricante = 'Guarany';
  else if (nomeUpper.includes('JACTO')) fabricante = 'Jacto Agrícola';
  else if (nomeUpper.includes('COOXUPÉ') || nomeUpper.includes('COOXUPE')) fabricante = 'Cooxupé';
  else if (nomeUpper.includes('KOPPERT')) fabricante = 'Koppert Biological';
  else if (nomeUpper.includes('RIZOBACTER')) fabricante = 'Rizobacter';
  else if (nomeUpper.includes('MOMENTIVE') || nomeUpper.includes('SILWET')) fabricante = 'Momentive Performance';

  produtos.push({
    c: rawSku, // SKU
    n: rawNome, // Nome
    m: ncm8 || ncmDigitsOnly, // NCM limpo
    f: ncmFormatado, // NCM formatado
    b: rawNcm, // NCM bruto original (com sufixos como R1, IS)
    a: isAnexoIX ? 1 : 0, // Anexo IX
    fab: fabricante || undefined
  });
}

console.log('Total valid products processed:', produtos.length);

// Salva em JSON compactado na pasta src/data/produtos-catalog.json
fs.writeFileSync('src/data/produtos-catalog.json', JSON.stringify(produtos));
console.log('Saved src/data/produtos-catalog.json (Size: ' + (fs.statSync('src/data/produtos-catalog.json').size / 1024).toFixed(1) + ' KB)');

// Testa consultas específicas: 'opera', '76793', '9364', '3036', '73090010', '73090010R1'
const testOpera = produtos.filter(p => p.n.toLowerCase().includes('opera'));
console.log('Test "opera" matches:', testOpera.length, testOpera.slice(0, 3));

const testSku9364 = produtos.filter(p => p.c === '9364');
console.log('Test SKU 9364 matches:', testSku9364);

const testSku76793 = produtos.filter(p => p.c === '76793');
console.log('Test SKU 76793 matches:', testSku76793);

const testNcm7309 = produtos.filter(p => p.m.startsWith('7309') || p.b.includes('73090010'));
console.log('Test NCM 7309 matches:', testNcm7309.length, testNcm7309.slice(0, 3));
