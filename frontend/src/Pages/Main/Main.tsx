
import Header from '../../Components/Header/Header'
import useAutorise from '../../hooks/useAutorise'
import Receipts from './Components/Receipts/Receipts'

export default function Main() {
  useAutorise()
  return (
    <>
     <Header />
     <Receipts />
    </>
  )
}
