const soap = require('soap');

let createClient = (req,res) => {
    let body = req.body;
    let url = 'http://pasarela-soap.test/client?wsdl=true';

    if(!body.nombres || !body.cedula || !body.email || !body.celular){
        return res.status(400).json({
            error:true,
            message:"Faltan datos para realizar el registro."
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
            nombres:body.nombres,
            cedula:body.cedula,
            celular:body.celular,
            email:body.email
        }
        client.create(args, (err,result) => {

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
    createClient
}