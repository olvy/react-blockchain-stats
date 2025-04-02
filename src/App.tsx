import './App.css'
import 'react-components/dist/globals.css';
import TransactionsData from './TransactionsChart/TransactionsData'
import TradesChartData from './TradesChart/TradesChartData';

function App() {
  return (
    <div className='mx-36 min-w-[500px] flex flex-col gap-14'>
      <TransactionsData />
      <TradesChartData />
    </div>
  )
}

export default App
