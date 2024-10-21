//Redes Sociais e formatos

//Instagram - Feed - OK
//Instagram - Reels - OK
//Instagram - Story - OK

//TikTok - Video - OK
//Youtube - Video
//Youtube - Short
//Twiter - Post
//Facebook


//Dados por plataforma:

//TIKTOK:
// Visualizacoes
// Curtidas
// Comentarios
// Compartilhamentos
// Salvamentos
// Tempo Medio de Visualizacao
// Taxa de Retencao
// Visualizacoes Completas
// Taxa For You

//YOUTUBE:
// Visualizacoes
// Alcance
// Tempo Medio de Visualizacao

//FACEBOOK:
// Impressoes
// Alcance
// Tempo Medio de Visualizacao
// Data
// Hora
// Curtidas
// Comentarios
// Compartilhamentos
// Cliques no link

async function formattedTextFromImage(text, plataform) {
    try {

        let extractedData = {
            impressoes: null,
            visualizacoes: null,
            alcance: null,
            seguidores_alcancados: null,
            nao_seguidores_integram: null,
            visualizacoes_completas: null,
            taxa_retencao: null,
            tempo_medio_visualizacao: null,
            taxa_for_you: null,
            cliques_link: null,
            clique_arroba: null,
            clique_hashtag: null,
            avancar: null,
            voltar: null,
            sair: null,
            proximo_story: null,
            visitas_perfil: null,
            comecaram_seguir: null,
            tempo_stories: null,
            curtidas: null,
            salvamentos: null,
            compartilhamentos: null,
            comentarios: null,
        };

        if (plataform?.toLowerCase() == 'instragram') {
            extractedData = await processInstagram(text)
        }

        if (plataform?.toLowerCase() == 'tiktok') {
            extractedData = await processTikTok(text)
        }

        return extractedData;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

async function processInstagram(text) {
    const regexPatternsInstagram = {
        impressoes: /impress[õo]es?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        visualizacoes: /visualiza[çc][õo]es?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        alcance: /alcance\s*i?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        seguidores_alcancados: /seguidores\s*[:\-]?\s*(\d+[,.]?\d*)?\s*([\d,.]+)%/i,
        nao_seguidores_integram: /n[ãa]o\s*seguidores\s*[:\-]?\s*(\d+[,.]?\d*)?\s*([\d,.]+)%/i,
        visualizacoes_completas: /visualiza[çc][õo]es?\s+completas?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        taxa_retencao: /taxa\s+de\s+reten[çc][ãa]o\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        tempo_medio_visualizacao: /tempo\s+m[eé]dio\s+de\s+visualiza[çc][ãa]o\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        taxa_for_you: /taxa\s+for\s+you\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        cliques_link: /cliques?\s+no\s+link\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        clique_arroba: /cliques?\s+no\s+arroba\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        clique_hashtag: /nas\s+hashtags\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        avancar: /avan[çc]o\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        voltar: /voltar\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        sair: /saiu\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        proximo_story: /pr[óo]ximo\s+story\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        visitas_perfil: /visitas?\s+ao\s+perfil\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        comecaram_seguir: /come[çc]aram?\s+a\s+seguir\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        tempo_stories: /tempo\s+nos\s+stories\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        curtidas: /curtidas\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        salvamentos: /salvamentos\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        compartilhamentos: /compartilhamentos\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        comentarios: /coment[áa]rios\s*[:\-]?\s*(\d+[,.]?\d*)/i,
    };

    let extractedData = {
        impressoes: null,
        visualizacoes: null,
        alcance: null,
        seguidores_alcancados: null,
        nao_seguidores_integram: null,
        visualizacoes_completas: null,
        taxa_retencao: null,
        tempo_medio_visualizacao: null,
        taxa_for_you: null,
        cliques_link: null,
        clique_arroba: null,
        clique_hashtag: null,
        avancar: null,
        voltar: null,
        sair: null,
        proximo_story: null,
        visitas_perfil: null,
        comecaram_seguir: null,
        tempo_stories: null,
        curtidas: null,
        salvamentos: null,
        compartilhamentos: null,
        comentarios: null,
    };

    // Itera sobre as linhas e associa as palavras-chave aos campos do extractedData
    for (const [key, regex] of Object.entries(regexPatternsInstagram)) {
        const match = text.match(regex);
        if (match) {
            const value = match[1].replace(/[,.]/g, ''); // Remove ',' e '.'
            extractedData[key] = parseInt(value, 10) || 0; // Converte para inteiro, default 0
        }
    }

    const alcanceMatch = text.match(/alcance\s*i?\s*[:\-]?\s*(\d+[,.]?\d*)[\s\S]*?contas\s*alcançadas\s*[:\-]?\s*(\d+[,.]?\d*)/i);
    if (alcanceMatch) {
        const porcentagens = text.match(/(\d+[,.]?\d*)%/g);
        if (porcentagens && porcentagens.length >= 2) {
            let firstPorcentage = 0
            let secondPorcentage = 0
            if (porcentagens.length > 2) {
                firstPorcentage = parseFloat(porcentagens[1]?.replace(',', '.'));
                secondPorcentage = parseFloat(porcentagens[2]?.replace(',', '.'));
            } else {
                firstPorcentage = parseFloat(porcentagens[0]?.replace(',', '.'));
                secondPorcentage = parseFloat(porcentagens[1]?.replace(',', '.'));
            }
            if ((firstPorcentage + secondPorcentage) === 100) {
                extractedData.seguidores_alcancados = Math.round(calculationPercentageOfValue(firstPorcentage, extractedData.alcance));
                extractedData.nao_seguidores_integram = Math.round(calculationPercentageOfValue(secondPorcentage, extractedData.alcance));
            }
        }
    }

    return extractedData;
}

async function processTikTok(text) {
    try {
        let extractedData = {
            visualizacoes: null,
            curtidas: null,
            comentarios: null,
            compartilhamentos: null,
            salvamentos: null,
            tempo_medio_visualizacao: null,
            taxa_retencao: null,
            visualizacoes_completas: null,
            taxa_for_you: null,
        };

        const result = text.toLowerCase().split(/\s+/).map(word => removeAccents(word));

        // Extrair visualizações e outras métricas de vídeo
        if (result.includes('visualizacoes') && result.includes('de') && result.includes('video')) {

            const visaoIndex = result.indexOf("visao");
            if (visaoIndex >= 5) {

                extractedData.visualizacoes = convertToNumeric(extractedData.visualizacoes || (result[visaoIndex - 5]));
                extractedData.curtidas = extractedData.curtidas || (result[visaoIndex - 4]);
                extractedData.comentarios = extractedData.comentarios || (result[visaoIndex - 3]);
                extractedData.compartilhamentos = extractedData.compartilhamentos || (result[visaoIndex - 2]);
                extractedData.salvamentos = extractedData.salvamentos || (result[visaoIndex - 1]);
            }

            const retencaoIndex = result.indexOf("retencao");
            if (retencaoIndex >= 0) {
                extractedData.taxa_retencao = extractedData.taxa_retencao || (result[retencaoIndex + 8]);
            }

            const completoIndex = result.indexOf("completo");
            if (completoIndex >= 0) {
                extractedData.tempo_medio_visualizacao = extractedData.tempo_medio_visualizacao || result[completoIndex + 1];
                extractedData.taxa_retencao = extractedData.taxa_retencao || (result[completoIndex + 3] + '%');

                if (result[completoIndex + 3]) {
                    const porcentageVisualizacoesCompletas = parseFloat(result[completoIndex + 3]?.replace(',', '.'))
                    extractedData.visualizacoes_completas = Math.round(calculationPercentageOfValue(porcentageVisualizacoesCompletas, extractedData.visualizacoes))
                } else {
                    extractedData.visualizacoes_completas = extractedData.visualizacoes_completas || (result[completoIndex + 3]);
                }
            }
        }


        if (result.includes('para') && result.includes('voce')) {
            const paraIndex = result.indexOf("para");
            if (paraIndex + 1 < result.length) {
                // Verifique se o próximo elemento é um número com porcentagem
                const nextValue = result[paraIndex + 2];
                if (nextValue && nextValue.includes('%')) {
                    extractedData.taxa_for_you = extractedData.taxa_for_you || nextValue.replace('.', ',');
                }
            }
        }


        return extractedData;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}



const calculationPercentageOfValue = (percentage, total) => {
    const valueCalculation = (total * percentage) / 100;
    return parseFloat(valueCalculation);
};

// Função para remover acentos de uma string
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function convertToNumeric(value) {
    // Remove espaços em branco e trata a string
    value = value.trim();

    let factor = 1;

    // Lida com abreviações de milhares
    if (value.toLowerCase().includes('mil')) {
        value = value.replace('mil', '').trim(); // Remove 'mil'
        factor = 1000;
    } else if (value.toLowerCase().includes('k')) {
        value = value.replace('k', '').trim(); // Remove 'k'
        factor = 1000;
    }

    // Remove vírgulas
    value = value.replace(/,/g, '');

    // Converte para um número inteiro
    const numericValue = parseInt(value, 10) * factor;

    if (isNaN(numericValue)) {
        console.error(`Valor inválido para conversão: ${value}`);
        return null; // Retorna null para entradas inválidas
    }

    return numericValue;
}

module.exports = {
    formattedTextFromImage
};
