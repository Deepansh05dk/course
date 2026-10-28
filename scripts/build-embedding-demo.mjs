// Builds public/data/embedding-demo.json for the <EmbeddingPlayground> component.
//
// Uses GloVe-derived 100-d word vectors (wink-embeddings-sg-100d, MIT; GloVe data is PDDL).
// A "sentence embedding" here is the average of its word vectors. Production embedding
// models are far better, but the geometry (cosine similarity, nearest neighbours) is the same.
//
// Usage (the vectors package is ~300 MB, so it is not a project dependency):
//   npm i --no-save wink-embeddings-sg-100d
//   node scripts/build-embedding-demo.mjs
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
const glove = require('wink-embeddings-sg-100d');
const DIM = glove.dimensions;
const VOCAB_SIZE = 4000; // most frequent words, plus every corpus word

export const STOPWORDS = new Set(
	'a an the of to and in on for is are was were be been it its this that with as at by from or if my our your we you i me us they them their there here can could will would should do does did has have had so than then too very just about into over under after before when what which who how why where'.split(' '),
);

const corpus = [
	{ id: 'refund-window', topic: 'refunds', text: 'Customers can request a refund within 30 days of delivery if the goods were not used.' },
	{ id: 'refund-process', topic: 'refunds', text: 'Refunds are paid back to the original payment method within ten business days.' },
	{ id: 'refund-denied', topic: 'refunds', text: 'Refunds are not allowed for perishable food or custom made products.' },
	{ id: 'refund-partial', topic: 'refunds', text: 'If only part of an order arrived, we refund the missing items and keep the rest of the order open.' },
	{ id: 'track-how', topic: 'tracking', text: 'You can track your parcel online with the shipment number from your confirmation email.' },
	{ id: 'track-delay', topic: 'tracking', text: 'Shipments may be delayed by storms, port congestion or strikes at the border.' },
	{ id: 'track-late', topic: 'tracking', text: 'If a delivery is more than five days late, contact support and we will investigate with the carrier.' },
	{ id: 'track-lost', topic: 'tracking', text: 'A package with no tracking update for fourteen days is treated as lost and we open a claim.' },
	{ id: 'damage-claim', topic: 'damage', text: 'Report damaged goods within 48 hours and attach photos of the box and the broken items.' },
	{ id: 'damage-glass', topic: 'damage', text: 'Glass and ceramics must be packed with protective wrapping or damage claims will be rejected.' },
	{ id: 'damage-insurance', topic: 'damage', text: 'Insured shipments are compensated for the full declared value after the claim is approved.' },
	{ id: 'customs-docs', topic: 'customs', text: 'International shipments need a commercial invoice and a customs declaration for every package.' },
	{ id: 'customs-fees', topic: 'customs', text: 'Import duties and taxes are charged by the destination country and paid by the receiver.' },
	{ id: 'customs-held', topic: 'customs', text: 'A shipment held at customs is released once the missing documents are submitted.' },
	{ id: 'address-change', topic: 'address', text: 'You can change the delivery address until the parcel leaves our warehouse.' },
	{ id: 'address-wrong', topic: 'address', text: 'If the address was wrong, the driver returns the package to the depot and we call the customer.' },
	{ id: 'pickup', topic: 'address', text: 'Customers may collect a parcel from the nearest depot with a valid photo identity card.' },
	{ id: 'api-key', topic: 'account', text: 'Error ERR_AUTH_8091 means your API key has expired and must be renewed in the dashboard.' },
	{ id: 'api-rate', topic: 'account', text: 'Error ERR_RATE_429 means you sent too many requests; wait one minute and try again.' },
	{ id: 'invoice', topic: 'account', text: 'Monthly invoices are available in the billing section of your account dashboard.' },
	{ id: 'password', topic: 'account', text: 'To reset your password, use the forgot password link on the login page.' },
	{ id: 'hazmat', topic: 'policy', text: 'Batteries, chemicals and other dangerous goods require special handling and a safety label.' },
	{ id: 'weight', topic: 'policy', text: 'Parcels heavier than thirty kilograms are shipped as freight on a pallet.' },
	{ id: 'hours', topic: 'policy', text: 'Our support team is available Monday to Friday from eight in the morning until six in the evening.' },
];

const presets = [
	'my money back',
	'where is my parcel',
	'box arrived smashed',
	'tax on imported goods',
	'ERR_AUTH_8091',
	'refunds are allowed',
	'wrong address on the package',
	'opening times',
];

const tokenize = (s) => s.toLowerCase().match(/[a-z0-9_]+/g) ?? [];

// Vocabulary: frequent words + everything the demo needs.
const needed = new Set([...corpus.flatMap((d) => tokenize(d.text)), ...presets.flatMap(tokenize)]);
const vocab = [];
const seen = new Set();
for (const w of glove.words) {
	if (vocab.length >= VOCAB_SIZE) break;
	if (/^[a-z]+$/.test(w) && !STOPWORDS.has(w) && glove.vectors[w]) {
		vocab.push(w);
		seen.add(w);
	}
}
for (const w of needed) if (!seen.has(w) && !STOPWORDS.has(w) && glove.vectors[w]) vocab.push(w), seen.add(w);

// Must match embed() in src/components/EmbeddingPlayground.astro:
// weight rarer words more (vocab is frequency-ordered), average, normalize,
// then subtract the corpus mean ("common direction") and normalize again.
const rank = new Map(vocab.map((w, i) => [w, i]));
const vec = (w) => glove.vectors[w].slice(0, DIM);
const normalize = (v) => {
	const n = Math.hypot(...v) || 1;
	return v.map((x) => x / n);
};
const rawEmbed = (text) => {
	const out = new Array(DIM).fill(0);
	for (const w of tokenize(text)) {
		if (STOPWORDS.has(w) || !rank.has(w)) continue;
		const weight = Math.log(2 + rank.get(w) / 20);
		vec(w).forEach((x, i) => (out[i] += weight * x));
	}
	return normalize(out);
};

const rawDocs = corpus.map((d) => rawEmbed(d.text));
const center = new Array(DIM).fill(0).map((_, i) => rawDocs.reduce((s, v) => s + v[i], 0) / rawDocs.length);
const centered = rawDocs.map((v) => normalize(v.map((x, i) => x - center[i])));

// 2-D PCA of the centered document vectors (power iteration with deflation).
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const components = [];
for (let c = 0; c < 2; c++) {
	let v = new Array(DIM).fill(0).map((_, i) => Math.sin(i + c + 1));
	for (let it = 0; it < 300; it++) {
		const next = new Array(DIM).fill(0);
		for (const row of centered) {
			const p = dot(row, v);
			row.forEach((x, i) => (next[i] += p * x));
		}
		for (const prev of components) {
			const p = dot(next, prev);
			next.forEach((_, i) => (next[i] -= p * prev[i]));
		}
		const n = Math.hypot(...next);
		v = next.map((x) => x / n);
	}
	components.push(v);
}

// Quantize word vectors to int8 with one scale per word to keep the file small.
const bytes = new Int8Array(vocab.length * DIM);
const scales = vocab.map((w, r) => {
	const v = vec(w);
	const scale = Math.max(...v.map(Math.abs)) / 127 || 1;
	v.forEach((x, i) => (bytes[r * DIM + i] = Math.round(x / scale)));
	return +scale.toPrecision(5);
});

const round = (xs) => xs.map((x) => +x.toFixed(5));
writeFileSync(
	new URL('../public/data/embedding-demo.json', import.meta.url),
	JSON.stringify({
		source: 'GloVe-derived 100-d word vectors (wink-embeddings-sg-100d); sentence = mean of word vectors',
		dim: DIM,
		stopwords: [...STOPWORDS],
		corpus,
		presets,
		center: round(center),
		pca: { components: components.map(round) },
		vocab,
		scales,
		vectors: Buffer.from(bytes.buffer).toString('base64'),
	}),
);
console.log(`vocab=${vocab.length} docs=${corpus.length}`);
