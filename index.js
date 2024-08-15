const dotenv = require("dotenv") ;
const port = process.env.PORT || 5050;
dotenv.config();
const User = require('./user');
const uri = process.env.url;
const mongoose = require('mongoose');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
const {
    Hbar,
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    TransferTransaction,
  } = require("@hashgraph/sdk")

console.log("App listen at port 5050");
app.use(express.json());
app.use(cors());
app.get("/login", (req, resp) => {

 
    User.findOne({email: req.body.email })
    .then((docs)=>{
        if (docs.password){
          if(docs.password == req.body.password){
            resp.send(docs)
          }else {
            resp.send('null')
          }
        }
    })
    .catch((err)=>{
          console.log(err);
    });
});

app.get("/carers", async(req, resp) => {

  try {
    const users = await User.find({});
    resp.send(users);
  } catch (error) {
    console.error(error);
    resp.status(500).send(error);
  }
});



app.post("/register" ,async (req, resp) => {

  //create account for user
  var accountID = 0;
  var totalhbars = 0;

  async function environmentSetup(){
    // Grab your Hedera testnet account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null || myPrivateKey == null) {
      throw new Error(
        "Environment variables myAccountId and myPrivateKey must be present"
      );
    }

    // Create your connection to the Hedera network
    const client = Client.forTestnet();

    //Set your account as the client's operator
    client.setOperator(myAccountId, myPrivateKey);

    // Set default max transaction fee & max query payment
    client.setDefaultMaxTransactionFee(new Hbar(100));
    client.setDefaultMaxQueryPayment(new Hbar(50));

    // Create new keys
    const newAccountPrivateKey = PrivateKey.generateED25519();
    const newAccountPublicKey = newAccountPrivateKey.publicKey;

    // Create a new account with 1,000 tinybar starting balance
    const newAccountTransactionResponse = await new AccountCreateTransaction()
      .setKey(newAccountPublicKey)
      .setInitialBalance(Hbar.fromTinybars(1000))
      .execute(client);

    // Get the new account ID
    const getReceipt = await newAccountTransactionResponse.getReceipt(client);
    const newAccountId = getReceipt.accountId;

    console.log( accountID = "" + newAccountId);

    if(req.body.diff){
      if(req.body.diff == 0){
        
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
        .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        console.log(
          "The transfer transaction from my account to the new account was: " +
            transactionReceipt.status.toString()
        );

        // Check the new account's balance
        const getNewBalance = await new AccountBalanceQuery()
          .setAccountId(newAccountId)
          .execute(client);
        let num =  "" + getNewBalance.hbars.toTinybars()

        console.log(totalhbars =  totalhbars + Number.parseInt(num));
      }
      if(req.body.diff == 1){
        
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-2000))
        .addHbarTransfer(newAccountId, Hbar.fromTinybars(2000))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        console.log(
          "The transfer transaction from my account to the new account was: " +
            transactionReceipt.status.toString()
        );

        // Check the new account's balance
        const getNewBalance = await new AccountBalanceQuery()
          .setAccountId(newAccountId)
          .execute(client);
          let num =  "" + getNewBalance.hbars.toTinybars()

          console.log(totalhbars =  totalhbars + Number.parseInt(num));
        }
    
    }

    if(req.body.diff2){
      if(req.body.diff2 == 0){
        
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
        .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        console.log(
          "The transfer transaction from my account to the new account was: " +
            transactionReceipt.status.toString()
        );

        // Check the new account's balance
        const getNewBalance = await new AccountBalanceQuery()
          .setAccountId(newAccountId)
          .execute(client);

          let num =  "" + getNewBalance.hbars.toTinybars()

        console.log(totalhbars =  totalhbars + Number.parseInt(num));
      }
      if(req.body.diff2 == 1){
        
        // Create the transfer transaction
        const sendHbar = await new TransferTransaction()
        .addHbarTransfer(myAccountId, Hbar.fromTinybars(-2000))
        .addHbarTransfer(newAccountId, Hbar.fromTinybars(2000))
        .execute(client);

        // Verify the transaction reached consensus
        const transactionReceipt = await sendHbar.getReceipt(client);
        console.log(
          "The transfer transaction from my account to the new account was: " +
            transactionReceipt.status.toString()
        );

        // Check the new account's balance
        const getNewBalance = await new AccountBalanceQuery()
          .setAccountId(newAccountId)
          .execute(client);

          let num =  "" + getNewBalance.hbars.toTinybars()

          console.log(totalhbars =  totalhbars + Number.parseInt(num));
      }
    
    }



    var  stars = 1;
    console.log(accountID,Number(totalhbars));
    if(Number(totalhbars) <= 3000 && Number(totalhbars) > 1000){
      stars = 2;
    }
    if(Number(totalhbars) > 3000 ){
      stars = 3;
    }
  
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            hbaraccount: accountID,
            location: req.body.location,
            stars: stars
        });
        let result = await user.save();
        if (result) {
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("User already registered");
        }

    } catch (e) {
        resp.status(404).send(e,"Something Went Wrong");
    }

  }
  environmentSetup();


  
});
app.listen(port);