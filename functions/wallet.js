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

    if(body.monto <= 0){
        return res.status(400).json({
            error:true,
            message:"El monto debe ser mayor a 0 para realizar la recarga."
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

            if(result.return){
                if(result.return.$value){
                    let val = JSON.parse(result.return.$value);

                    if(val.error){
                        return res.status(200).json({
                            error:true,
                            message:val.message
                        })
                    }else{
                        return res.status(200).json({
                            error:false,
                            data:val.message
                        })
                    }
                    
                }else{
                    return res.status(500).json({
                        error:true,
                        message:result
                    })
                }
            }else{
                return res.status(500).json({
                    error:true,
                    message:result
                })
            }
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

            if(result.return){
                if(result.return.$value){
                    let val = JSON.parse(result.return.$value);

                    if(val.error){
                        return res.status(200).json({
                            error:true,
                            message:val.message
                        })
                    }else{
                        return res.status(200).json({
                            error:false,
                            data:val.data
                        })
                    }
                    
                }else{
                    return res.status(500).json({
                        error:true,
                        message:result
                    })
                }
            }else{
                return res.status(500).json({
                    error:true,
                    message:result
                })
            }

        })
    });

}

module.exports = {
    rechargeWallet,
    consultBalance
}