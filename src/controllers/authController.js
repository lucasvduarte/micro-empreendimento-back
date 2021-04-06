const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post("/registrar", async (req, res) => {
    const { email } = req.body;

    try {

        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Usuário já existe' })
        }

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ user });

    } catch (error) {
        return res.status(400).send({ error: 'Falha no cadastro' })
    }
});

module.exports = router;