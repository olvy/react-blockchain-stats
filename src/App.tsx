import './App.css'
import TransactionsData from './TransactionsChart/TransactionsData'

function App() {
  return (
    <div className='mx-36 min-w-[500px]'>
      <div className='font-bold'>Number of Etherium transactions grouped by blocks</div>
      <TransactionsData />
    </div>
  )
}

export default App
