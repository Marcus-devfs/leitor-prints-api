async function credentialsAccessHTML(user) {
    return (
        `
            <!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            
            <body>
            
            <div>
            <div>
                <p>Olá! ${user?.name},</p>
                <p>Você já pode acessar o painel Dottie.</p>
                <a href="https://dottie-plataforma-develop.vercel.app" target="_blank">Painel Dottie</a>
    
                <p>Faça login com as Credenciais de acesso abaixo:</p>
   
                <p style="font-size: 18px;">Login: ${user?.email}</p>
               <p style="font-size: 18px;">Senha: ${user?.senha}</p>
            </div>
   
        <div style="display: flex; align-items: center; justify-content: flex-start; margin-top: 20px;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
             <img src="https://mf-planejados.s3.amazonaws.com/avatar-dottie.png" alt="Logo da Empresa">
             <img src="https://mf-planejados.s3.amazonaws.com/logo-dottie.png" alt="Nome da Empresa">
          </div>
        </div>
        </div>
            
            </body>
            
            </html>
        `
    )
}


module.exports = {
    credentialsAccessHTML
};