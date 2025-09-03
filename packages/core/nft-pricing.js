// nft-pricing.js
const axios = require("axios");
const fs = require("fs");
const VC_TOKENS = require("./vc001.json"); // Extend to vc999.json dynamically

const marketplaces = [
  {
    name: "OpenSea",
    url: contract => `https://api.opensea.io/api/v1/asset/${contract}/1`,
    extractPrice: data => parseFloat(data?.last_sale?.total_price || 0) / 1e18,
  },
  {
    name: "MagicEden",
    url: contract => `https://api-mainnet.magiceden.dev/v2/tokens/${contract}`,
    extractPrice: data => parseFloat(data?.price || 0),
  },
];

async function fetchFloorPrice(contract) {
  for (const market of marketplaces) {
    try {
      const res = await axios.get(market.url(contract));
      const price = market.extractPrice(res.data);
      if (price > 0) {
        return { market: market.name, price };
      }
    } catch (err) {
      console.warn(`Failed ${market.name} for ${contract}:`, err.message);
    }
  }
  return { market: "None", price: 0 };
}

async function updatePrices() {
  const results = {};
  for (const vc of Object.keys(VC_TOKENS)) {
    const contract = VC_TOKENS[vc].contract;
    const { market, price } = await fetchFloorPrice(contract);
    results[vc] = { market, price };
  }
  fs.writeFileSync("VC_PricingCache.json", JSON.stringify(results, null, 2));
  console.log("✅ Sovereign NFT prices updated.");
}

updatePrices();
