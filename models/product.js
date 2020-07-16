const _db = require('../db/database');
class Product {
    constructor(title, price, description, totalQty, category, imageUrl, userId) {
        this.title = title,
        this.price = price,
        this.description = description,
        this.totalQty = totalQty,
        this.category = category,
        this.imageUrl = imageUrl,
        this.userId = userId
    }

    save() {
        const db = _db.db('shopDb');
        return db.collection('product')
        .insertOne(this)
        .then((result) => {
            // 
        })
        .catch(err => {
            console.log(err);
        })
    }
}