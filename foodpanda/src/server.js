const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// 打開資料庫
const db = new sqlite3.Database('path/to/your/database.db', err => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// API 端點 - 獲取餐廳資料
app.get('/restaurants', (req, res) => {
    const queryMerchants = `SELECT * FROM merchants;`;
    const queryCategories = `SELECT * FROM categories;`;
    const queryMenuItems = `SELECT * FROM menu_items;`;

    const result = { restaurants: [] };

    db.all(queryMerchants, (err, merchants) => {
        if (err) return res.status(500).send(err.message);

        result.restaurants = merchants;

        db.all(queryCategories, (err, categories) => {
            if (err) return res.status(500).send(err.message);

            result.restaurants.forEach(merchant => {
                merchant.categories = categories.filter(cat => cat.merchant_id === merchant.merchant_id);
            });

            db.all(queryMenuItems, (err, menuItems) => {
                if (err) return res.status(500).send(err.message);

                result.restaurants.forEach(merchant => {
                    merchant.categories.forEach(category => {
                        category.items = menuItems.filter(item => item.category_id === category.category_id);
                    });
                });

                res.json(result.restaurants);
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
