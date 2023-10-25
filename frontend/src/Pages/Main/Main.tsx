
import Header from '../../Components/Header/Header'
import useAutorise from '../../hooks/useAutorise'
import Receipts from './Components/Receipts/Receipts'

export default function Main() {
  useAutorise();
  const cookies = document.cookie.split(' ');
  const user = cookies.find(el => el.includes('user='));
  const user_value = user?.split('=')[1];  
  if (user_value && user_value != ';') {
  return (
    <>
      <Header />
      <Receipts />
    </>
  )}
}
