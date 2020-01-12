const bcrypt = require('bcryptjs')

module.exports = {

  userRegister: async (req, res) => {
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
        let initialBalance = await db.auth.initial_balance([newUser[0].id, 0])
        newUser = {
          id: newUser[0].id, 
          name: newUser[0].name,
          email: newUser[0].email, 
          balance: initialBalance[0].balance
        }
        req.session.user = newUser 
        return res.status(200).send(req.session.user)
      } catch (err) {
        console.log(err)
        return res.status(400).send('Account could not be created')
      }
    }
  }, 
  userLogin: async (req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body
    const findExistingUser = await db.auth.user_login([email])

    if (!findExistingUser[0]) {
      return res.status(401).send('User does not exist with this email')
    } 

    const authedUser = bcrypt.compareSync(password, findExistingUser[0].password)

    try {

      if (authedUser) {

        const findBalance = await db.auth.user_balance([findExistingUser[0].id])

        req.session.user = [
          { 
            id: findExistingUser[0].id, 
            name: findExistingUser[0].name, 
            email: findExistingUser[0].email
          },
        {   
            balance: findBalance[0].balance 
          }
        ]
        
        return res.status(200).send(req.session.user)
      } else {
        return res.status(401).send('Incorrect email or password')
      }
    }

    catch (err) {
      console.log
    }
  }
  , 
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(401)
    }
  }, 
  userLogout: (req, res) => {
    req.session.destroy();
    // console.log(req.session.user)
    res.sendStatus(200);
  }
}