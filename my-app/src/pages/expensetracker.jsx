import React, { useEffect, useState } from 'react'
import * as yup from "yup";
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc,collection } from 'firebase/firestore';
import {auth, db} from '../config/firebase'
import { serverTimestamp } from 'firebase/firestore';


function Expensetracker() {
    const schema = yup.object().shape({
        description: yup.string().required("Enter descirption"),
        amount : yup.string().required("Enter amount")
    })
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })
    const [description, setdescription] = useState("");
    const [transactionAmount, settransactionamount] = useState(0);
    const [transactiontype,settransactiontype] = useState("expense")
    const [user] = useAuthState(auth);
    const postref = collection(db, "transactions");
    const addtodb = async ({description,transactionAmount,transactiontype} ) => {
        await addDoc(postref, {
            userId: user.uid,
            description,
            transactionAmount,
            transactiontype,
            createdAt: serverTimestamp()
        })
        
    }
    const onSubmit = (e) => {
        addtodb({
            description,
            transactionAmount,
            transactiontype,
            
        })
    }
    
  return (
      <div>
          <div>
          <h1>Expense Trackers</h1>
          <div>
              <h3>Your balance</h3>
              <h2>$0.00</h2>
          </div>
              <div>
                  <h4>Income</h4>
                  <p>$0.00</p>
              </div>
             <div><h4>Expense</h4>
                  <p>$0.00</p></div>          
          </div>
          <form onSubmit={handleSubmit(addtodb)}>
              <input type='text' placeholder='description'  required onChange={(e)=>{setdescription(e.target.value)}}/>
              
              <input type='number' placeholder='amount'required onChange={(e)=>{settransactionamount(e.target.value)}}/>
             
              <input type='radio' value="expense" onChange={(e) => { settransactiontype(e.target.value) }} checked={transactiontype==="expense"} />
              <input type='radio' value="income" onChange={(e)=>{settransactiontype(e.target.value)}} checked={transactiontype==="income"} />
              <label >Income</label>
              <label >Expense</label>
             <button type='submit' onClick={onSubmit}>Add transaction</button>
          </form>
          <div>
              <h3>Transation</h3>
          </div>
      </div>
  )
}

export default Expensetracker