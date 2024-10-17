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
                        <p>Olá Fulano Silva</p>

                        <p>As imagens foram processadas!</p>
                        <p>A planilha está em anexo.</p>
            
                        <p>Acesse o painel Dottie para analisar os dados processados:</p>
                        <a href="https://dottie-plataforma-develop.vercel.app" target="_blank">Painel Dottie</a>
                    </div>

                    <div>
                    <img src="https://mf-planejados.s3.amazonaws.com/logo.png" alt="Logo da Empresa">
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