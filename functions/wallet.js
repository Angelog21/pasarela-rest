const soap = require('soap');

let rechargeWallet = (req,res) => {
    let body = req.body;
    let url = 'http://pasarela-soap.test/wallet?wsdl=true';

    if(!body.cedula || !body.celular || !body.monto){
        return res.status(400).json({
            error:true,
            message:"Faltan datos para realizar la recarga."
        });
    }
    soap.createClient(url, (error, wallet) => {

        if(error){
            console.log(error);
            return res.status(500).json({
                error:true,
                message:error
            })
        }

        let args = {
            cedula:body.cedula,
            celular:body.celular,
            monto:body.monto
        }
        wallet.recharge(args, (err,result) => {

            if(err){
                console.log(err);
                return res.status(500).json({
                    error:true,
                    message:err
                })
            }

            console.log("result",result);

            res.status(200).json({
                error:false,
                data:result
            })
        })
    });

}

let consultBalance = (req,res) => {
    let body = req.body;
    let url = 'http://pasarela-soap.test/wallet?wsdl=true';

    if(!body.cedula || !body.celular){
        return res.status(400).json({
            error:true,
            message:"Faltan datos para realizar la consulta de saldo."
        });
    }
    soap.createClient(url, (error, client) => {

        if(error){
            console.log(error);
            return res.status(500).json({
                error:true,
                message:error
            })
        }

        let args = {
            cedula:body.cedula,
            celular:body.celular
        }
        client.search(args, (err,result) => {

            if(err){
                console.log(err);
                return res.status(500).json({
                    error:true,
                    message:err
                })
            }

            console.log("result",result);

            res.status(200).json({
                error:false,
                data:result
            })
        })
    });

}

module.exports = {
    rechargeWallet,
    consultBalance
}