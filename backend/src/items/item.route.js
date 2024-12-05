const express = require('express');
const ItemModel = require('./item.model');
const { verify } = require('jsonwebtoken');
const tokenVerify = require('../users/tokenVerify');
const router = express.Router();

// Dodawanie nowego itemu
router.post('/new-item', async (req, res) => {
    try {
        const { name, category, description, price, image, author } = req.body;

        const newItem = new ItemModel({ name, category, description, price, image, author });
        await newItem.save();

        res.status(201).json({ message: 'Item został dodany', newItem });
    }
    catch (err) {
        console.error('Nie udało się dodać itemu:', err);
        res.status(500).json({ message: 'Nie udało się dodać itemu' });
    }
});


// Pobieranie wszystkich itemów
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;

        let filter = {};
        if (category && category !== 'wszystkie') {
            filter.category = category
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice); // Cena >= minPrice
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice); // Cena <= maxPrice
        }

        const items = await ItemModel.find(filter).populate('author', 'email username');

        res.status(200).json(items);

    }
    catch (err) {
        console.error('Nie udało się pobrać listy itemów:', err);
        res.status(500).json({ message: 'Nie udało się pobrać listy itemów' });
    }
});

// Pobieranie itemu
router.get('/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const item = await ItemModel.findById(itemId).populate('author', 'email username');

        if (!item) {
            return res.status(404).json({ message: 'Nie znaleziono takiego itemu' });
        }

        res.status(200).json(item);
    }
    catch (err) {
        console.error('Nie udało się pobrać itemu:', err);
        res.status(500).json({ message: 'Nie udało się pobrać itemu' });
    }
});

// Aktualizacja
router.patch('/edit-item/:id', tokenVerify, async (req, res) => {
    try {
        const itemId = req.params.id;

        // Znajdź item, aby sprawdzić autora
        const item = await ItemModel.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Nie znaleziono takiego itemu' });
        }

        // Sprawdź, czy zalogowany użytkownik jest autorem
        if (item.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'Brak uprawnień do edytowania tego itemu' });
        }

        // Aktualizuj item
        const { name, category, description, price, image } = req.body;

        const updatedItem = await ItemModel.findByIdAndUpdate(
            itemId,
            { name, category, description, price, image },
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Item został zaktualizowany', updatedItem });
    } catch (err) {
        console.error('Nie udało się zaktualizować itemu:', err);
        res.status(500).json({ message: 'Nie udało się zaktualizować itemu' });
    }
});

// Usuwanie
router.delete('/:id', tokenVerify, async (req, res) => {
    try {
        const itemId = req.params.id;

        // Znajdź item do sprawdzenia autora 
        const item = await ItemModel.findById(itemId);

        if (!item) {
            return res.status(404).json({ message: 'Nie znaleziono takiego itemu' });
        }

        // Sprawdź, czy zalogowany użytkownik jest autorem
        if (item.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'Brak uprawnień do usunięcia tego itemu' });
        }

        // Usuń item
        const deletedItem = await ItemModel.findByIdAndDelete(itemId);

        res.status(200).json({ message: 'Item został usunięty', deletedItem });
    } catch (err) {
        console.error('Nie udało się usunąć itemu:', err);
        res.status(500).json({ message: 'Nie udało się usunąć itemu' });
    }
});

module.exports = router;

