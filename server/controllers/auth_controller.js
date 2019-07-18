const bcrypt = require('bcryptjs')

module.exports = {
  registerUser: async (req, res) => {
    const db = req.app.get('db')
    const {name, email, password} = req.body
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const findExistingEmail = await db.auth.check_if_exists([email])
    if (findExistingEmail[0]) {
      res.status(400).send('Email is already in use.')
    } else {
      try {
        let newUser = await db.auth.user_register([name, email, hash])
        newUser = newUser[0]
        req.session.user = newUser 
        return res.status(200).send(req.session.user)
      } catch (err) {
        console.log(err)
        return res.status(400).send('Account could not be created')
      }
    }
  }
}