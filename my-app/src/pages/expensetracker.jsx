import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { serverTimestamp } from "firebase/firestore";

function Expensetracker() {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    description: yup.string().required("Enter descirption"),
    amount: yup.string().required("Enter amount"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [description, setdescription] = useState("");
  const [transactionAmount, settransactionamount] = useState(0);
  const [transactiontype, settransactiontype] = useState("expense");
  const [totaltransactionincome, settotaltransactionincome] = useState(0);
  const [totaltransactionexpense, settotaltransactionexpense] = useState(0);
  const postref = collection(db, "transactions");
  const addtodb = async ({
    description,
    transactionAmount,
    transactiontype,
  }) => {
    await addDoc(postref, {
      userId: user.uid,
      description,
      transactionAmount,
      transactiontype,
      createdAt: serverTimestamp(),
    });
  };
  const onSubmit = () => {
    addtodb({
      description,
      transactionAmount,
      transactiontype,
    });
    // if (transactiontype === "expense") {
    //   settotaltransactionexpense(
    //     Number(transactionAmount + totaltransactionexpense)
    //   );
    // } else {
    //   settotaltransactionincome(
    //     Number(transactionAmount + totaltransactionincome)
    //   );
    // }
  };

  //onsnapshot is a function from firebase it keeps the track of chnages in querytransactions in database
  const [data, setdata] = useState([]);
  const getdata = async () => {
    let unsubscribe;
    try {
      const result = await query(
        postref,
        where("userId", "==", user.uid),
        orderBy("createdAt")
      );
      unsubscribe = onSnapshot(result, (snapshot) => {
        let docs = [];
        let expense = 0,
          income = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
          if (data.transactiontype === "expense") {
            expense = parseFloat(data.transactionAmount) + expense;
            console.log(data);
          } else {
            income = parseFloat(data.transactionAmount) + income;
            console.log(data);
          }
        });
        settotaltransactionexpense(expense);
        settotaltransactionincome(income);

        setdata(docs);
      });
    } catch (error) {
      console.log(error);
    }
    return () => unsubscribe(), { data };
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="expensetracker">
      <div className="heading">
        {/* <h1>Expense Trackers</h1> */}
        <div className="balance">
          <h3>Your balance</h3>
          <h2>$0.00</h2>
        </div>
        <div className="balance">
          <h4>Income</h4>
          <p>${totaltransactionincome}</p>
        </div>
        <div className="balance">
          <h4>Expense</h4>
          <p>${totaltransactionexpense}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit(addtodb)}>
        <input
          type="text"
          placeholder="description"
          className="box"
          required
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="amount"
          required
          onChange={(e) => {
            settransactionamount(e.target.value);
          }}
          className="box1"
        />

        <div className="allbtn">
          {" "}
          <input
            type="radio"
            value="expense"
            onChange={(e) => {
              settransactiontype(e.target.value);
            }}
            checked={transactiontype === "expense"}
          />
          <label>Expense</label>
          <input
            type="radio"
            value="income"
            onChange={(e) => {
              settransactiontype(e.target.value);
            }}
            checked={transactiontype === "income"}
          />
          <label>Income</label>
          <button type="submit" onClick={onSubmit} className="button">
            Add transaction
          </button>
        </div>
      </form>
      <div className="map">
        <h3>Transaction</h3>
        <ul>
          {data.map((i) => {
            return (
              <li>
                <h4>{i.description}</h4>
                <p>${i.transactionAmount}</p>*
                <label
                  style={{
                    color: i.transactiontype === "expense" ? "red" : "green",
                  }}
                >
                  {i.transactiontype}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Expensetracker;
