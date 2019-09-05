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
    let getIncome = null;

    if (req.query.dateOrder === 'false') {
      getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
    } else {
      getIncome = await db.budget.get_monthly_income_toggle([req.session.user[0].id, formatDate])
    }
  
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
    income.amount = parseInt(income.amount)

    const postIncome = await db.budget.post_income([req.session.user[0].id, income.date, income.description, income.category, income.amount, formatDate])
    const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
    const sumIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

    const updatedBalance = await db.budget.add_income([req.session.user[0].id, income.amount])
    req.session.user[1].balance = updatedBalance[0].balance

    const userIncome = {
      getIncome, 
      sumIncome, 
      updatedBalance: updatedBalance[0].balance
    }

    res.status(200).send(userIncome)
    
  }, 

  getExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    let getExpense = null;

    if (req.query.dateOrder === 'false') {
      getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
    } else {
      getExpense = await db.budget.get_monthly_expense_toggle([req.session.user[0].id, formatDate])
    }

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
    
    expense.amount = parseInt(expense.amount)

    const postExpense = await db.budget.post_expense([req.session.user[0].id, expense.date, expense.description, expense.category, expense.amount, formatDate])
    const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
    const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    const updatedBalance = await db.budget.add_expense([req.session.user[0].id, expense.amount])
    req.session.user[1].balance = updatedBalance[0].balance

    const userExpense = {
      getExpense, 
      sumExpense, 
      updatedBalance: updatedBalance[0].balance
    }

    res.status(200).send(userExpense)
  }, 

  deleteIncome: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    const deleteIncome = await db.budget.delete_income([req.query.id])
    const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
    const sumIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

    const updatedBalance = await db.budget.remove_income([req.session.user[0].id, parseInt(req.query.amount)])
    req.session.user[1].balance = updatedBalance[0].balance

    const userIncome = {
      getIncome, 
      sumIncome, 
      updatedBalance: updatedBalance[0].balance
    }

    res.status(200).send(userIncome)

  }, 

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    const deleteExpense = await db.budget.delete_expense([req.query.id])
    const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
    const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    const updatedBalance = await db.budget.remove_expense([req.session.user[0].id, parseInt(req.query.amount)])
    req.session.user[1].balance = updatedBalance[0].balance

    const userExpense = {
      getExpense, 
      sumExpense, 
      updatedBalance: updatedBalance[0].balance
    }

    res.status(200).send(userExpense)
  }, 

  searchIncome: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    const searchIncome = await db.budget.search_income([req.session.user[0].id, formatDate, req.query.search])
    
    res.status(200).send(searchIncome)

  }, 

  searchExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    const searchExpense = await db.budget.search_expense([req.session.user[0].id, formatDate, req.query.search])
    
    res.status(200).send(searchExpense)
  }, 

  getSummary: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    const incomeSummary = await db.budget.get_income_summary([req.session.user[0].id, formatDate])
    const expenseSummary = await db.budget.get_expense_summary([req.session.user[0].id, formatDate])
    let totalIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])
    let totalExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

    incomeSummary.forEach(entry => {
      if (entry.sum) {
        entry.sum = parseInt(entry.sum) 
      }
    })

    expenseSummary.forEach(entry => {
      if (entry.sum) {
        entry.sum = parseInt(entry.sum)
      }
    })

     totalIncome = parseInt(totalIncome[0].sum)
     totalExpense = parseInt(totalExpense[0].sum)

    // Income Categories
    const gift = incomeSummary[0].sum ? Math.round((incomeSummary[0].sum  / totalIncome) * 100) : 0
    const investment = incomeSummary[1].sum ? Math.round((incomeSummary[1].sum  / totalIncome) * 100) : 0
    const otherIncome = incomeSummary[2].sum ? Math.round((incomeSummary[2].sum  / totalIncome) * 100) : 0
    const reward = incomeSummary[3].sum ? Math.round((incomeSummary[3].sum  / totalIncome) * 100) : 0
    const salary = incomeSummary[4].sum ? Math.round((incomeSummary[4].sum  / totalIncome) * 100) : 0
  
    // Expense Categories
    const clothing = expenseSummary[0].sum ? Math.round((expenseSummary[0].sum  / totalExpense) * 100) : 0
    const education = expenseSummary[1].sum ? Math.round((expenseSummary[1].sum  / totalExpense) * 100) : 0
    const food = expenseSummary[2].sum ? Math.round((expenseSummary[2].sum  / totalExpense) * 100) : 0
    const home = expenseSummary[3].sum ? Math.round((expenseSummary[3].sum  / totalExpense) * 100) : 0
    const otherExpense = expenseSummary[4].sum ? Math.round((expenseSummary[4].sum  / totalExpense) * 100) : 0
    const payment = expenseSummary[5].sum ? Math.round((expenseSummary[5].sum  / totalExpense) * 100) : 0
    const recreation = expenseSummary[6].sum ? Math.round((expenseSummary[6].sum  / totalExpense) * 100) : 0
    const transportation = expenseSummary[7].sum ? Math.round((expenseSummary[7].sum  / totalExpense) * 100) : 0

    const summary = {
      income: {
        gift, 
        investment, 
        otherIncome, 
        reward, 
        salary
      },
      expense: {
        clothing, 
        education, 
        food, 
        home, 
        otherExpense, 
        payment, 
        recreation, 
        transportation
      }
    }

    res.status(200).send(summary)
  
  }
}