const fs = require('fs');

async function getGoldPrice() {
    try {
        // Menggunakan API alternatif yang lebih stabil (Harga per gram dalam USD)
        // Sumber: fawazahmed0/exchange-api
        const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";
        
        const response = await fetch(url);
        const data = await response.json();
        
        // Harga emas biasanya dalam satuan XAU (1 troy ounce)
        // Kita ambil harga 1 USD dalam XAU, lalu kita balik untuk dapat harga Emas per Ounce
        const xauToUsd = 1 / data.usd.xau; 
        const price = xauToUsd.toFixed(2);
        
        const date = new Date().toLocaleString("id-ID", { 
            timeZone: "Asia/Jakarta",
            dateStyle: "medium",
            timeStyle: "short"
        });

        const csvLine = `${date}, ${price}\n`;

        if (!fs.existsSync('harga_emas.csv')) {
            fs.writeFileSync('harga_emas.csv', 'Tanggal, Harga Emas per Ounce (USD)\n');
        }

        fs.appendFileSync('harga_emas.csv', csvLine);
        console.log(`Berhasil! Harga emas: $${price} / Ounce`);
    } catch (error) {
        console.error('Ada error:', error);
        process.exit(1);
    }
}

getGoldPrice();