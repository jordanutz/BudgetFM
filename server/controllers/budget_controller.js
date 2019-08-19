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
  postIncome: (req, res) => {
    const db = req.app.get('db')
    const {income} = req.body

    console.log(income)
    
  }, 
  postExpense: (req, res) => {
    const db = req.app.get('db')
    const {expense} = req.body

    console.log(expense)
  }
}