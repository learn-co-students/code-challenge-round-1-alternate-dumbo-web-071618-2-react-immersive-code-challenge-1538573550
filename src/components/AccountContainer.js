import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import CategorySelector from './CategorySelector'
import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  constructor() {
    super()

    this.state = {
      transactions: [],
      filterBy: 'All'
    }
  }

  componentDidMount(){
    fetch('https://boiling-brook-94902.herokuapp.com/transactions')
    .then(res => res.json())
    .then(data => {
      this.setState({transactions: data})
    })
  }

  handleTransactions = () => {
    let tempTransactions = [...this.state.transactions]

    if(this.state.filterBy === 'All') {
      tempTransactions = [...this.state.transactions]
    } else {
      tempTransactions = tempTransactions.filter((transaction) =>
        transaction.category === this.state.filterBy
      )
    }
    return tempTransactions
  }

  handleChange = (event) => {
    // console.log("EVENT", )
    let categoryName = event.target.parentNode.children[1].innerText;
    this.setState({filterBy: categoryName})
  }

  render() {
    // console.log(transactions)
    console.log("ACC", this.state)
    return (
      <div className="ui grid container">

        <CategorySelector handleChange={this.handleChange} activeCategory={this.state.filterBy}/>

        <TransactionsList transactions={this.handleTransactions()} />

      </div>
    )
  }
}

export default AccountContainer
