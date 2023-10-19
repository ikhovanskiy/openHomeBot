import {MutableRefObject, useState, useRef} from 'react'
import { addReceipt } from './API/addReceipt'
import AddItem from '../AddItem/AddItem'
import { addNewItem, clearItems, setReceipts } from '../../../../store/slices/receiptsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getMyReceipts } from '../MyReceipts/API/getMyReceipts'
import QrReader from 'react-qr-scanner'

import styles from './AddReceipts.module.css'
import { AiFillCamera, AiOutlinePlus } from 'react-icons/ai'
import { BiCameraOff } from 'react-icons/bi'
import { RootState } from '../../../../store/store'
import Modal from '../../../../common/Modal'

export default function AddReceipts() {
  const items = useSelector((state: RootState) => state.receipts.items)
  const total_sum = useSelector((state: RootState) => state.receipts.total_sum)

  const dispatch = useDispatch()

  const defaultReceipt = {
    total_sum: 0,
    retailplace: {
        name: "",
        address: ""
    }
  }
  
  const defaultItem = {
    id: "",
    price: 0,
    name: "",
    quantity: 1,
    producttype: {
        name: ""
    }
  }

  const [btnText, setBtnText] = useState('Сохранить')
  const [status, setStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [receipt, setReceipt] = useState(defaultReceipt)
  const [isModaulActive, setIsModaulActive] = useState(false);
  const [isWebCamAvalable, setIsWebCamAvalable] = useState(false);

  const myRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>

  const handleClick = () => {
    if(receipt.retailplace.name.length < 1 || receipt.retailplace.address.length < 1){
      setErrorMessage('Магазин или улица не заполнены')
      setTimeout(()=> setErrorMessage(''), 2000)
      return
    }
    if (items.length<1 || items[0].name.length < 1){
      setErrorMessage('Пустой чек')
      setTimeout(()=> setErrorMessage(''), 2000)
      return
    }
    setBtnText('Loading...')
    setReceipt({...receipt, total_sum: total_sum})    
    addReceipt({...receipt, total_sum: total_sum}, items)
    .then(() => {
      getMyReceipts()
      .then((data)=>dispatch(setReceipts(data)))
      .then(()=>{
        setBtnText('Сохранить')
        setStatus(false)
        setReceipt(defaultReceipt)
        dispatch(clearItems())
      })
      .catch(()=> setBtnText('Error'))
    })
    .catch(()=> setBtnText('Error'))
  }
  
  const handlerQrPopUp = () => {
    isModaulActive ? setIsModaulActive(false) : setIsModaulActive(true)
  }
  const handleModalClose = () => {
    if (!isModaulActive) return
    setIsModaulActive(false)
  }
  const handleError = (err) => {
    console.error(err)
  }
  const handleScan = (data) => {
    if (data){
      handleModalClose()
      console.log(data)
    }
    
  };


  navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    navigator.getMedia({video: true}, function() {
      setIsWebCamAvalable(true)
    }, function() {
      setIsWebCamAvalable(false)
    // webcam is not available
    });


  return !status ? (
    <div >
      <button onClick={()=>setStatus(true)}>
          <AiOutlinePlus />
      </button>
    </div> 
  ) : 
  (
    <div className={styles.container}>
      <div className={styles.wrapper}>

        <button onClick={()=>{dispatch(clearItems())
                              setStatus(false)}}>
            Назад
        </button>
        <button onClick={handlerQrPopUp}>
          <AiFillCamera />
        </button>
        <button onClick={handleClick}>
            {btnText}
        </button>

        <p>{errorMessage}</p>
        
      </div>
      
      <input type="text" 
        name="retailplaceName" 
        placeholder="Где купил?" 
        onChange={(e)=>setReceipt({...receipt, retailplace: {...receipt.retailplace, name: e.target.value }})} />

      <input type="text" 
        name="retailplaceAddress" 
        placeholder="А адресс какой?" 
        onChange={(e)=>setReceipt({...receipt, retailplace: {...receipt.retailplace, address: e.target.value }})} />

      <p>Всего: {total_sum} руб</p>

      <button onClick={() => {
        dispatch(addNewItem(defaultItem))
        setTimeout(()=>myRef.current.scrollIntoView())
        }}>
        <AiOutlinePlus />
      </button>
      
      <div className={styles.itemContainer}>
        {items.map((el,i) => {if(el) { return <AddItem key={i} data={el} id={i}/>}})}
        <div ref={myRef}></div> 
      </div>
        {!!isModaulActive && <Modal onClose={handleModalClose}>
              
              {
                isWebCamAvalable && <>
                <p className={styles.popupTitle}>Отсканируйте QR-code</p>
                <QrReader
                className={styles.qrReader}
                delay={300}
                onError={handleError}
                onScan={handleScan}
              />
                </>
              }
              {
                !isWebCamAvalable && <>
                  <p className={styles.popupTitle}> Пожалуйста разрешите камеру на странице</p>
                  <BiCameraOff className={styles.noCamIcon}/>
                  </>
              }
            </Modal>}
    </div> 
  ) 
}
