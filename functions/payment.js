const soap = require('soap');

let pay = (req,res) => {
    let body = req.body;
    let url = 'http://pasarela-soap.test/payment?wsdl=true';

    if(!body.cedula || !body.email || !body.monto || !body.descripcion){
        return res.status(400).json({
            error:true,
            message:"Faltan datos para realizar el pago."
        });
    }

    if(body.monto <= 0){
        return res.status(400).json({
            error:true,
            message:"El monto debe ser mayor a 0 para realizar el pago."
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
            email:body.email,
            descripcion:body.descripcion,
            monto:body.monto
        }
        wallet.pay(args, (err,result) => {

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

let confirmPayment = (req,res) => {
    let body = req.body;
    let url = 'http://pasarela-soap.test/payment?wsdl=true';

    if(!body.token || !body.session_id){
        return res.status(400).json({
            error:true,
            message:"Faltan datos para realizar la confirmacion del pago."
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
            token:body.token,
            session_id:body.session_id
        }
        client.confirmPayment(args, (err,result) => {

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

module.exports = {
    pay,
    confirmPayment
}