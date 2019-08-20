const moment = require('moment')

module.exports = {
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
  },
  postIncome: async (req, res) => {
    const db = req.app.get('db')
    const {income} = req.body
    
    const formatDate = moment(income.date).format('MM/YYYY')
    income.date = moment(income.date).format('MM/DD/YYYY')
    income.amount = parseInt(income.amount)

    const postIncome = await db.budget.post_income([req.session.user[0].id, income.date, income.description, income.category, income.amount, formatDate])
    const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])

    res.status(200).send(getIncome)
    
  }, 
  postExpense: (req, res) => {
    const db = req.app.get('db')
    const {expense} = req.body

    expense.date = moment(expense.date).format('MM/DD/YYYY')
    expense.amount = parseInt(expense.amount)

    db.budget.post_expense([req.session.user[0].id, expense.date, expense.description, expense.category, expense.amount])
    .then(total => console.log(total))
    .catch(err => console.log(err))

  }
}