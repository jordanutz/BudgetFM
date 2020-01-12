const moment = require('moment')

module.exports = {

  getDashboard: async (req, res) => {
    const db = req.app.get('db')

    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try { 
      let totalIncome = await db.budget.get_total_income([req.session.user[0].id])
      totalIncome = totalIncome[0].total_income

      let totalExpense = await db.budget.get_total_expense([req.session.user[0].id])
      totalExpense = totalExpense[0].total_expense

      let monthlyIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])
      
      monthlyIncome = monthlyIncome[0].sum

      let monthlyExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])
      monthlyExpense = monthlyExpense[0].sum

      if (!monthlyIncome) {
        monthlyIncome = 0
      }

      if (!monthlyExpense) {
        monthlyExpense = 0
      }

      if (!totalExpense) {
        totalExpense = 0
      }

      if (!totalIncome) {
        totalIncome = 0
      }

      const userDashboard = {
        balance: parseFloat(totalIncome - totalExpense),
        monthlyIncome,
        monthlyExpense
      }

      console.log(userDashboard)

      res.status(200).send(userDashboard)
    }

    catch (err) {
      console.log(err)
    }

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

    try {

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
    }
    catch (err) {
      console.log(err)
    }
  },

  postIncome: async (req, res) => {
    const db = req.app.get('db')
    const {income} = req.body

    let formatDate;
    let submitDate;
    let userDate = moment(income.date).format('M')
    let checkDate = moment(new Date()).format('M')
  
    if (userDate === checkDate) {
      formatDate = moment().format('MM/YYYY')
      submitDate = moment().format();
    } else {
      submitDate = income.date
      formatDate = moment(income.date).format('MM/YYYY')
    }

    income.amount = parseFloat(income.amount)

    try {
      const postIncome = await db.budget.post_income([req.session.user[0].id, submitDate, income.description, income.category, income.amount, formatDate])
      const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
      const sumIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

      const updatedBalance = await db.budget.add_income([req.session.user[0].id, income.amount])
      req.session.user[1].balance = updatedBalance[0].balance

      const userIncome = {
        getIncome, 
        sumIncome, 
        updatedBalance: updatedBalance[0].balance, 
        previous: !income.previous ? income.amount - income.previous : 0
      }

      res.status(200).send(userIncome)
    }

    catch (err) {
      console.log(err)
    }
  }, 

  getExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')
    let getExpense = null;

    try {

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
    }

    catch {
      console.log(err)
    }
  },

  postExpense: async (req, res) => {
    const db = req.app.get('db')
    const {expense} = req.body

    let formatDate;
    let submitDate;
    let userDate = moment(expense.date).format('M')
    let checkDate = moment(new Date()).format('M')
  
    if (userDate === checkDate) {
      formatDate = moment().format('MM/YYYY')
      submitDate = moment().format();
    } else {
      submitDate = expense.date
      formatDate = moment(expense.date).format('MM/YYYY')
    }
    
    expense.amount = parseFloat(expense.amount)

    try {
      const postExpense = await db.budget.post_expense([req.session.user[0].id, submitDate, expense.description, expense.category, expense.amount, formatDate])
      const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
      const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

      const updatedBalance = await db.budget.add_expense([req.session.user[0].id, expense.amount])
      req.session.user[1].balance = updatedBalance[0].balance

      const userExpense = {
        getExpense, 
        sumExpense, 
        updatedBalance: updatedBalance[0].balance, 
        previous: !expense.previous ? expense.amount - expense.previous : 0
      }

      res.status(200).send(userExpense)
    }

    catch (err) {
      console.log(err)
    }
  }, 

  deleteIncome: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {   
      const deleteIncome = await db.budget.delete_income([req.query.id])
      const getIncome = await db.budget.get_monthly_income([req.session.user[0].id, formatDate])
      const sumIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

      const updatedBalance = await db.budget.remove_income([req.session.user[0].id, parseFloat(req.query.amount)])
      req.session.user[1].balance = updatedBalance[0].balance

      const userIncome = {
        getIncome, 
        sumIncome, 
        updatedBalance: updatedBalance[0].balance
      }

      res.status(200).send(userIncome)
    }

    catch (err) {
      console.log(err)
    }

  }, 

  deleteExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {

      const deleteExpense = await db.budget.delete_expense([req.query.id])
      const getExpense = await db.budget.get_monthly_expense([req.session.user[0].id, formatDate])
      const sumExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

      const updatedBalance = await db.budget.remove_expense([req.session.user[0].id, parseFloat(req.query.amount)])
      req.session.user[1].balance = updatedBalance[0].balance

      const userExpense = {
        getExpense, 
        sumExpense, 
        updatedBalance: updatedBalance[0].balance
      }

      res.status(200).send(userExpense)

      }

      catch (err) {
        console.log(err)
      }
  }, 

  searchIncome: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {
      const searchIncome = await db.budget.search_income([req.session.user[0].id, formatDate, req.query.search])
      res.status(200).send(searchIncome)
    }

    catch (err) {
      console.log(err)
    }
  }, 

  searchExpense: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {
      const searchExpense = await db.budget.search_expense([req.session.user[0].id, formatDate, req.query.search])
      res.status(200).send(searchExpense)
    }

    catch (err) {
      console.log(err)
    }
  }, 

  getIncomeSummary: async (req, res) => {
    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {
      const incomeSummary = await db.budget.get_income_summary([req.session.user[0].id, formatDate])
      let totalIncome = await db.budget.get_income_sum([req.session.user[0].id, formatDate])

      incomeSummary.forEach(entry => {
        if (entry.sum) {
          entry.sum = parseFloat(entry.sum) 
        }
      })

      totalIncome = totalIncome && parseFloat(totalIncome[0].sum)
      
      // Income Categories
      const gift = incomeSummary ? Math.round((incomeSummary[0].sum  / totalIncome) * 100) : 0
      const investment = incomeSummary ? Math.round((incomeSummary[1].sum  / totalIncome) * 100) : 0
      const otherIncome = incomeSummary ? Math.round((incomeSummary[2].sum  / totalIncome) * 100) : 0
      const reward = incomeSummary ? Math.round((incomeSummary[3].sum  / totalIncome) * 100) : 0
      const salary = incomeSummary ? Math.round((incomeSummary[4].sum  / totalIncome) * 100) : 0
    
      const summary = {
        gift, 
        investment, 
        otherIncome, 
        reward, 
        salary    
      }

      res.status(200).send(summary)
    }

    catch (err) {
      console.log(err)
    }
  
  }, 

  getExpenseSummary: async (req, res) => { 

    const db = req.app.get('db')
    const formatDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {

      const expenseSummary = await db.budget.get_expense_summary([req.session.user[0].id, formatDate])
      let totalExpense = await db.budget.get_expense_sum([req.session.user[0].id, formatDate])

      expenseSummary.forEach(entry => {
        if (entry.sum) {
          entry.sum = parseFloat(entry.sum)
        }
      })

      totalExpense = totalExpense && parseFloat(totalExpense[0].sum)

      // Expense Categories
      const clothing = expenseSummary ? Math.round((expenseSummary[0].sum  / totalExpense) * 100) : 0
      const education = expenseSummary ? Math.round((expenseSummary[1].sum  / totalExpense) * 100) : 0
      const food = expenseSummary ? Math.round((expenseSummary[2].sum  / totalExpense) * 100) : 0
      const home = expenseSummary ? Math.round((expenseSummary[3].sum  / totalExpense) * 100) : 0
      const otherExpense = expenseSummary ? Math.round((expenseSummary[4].sum  / totalExpense) * 100) : 0
      const payments = expenseSummary ? Math.round((expenseSummary[5].sum  / totalExpense) * 100) : 0
      const recreation= expenseSummary ? Math.round((expenseSummary[6].sum  / totalExpense) * 100) : 0
      const transportation = expenseSummary ? Math.round((expenseSummary[7].sum  / totalExpense) * 100) : 0

      const summary = {

        clothing, 
        education, 
        food, 
        home, 
        otherExpense, 
        payments, 
        recreation, 
        transportation

      
      }

      res.status(200).send(summary)
    }

    catch (err) {
      console.log(err)
    }
  }, 

  getPrevious: async (req, res) => {
    const db = req.app.get('db')

    const previousDate = moment(new Date(req.query.date)).subtract(1,'months').format('MM/YYYY')
    const secondMonth = moment(new Date(req.query.date)).subtract(2,'months').format('MM/YYYY')
    const currentDate = moment(new Date(req.query.date)).format('MM/YYYY')

    try {

      let sumIncomePrevious =  await db.budget.get_income_sum([req.session.user[0].id, previousDate])
      let sumExpensePrevious = await db.budget.get_expense_sum([req.session.user[0].id, previousDate])
      let sumIncomeCurrent = await db.budget.get_income_sum([req.session.user[0].id, currentDate])
      let sumExpenseCurrent = await db.budget.get_expense_sum([req.session.user[0].id, currentDate]) 
      let sumIncomeSecond = await db.budget.get_income_sum([req.session.user[0].id, secondMonth])
      let sumExpenseSecond = await db.budget.get_income_sum([req.session.user[0].id, secondMonth])

      if (!sumIncomePrevious[0].sum) {
        sumIncomePrevious[0].sum = 0
      } else {
        sumIncomePrevious[0].sum = parseFloat(sumIncomePrevious[0].sum)
      }

      if (!sumExpensePrevious[0].sum) {
        sumExpensePrevious[0].sum = 0
      } else {
        sumExpensePrevious[0].sum = parseFloat(sumExpensePrevious[0].sum)
      }

      if (!sumExpenseCurrent[0].sum) {
        sumExpenseCurrent[0].sum = 0 
      } else {
        sumExpenseCurrent[0].sum = parseFloat(sumExpenseCurrent[0].sum)
      }

      if (!sumIncomeCurrent[0].sum) {
        sumIncomeCurrent[0].sum = 0
      } else {
        sumIncomeCurrent[0].sum = parseFloat(sumIncomeCurrent[0].sum)
      }

      if (!sumIncomeSecond[0].sum) {
        sumIncomeSecond[0].sum = 0
      } else {
        sumIncomeSecond[0].sum = parseFloat(sumIncomeSecond[0].sum)
      }

      if (!sumExpenseSecond[0].sum) {
        sumExpenseSecond[0].sum = 0
      } else {
        sumExpenseSecond[0].sum = parseFloat(sumExpenseSecond[0].sum)
      }

      const secondNet = sumIncomeSecond[0].sum + (-Math.abs(sumExpenseSecond[0].sum))
      const previousNet = sumIncomePrevious[0].sum + (-Math.abs(sumExpensePrevious[0].sum))
      const currentNet = sumIncomeCurrent[0].sum + (-Math.abs(sumExpenseCurrent[0].sum))
      const percentageChange = ((currentNet - previousNet) / Math.abs(previousNet)) * 100;

      const previous = {
        previousNet,
        currentNet, 
        secondNet, 
        percentageChange
      }

      res.status(200).send(previous)

    }

    catch (err) {
      console.log(err)
    }
  }
}