let balance = Number(localStorage.getItem("balance")) || 5000;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function deposit() {
    let amount = Number(document.getElementById("depositAmount").value);

    if (amount > 0) {
        balance += amount;

      
        transactions.push("Deposit: Rs." + amount);

         localStorage.setItem("balance", balance);
        localStorage.setItem("transactions", JSON.stringify(transactions));

        displayTransactions();

        document.getElementById("balance").innerText =
            "Rs." + balance.toFixed(2);

        document.getElementById("depositAmount").value = "";

        showMessage("Deposit Successful!", "success");
    } else {
        alert("Please enter a valid amount!");
    }
}
function withdraw() {
    let amount = Number(document.getElementById("withdrawAmount").value);

    if (amount <= 0) {
        showMessage("Please enter a valid amount!", "error");
    }
    else if (amount > balance) {
        showMessage("Insufficient Balance!", "error");
    }
    else {
        balance -= amount;

    
        transactions.push("Withdraw: Rs." + amount);

         localStorage.setItem("balance", balance);
localStorage.setItem("transactions", JSON.stringify(transactions));

        displayTransactions();

        document.getElementById("balance").innerText =
            "Rs." + balance.toFixed(2);

        document.getElementById("withdrawAmount").value = "";

        showMessage("Withdrawal Successful!", "success");
    }
}

function displayTransactions() {
    let transactionList = document.getElementById("transactionList");

    if (transactions.length === 0) {
        transactionList.innerHTML = "<p>No transactions yet.</p>";
        return;
    }

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        let item = document.createElement("p");
        item.innerText = transaction;
        transactionList.appendChild(item);
    });
}
function showMessage(message, type) {
    let messageBox = document.getElementById("message");

    messageBox.innerText = message;
    messageBox.style.display = "block";

    if (type === "success") {
        messageBox.style.background = "#dcfce7";
        messageBox.style.color = "#166534";
    }
    else if (type === "error") {
        messageBox.style.background = "#fee2e2";
        messageBox.style.color = "#991b1b";
    }
    displayTransactions();
}
