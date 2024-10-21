async function planilhaEmailHTML() {
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
                        <p>Olá!</p>
                        <p>Planilha está em anexo com os dados processados.</p>
            
                        <p>Acesse o painel Dottie para analisar os dados processados:</p>
                        <a href="https://dottie-plataforma-develop.vercel.app" target="_blank">Painel Dottie</a>
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
    planilhaEmailHTML
};