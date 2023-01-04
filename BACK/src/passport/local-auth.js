const localStrategy = require("passport-local").Strategy;
const User = require("../modelos/usuarios");
const bcrypt = require("bcryptjs");
const passport = require("passport");

/*
  passport.use("local-signin",
    new localStrategy({
      usernameField: "usuario",
      passwordField: "contraseña",
      passReqToCallback: true,
    },(req, usuario, contraseña, done) => {
      console.log("ENTRE AL PASSPORT")

      User.findOne({ usuario: usuario }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(contraseña, user.contraseña, (err, result) => {
          if (err) throw err;
          if (result === true) {
            console.log("Contraseña correcta")
            return done(null,user)
          } else {
            console.log("Contraseña incorrecta.")
            return done(null, false)
          }
        })
      })
    })
  )*/

  
  // UNA VEZ Q SE AUTENTICA, DE ESOS DATOS SOLO NOS QUEDAMOS CON EL ID(lo que nos intercambiamos entre las pag para verificar q sea de un usuario ya autenticado)
  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  // CUANDO CAMBIE DE PAGINA, CON ESE ID BUSCAMOS SI HAY UN USUARIO CON ESE ID Y VOLVEMOS A TENER LOS DATOS DEL USUARIO EN DICHA PAGINA
  passport.deserializeUser(async (id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user)
    })
  });

