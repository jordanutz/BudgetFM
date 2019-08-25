const moment = require('moment')

module.exports = {
  getDashboard: async (req, res) => {
    const db = req.app.get('db')

    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    const getIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])
    const getExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    const userDashboard = {
      getIncome, 
      getExpense
    }

    res.status(200).send(userDashboard)

  },
  updateBalance: (req, res) => {
    const db = req.app.get('db')
    db.budget.update_balance([req.session.user[0].id, req.body.balance])
    .then(balance => {
      req.session.user[1].balance = balance[0].balance
      res.status(200).send(req.session.user[1])
    })
    .catch(err => console.log(err))
  }, 
  getIncome: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
    const sumIncome =  await db.budget.get_income_sum([req.session.user[0].id, formatDate])

    const userIncome = {
      getIncome, 
      sumIncome 
    }

    res.status(200).send(userIncome)
  },
  postIncome: async (req, res) => {
    const db = req.app.get('db')
    const {income} = req.body
    
    const formatDate = moment(income.date).format('MM/YYYY')
    income.date = moment(income.date).format('MM/DD/YYYY')
    income.amount = parseInt(income.amount)

    const postIncome = await db.budget.post_income([req.session.user[0].id, income.date, income.description, income.category, income.amount, formatDate])
    const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
    const sumIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

    const userIncome = {
      getIncome, 
      sumIncome 
    }

    res.status(200).send(userIncome)
    
  }, 
  getExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
    const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    const userExpense = {
      getExpense, 
      sumExpense
    }

    res.status(200).send(userExpense)
  },

  postExpense: async (req, res) => {
    const db = req.app.get('db')
    const {expense} = req.body
    const formatDate = moment(expense.date).format('MM/YYYY')
    
    expense.date = moment(expense.date).format('MM/DD/YYYY')
    expense.amount = parseInt(expense.amount)

    const postExpense = await db.budget.post_expense([req.session.user[0].id, expense.date, expense.description, expense.category, expense.amount, formatDate])
    const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
    const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    const userExpense = {
      getExpense, 
      sumExpense
    }

    console.log(userExpense)

    res.status(200).send(userExpense)

  }
}