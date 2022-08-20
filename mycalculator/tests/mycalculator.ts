 const assert = require('assert')
const anchor = require('@project-serum/anchor')

const {SystemProgram}  = anchor.web3;



describe('mycalculator',()=>{
    const provider = anchor.getProvider(); 
        anchor.setProvider(provider)

    const calculator = anchor.web3.Keypair.generate()
    const program = anchor.workspace.Mycalculator

    it('Creates a calculator',async () => {

        await program.rpc.create("Greetings",{
             accounts:{
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId, 
             },
             signers:[calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey)
        assert.ok(account.greeting == "Greetings")
        
    })

    it('Add numbers', async()=>{

        await program.rpc.add( new anchor.BN(2),new anchor.BN(3),{


            accounts:{
                calculator:calculator.publicKey
            }
            })
            const account = await program.account.calculator.fetch(calculator.publicKey)
            assert.ok(account.result.eq(new anchor.BN(5)))


    })

})