let balance = Number(localStorage.getItem("balance")) || 5000;
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

let deletedTransaction = null;


// Deposit
function deposit() {
    let amount = Number(document.getElementById("depositAmount").value);

    if (amount > 0) {
        balance += amount;

        transactions.push({
            type: "Deposit",
            amount: amount
        });

        saveData();
        displayTransactions();

        document.getElementById("balance").innerText =
            "Rs." + balance.toFixed(2);

        document.getElementById("depositAmount").value = "";

        showMessage("Deposit Successful!", "success");
    } else {
        showMessage("Please enter a valid amount!", "error");
    }
}


// Withdraw
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

        transactions.push({
            type: "Withdraw",
            amount: amount
        });

        saveData();
        displayTransactions();

        document.getElementById("balance").innerText =
            "Rs." + balance.toFixed(2);

        document.getElementById("withdrawAmount").value = "";

        showMessage("Withdrawal Successful!", "success");
    }
}


// Display Transactions
function displayTransactions() {
    let transactionList = document.getElementById("transactionList");

    if (transactions.length === 0) {
        transactionList.innerHTML = "<p>No transactions yet.</p>";
        return;
    }

    transactionList.innerHTML = "";

    transactions.forEach(function (transaction, index) {

        // Old transactions ko handle karna
        if (typeof transaction === "string") {

            if (transaction.startsWith("Deposit:")) {
                let amount = Number(
                    transaction.replace("Deposit: Rs.", "")
                );

                transaction = {
                    type: "Deposit",
                    amount: amount
                };
            }

            else if (transaction.startsWith("Withdraw:")) {
                let amount = Number(
                    transaction.replace("Withdraw: Rs.", "")
                );

                transaction = {
                    type: "Withdraw",
                    amount: amount
                };
            }
        }


        let item = document.createElement("div");

        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.marginBottom = "10px";


        let text = document.createElement("p");

        text.innerText =
            transaction.type + ": Rs." + transaction.amount;

        text.style.margin = "0";
        text.style.flex = "1";


        // Delete button
        let deleteButton = document.createElement("button");

        deleteButton.innerText = "🗑️";
        deleteButton.title = "Delete Transaction";

        deleteButton.style.width = "auto";
        deleteButton.style.padding = "8px 12px";
        deleteButton.style.marginLeft = "10px";
        deleteButton.style.background = "#dc2626";
        deleteButton.style.fontSize = "16px";


        deleteButton.onclick = function () {
            deleteTransaction(index);
        };


        item.appendChild(text);
        item.appendChild(deleteButton);

        transactionList.appendChild(item);
    });
}


// Delete Transaction
function deleteTransaction(index) {

    let transaction = transactions[index];


    // Old transaction format
    if (typeof transaction === "string") {

        if (transaction.startsWith("Deposit:")) {

            let amount = Number(
                transaction.replace("Deposit: Rs.", "")
            );

            transaction = {
                type: "Deposit",
                amount: amount
            };
        }

        else if (transaction.startsWith("Withdraw:")) {

            let amount = Number(
                transaction.replace("Withdraw: Rs.", "")
            );

            transaction = {
                type: "Withdraw",
                amount: amount
            };
        }
    }


    // Deleted transaction save
    deletedTransaction = {
        transaction: transaction,
        index: index
    };


    // Balance adjust
    if (transaction.type === "Deposit") {
        balance -= transaction.amount;
    }
    else if (transaction.type === "Withdraw") {
        balance += transaction.amount;
    }


    // Delete transaction
    transactions.splice(index, 1);

    saveData();
    displayTransactions();


    document.getElementById("balance").innerText =
        "Rs." + balance.toFixed(2);


    showMessageWithUndo("Transaction Deleted!");
}


// Undo Transaction
function undoTransaction() {

    if (deletedTransaction !== null) {

        let transaction = deletedTransaction.transaction;
        let index = deletedTransaction.index;


        // Transaction wapas add
        transactions.splice(index, 0, transaction);


        // Balance wapas adjust
        if (transaction.type === "Deposit") {
            balance += transaction.amount;
        }
        else if (transaction.type === "Withdraw") {
            balance -= transaction.amount;
        }


        saveData();
        displayTransactions();


        document.getElementById("balance").innerText =
            "Rs." + balance.toFixed(2);


        deletedTransaction = null;

        showMessage("Transaction Restored!", "success");
    }
}


// Save Data
function saveData() {

    localStorage.setItem("balance", balance);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}


// Message
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
}


// Delete ke baad Undo message
function showMessageWithUndo(message) {

    let messageBox = document.getElementById("message");

    messageBox.innerHTML = "";


    let text = document.createElement("span");

    text.innerText = message;


    let undoButton = document.createElement("button");

    undoButton.innerText = "↩️ Undo";

    undoButton.style.width = "auto";
    undoButton.style.marginLeft = "15px";
    undoButton.style.padding = "6px 12px";
    undoButton.style.background = "#2563eb";


    undoButton.onclick = function () {
        undoTransaction();
    };


    messageBox.appendChild(text);
    messageBox.appendChild(undoButton);


    messageBox.style.display = "block";
    messageBox.style.background = "#fef3c7";
    messageBox.style.color = "#92400e";
}


// Load transactions
displayTransactions();