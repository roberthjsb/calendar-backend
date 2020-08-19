const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Usuarios = require('../models/Usuarios');
const { generaJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, resp = response) => {
    try {
        const { email,password } = req.body;
        let user = await Usuarios.findOne({ email });
        console.log({user})
        if (user) {
            return resp.status(400).json(
                {
                    ok: false,
                    msg: 'Un usuario existe con ese correo',
                }
            );
        }
        
        user = Usuarios(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        user.save();
        const token = await generaJWT(user.id,user.name)
        resp.status(201).json(
            {
                ok: true,
                uid: user.id,
                name: user.name,
                token
            }
        );
    } catch (error) {
        return resp.status(400).json(
            {
                ok: false,
                msg: 'Error interno contacte al administrador',
            }
        );
    }
}
const loginUsuario = async (req = request, resp = response) => {
    try {
        const { email, password } = req.body;
        let user = await Usuarios.findOne({ email });

        if (!user) {
            return resp.status(401).json(
                {
                    ok: false,
                    msg: 'Un usuario no autorizado',
                }
            );
        }
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return resp.status(401).json(
                {
                    ok: false,
                    msg: 'Un password incorrecto',
                }
            );
        }
        const token = await generaJWT(user.id,user.name)

        resp.status(201).json(
            {
                ok: true,
                uid: user.id,
                name: user.name,
                token
            }
        );
    } catch (error) {
        return resp.status(400).json(
            {
                ok: false,
                msg: 'Error interno contacte al administrador',
            }
        );
    }
}
const revalidarToken = async (req = request, resp = response) => {
const {uid, name} = req;
const token = await generaJWT(uid,name);


    resp.json(
        {
            ok: true,
            token
        }
    );
}
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}