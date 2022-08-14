// Importing required packages

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair, // Allows us to create new wallet
    LAMPORTS_PER_SOL

} = require("@solana/web3.js")



const wallet =new Keypair()

const publickey = new PublicKey(wallet._keypair.publicKey)
const secretkey = wallet._keypair.secretkey /// ////


const getWalletBalance =async() =>{        
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed') //devnet is a replica of solanas main net

        const walletBalance =  await connection.getBalance(publickey)

        console.log(walletBalance) 


    }catch(err){
        console.log(err)
    }
} 


const airdropSOL = async()=>{
    try{
        const connection = new Connection(clusterApiUrl('devnet'),'confirmed') 
        const fromAirDromSignature = await connection.requestAirdrop(publickey,1 * LAMPORTS_PER_SOL) //getBalance( WALLETADDRESS, AMOUNTTOBESHARED )
        
        await connection.confirmTransaction(fromAirDromSignature)

    }catch(err){
        console.log(err)
    }
} 


const main = async() => {
    await getWalletBalance()
    await airdropSOL()
    await getWalletBalance()

}

main()



console.log(publickey)
console.log(secretkey)