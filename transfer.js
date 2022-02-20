

import {
  getDatabase,
  ref,
  update,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const db = getDatabase();
var rollbox = document.getElementById("Rollbox");
var rollbox2 = document.getElementById("Rollbox2")
var cash_box = document.getElementById("cash")
var moneyout
var moneyin
var transferall = document.getElementById("transferall")

function updateData() {
  selectData()
  alert(moneyout)
  update(ref(db, "TheStudents/" + rollbox.value), {
    cashes : moneyout,
  })
    .then(() => {
      alert("data stored successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error: " + error);
    });
}

function updateDatagiver() {
  selectDatagiver()
  alert(moneyin)
  update(ref(db, "TheStudents/" + rollbox2.value), {
    cashes : moneyin,
  })
    .then(() => {
      alert("data stored successfully");
    })
    .catch((error) => {
      alert("unsuccessful, error: " + error);
    });
}

transferall.addEventListener("click", transfers);

function selectData() {
  const dbref = ref(db);
  get(child(dbref, "TheStudents/" + rollbox.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        moneyout = Number(snapshot.val().cashes) + Number(cash_box.value)
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert("unsuccessful, error: " + error);
    });
}

function selectDatagiver() {
  const dbref = ref(db);
  get(child(dbref, "TheStudents/" + rollbox2.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if(Number(snapshot.val().cashes) == 0){
          alert("Bạn không đủ tiền")
          return
        }
        else if(Number(cash_box.value) >  Number(snapshot.val().cashes)){
          alert("Bạn không đủ tiền")
          return
        }
        else{
          moneyin = Number(snapshot.val().cashes) - Number(cash_box.value)
        }
        
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert("unsuccessful, error: " + error);
    });
}

function transfers(){
  updateDatagiver()
  updateData()
}