const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const bcrypt = require('bcryptjs')
const app = express()

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is kickin')
})

// Controllers 
const auth = require('./controllers/auth_controller')
const budget = require('./controllers/budget_controller')

// Endpoints 
app.put('/api/balance', budget.updateBalance)

// Authentication 
app.post('/api/register', auth.userRegister)
app.post('/api/login', auth.userLogin)
app.get('/api/user', auth.getUser)
app.get('/api/logout', auth.userLogout)

// Dashboard
app.get('/api/dashboard', budget.getDashboard)
app.get('/api/dashboard/previous', budget.getPrevious)

// Income
app.get('/api/income', budget.getIncome)
app.post('/api/income', budget.postIncome)
app.delete('/api/income', budget.deleteIncome)
app.get('/api/income/search', budget.searchIncome)

// Expenses
app.get('/api/expense', budget.getExpense)
app.post('/api/expense', budget.postExpense)
app.delete('/api/expense', budget.deleteExpense)
app.get('/api/expense/search', budget.searchExpense)

// Summary
app.get('/api/summary/income', budget.getIncomeSummary)
app.get('/api/summary/expense', budget.getExpenseSummary)

PORT = 6800;

app.listen(PORT, ()=> {
  console.log(`Blasting off on Port ${PORT} 🚀 `)
})

