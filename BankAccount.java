
import java.util.Scanner;

class BankAccount {

    private long accountNumber;
    private String accountHolderName;
    private double balance;
    private int pin;
    String[] transactions = new String[10];
    int transactionCount = 0;

    BankAccount(long accountNumber, String accountHolderName, double balance, int pin) {

        this.accountNumber = accountNumber;
        this.accountHolderName = accountHolderName;
        this.balance = balance;
        this.pin = pin;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            transactions[transactionCount] = "Deposit: Rs." + amount;
            transactionCount++;
            System.out.println("Deposit Succesfull!");
            System.out.println("Deposit Amount: " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            System.out.println("Invalid Amount");
        }
    }

    public void withdraw(double amount) {

        if (amount>0 && amount <= balance) {
            balance = balance - amount;
            transactions[transactionCount] = "Withdraw: Rs." + amount;
            transactionCount++;
            System.out.println("Withdraw Successful!");
            System.out.println("Withdraw Amoount: " + amount);
            System.out.println("New Balance: " + balance);
        } else {
            if(amount<=0){
                System.out.println("Invalid Amount");
            }else{
            System.out.println("Insufficient Balance!");
            }
        }
    }

    public boolean verifyPin(int enterPin) {
        return this.pin == enterPin;
    }

    public double getBalance() {
        return balance;
    }

    public void displayAccountDetails() {

        System.out.println("Account Number: " + accountNumber);
        System.out.println("Account Holder: " + accountHolderName);
        System.out.println("Balance: " + balance);
    }

   public void displayTransactions() {

        System.out.println("\n--- Transaction History ---");

        if (transactionCount == 0) {
            System.out.println("No transactions yet.");
        } else {
            for (int i = 0; i < transactionCount; i++) {
                System.out.println(transactions[i]);
            }
        }
    }

    public static void main(String args[]) {

        Scanner sc = new Scanner(System.in);

        BankAccount account = new BankAccount(123456789012L, "Soni Kumari", 50000, 9229);

        int choice;

        System.out.print("Enter your Pin: ");
        int enterpin = sc.nextInt();

        if (!account.verifyPin(enterpin)) {
            System.out.println("Incorrect Pin!");
            return;
        }

        System.out.println(" Pin verified successfully!");

        do {
            System.out.println("\n --- Bank Management System ---");
            System.out.println("1. Account Details");
            System.out.println("2. Deposit");
            System.out.println("3. Withdraw");
            System.out.println("4. Check Balance");
            System.out.println("5. Transaction History");
            System.out.println("6. Exit");

            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {

                case 1:
                    account.displayAccountDetails();
                    break;

                case 2:
                    System.out.print("Enter amount to deposit: ");
                    double depositAmount = sc.nextDouble();
                    account.deposit(depositAmount);
                    break;

                case 3:
                    System.out.print("Enter amount to withdraw:  ");
                    double withdrawAmount = sc.nextDouble();
                    account.withdraw(withdrawAmount);
                    break;

                case 4:
                    System.out.println("Current Balance: " + account.getBalance());
                    break;

                case 5:
                    account.displayTransactions();
                    break;

                case 6:
                    System.out.println("Thank you for using Bank Management System! ");
                    break;
                default:
                    System.out.println("Invalid Choice");
            }
        } while (choice != 6);

        sc.close();

    }

}
