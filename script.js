 const bal=document.getElementById("bal");
 const incomeAmt=document.getElementById("income-amount");
 const expenseAmt=document.getElementById("expense-amount");
 const transactionList=document.getElementById("transaction-list");
 const transactionform=document.getElementById("transaction-form");
 const description=document.getElementById("description");
 const amt=document.getElementById("amount");

 let  transaction=JSON.parse(localStorage.getItem("transaction"))|| [];
 transactionform.addEventListener("submit",addTransaction);

 function addTransaction(e)
 {
    e.preventDefault();
      const des=description.value.trim();
      const amount=parseFloat(amt.value);

      transaction.push({
        id:Date.now(),
        description:des,
        amountd
      });
      localStorage.setItem("transaction",JSON.stringify(transaction));
      updateTransaction();
      updateSummary();
      transactionform.reset();

 }
 function updateTransaction()
 {
    transactionList.innerHTML="";
    const sortedTransaction=[...transaction].reverse();
    sortedTransaction.forEach(transaction => 
    {
        const transactionEl=createTransaction(transaction)
        transactionList.appendChild(transactionEl);

    });
 }
 function createTransaction (transaction)
 {
    const li=document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income":"expense");
    li.innerHTML=`
    <span>${transaction.description}</span>
    <span>
        ${formatCurrency(transaction.amount)}
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
    </span>`;    
    return li;    
 }
 function removeTransaction(id)
 {
    transaction=transaction.filter(transaction=> transaction.id!==id)
    localStorage.setItem("transaction",JSON.stringify(transaction));
    updateTransaction();
    updateSummary();
 }

 
 function updateSummary()
 {
    const balance=transaction.reduce((acc,transaction)=>acc+transaction.amount,0);
    const income=transaction.filter(transaction=>transaction.amount>0).reduce((acc,transaction)=>acc+transaction.amount,0);
    const expense=transaction.filter(transaction=>transaction.amount<0).reduce((acc,transaction)=>acc+transaction.amount,0);
    bal.textContent=formatCurrency(balance);
    incomeAmt.textContent=formatCurrency(income);
    expenseAmt.textContent=formatCurrency(expense);

 }
 function formatCurrency(number)
 {
    return new Intl.NumberFormat("en-IN",{
        style:"currency",
        currency:"INR",

    }).format(number);
 }
  updateTransaction();
  updateSummary();
