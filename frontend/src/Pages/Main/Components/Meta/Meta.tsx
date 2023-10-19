import React, { useEffect, useState } from 'react'
import { AiFillCalendar, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { PiCaretDoubleUpBold } from 'react-icons/pi'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';


import type { FC } from "react";
import type { Range } from "react-date-range";
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../../../../store/slices/receiptsSlice';

interface Data {
    handelerClick:Function
}
import styles from './Meta.module.css'

export default function Meta({handelerClick}:Data) {
    const [search, setSearch] = useState(false)
    const [calendar, setCalendar] = useState(false)
    const [selectionRange, setSelectionRange] = useState<Range[]>([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      }])
    const [searchPlace, setSearchPlace] = useState('')
    const [searchItem, setSearchItem] = useState('')
    const [searchStartData, setSearchStartData] = useState(0)
    const [searchEndData, setSearchEndData] = useState(0)

    const dispatch = useDispatch()
    // ?retailplace=лебник&item_name=Пакет&date_from=2023-10-12&date_to=2023-10-12      
    useEffect(()=>{
        let params = '?'
        const arr =[searchPlace ,searchItem ,searchStartData ,searchEndData]
        for (let i=0; i<arr.length; i++){
            if(!arr[i]) continue
            if (params.length !== 1){
                params += '&'
            }
            switch (i){
                case 0:
                    params += 'retailplace=' + searchPlace
                    break
                case 1:
                    params += 'item_name=' + searchItem
                    break
                case 2:
                    params += 'date_from=' + searchStartData
                    break
                case 3:
                    params += 'date_to=' + searchEndData
                    break
            }
        }
        console.log(params)
        dispatch(setSearchParams(params))
    },[searchPlace,searchItem,searchStartData,searchEndData])

    const dateChange = (item) => {
        setSelectionRange([item.selection])
        const dateStart = Date.parse([item.selection][0].startDate)
        const dateEnd = Date.parse([item.selection][0].endDate)
        if (dateStart === dateEnd) {
            setSearchStartData(dateStart)
            setSearchEndData('')
        } else{
            setSearchStartData(dateStart)
            setSearchEndData(dateEnd)
        }
        console.log(dateStart, dateEnd)
    }
  
    const closeClick = () => {
        setCalendar(false)
        setSearch(false)
        dispatch(setSearchParams(''))
    }


  return !search ? (
    <div className={styles.container}>
        <button onClick={()=>setSearch(true)}>
            <AiOutlineSearch />
        </button>
        
        <button 
          onClick={handelerClick}
          >
                <PiCaretDoubleUpBold />
        </button> 
    </div>
  ): (
    <div className={styles.container}>
        <input type="text" 
                name="retailPlace" 
                placeholder="Магазин" 
                onChange={(e)=>setSearchPlace(e.target.value)}
                  />
        <input type="text" 
                  name="item" 
                  placeholder="Название товара" 
                  onChange={(e)=>setSearchItem(e.target.value)}
                 />
        <button onClick={()=> !calendar ? setCalendar(true) : setCalendar(false)}>
            < AiFillCalendar />
        </button>
        {calendar && <div className={styles.calendarWrapper}>
            <DateRange
            className={styles.calendar}
            editableDateInputs={true}
            onChange={dateChange}
            moveRangeOnFirstSelection={false}
            ranges={selectionRange}
            />
        </div>}
        
        <button onClick={closeClick}>
            <AiOutlineClose />
        </button>

        <button 
          onClick={handelerClick}
           >
                <PiCaretDoubleUpBold />
        </button> 
    </div>
  )
}
