async function formattedTextFromImage(extractedText) {
    try {
        // Divida o texto em linhas
        const lines = extractedText.split('\n');
        
        const data = {};
        let currentKey = null;

        lines.forEach(line => {
            // Limpar a linha de caracteres indesejados
            const cleanedLine = line.replace(/[^a-zA-Z0-9À-ÿ\s@©]/g, '').trim();

            // Se a linha contém o símbolo @, é uma chave que pode ter um valor associado
            if (cleanedLine.includes('@')) {
                const parts = cleanedLine.split('@').map(part => part.trim());
                if (parts.length > 1) {
                    // Definindo a chave e o valor
                    data[parts[0]] = parts[1] || null; // Atribui o valor, se houver
                }
            } else if (cleanedLine.length > 0) {
                // Linha que não contém @, pode ser uma nova chave
                currentKey = cleanedLine;
                data[currentKey] = null; // Inicializa como null
            }

            // Se a linha é numérica e temos uma chave atual, atribui o valor
            if (currentKey && /^\d+$/.test(cleanedLine)) {
                data[currentKey] = cleanedLine; // Atribui o valor à chave atual
                currentKey = null; // Reseta a chave atual
            }
        });

        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}



module.exports = {
    formattedTextFromImage
}
