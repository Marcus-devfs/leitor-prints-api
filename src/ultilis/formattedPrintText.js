//Redes Sociais e formatos

const { calculationPercentageOfValue } = require(".");

//Instagram - Feed - OK
//Instagram - Reels - OK
//Instagram - Story - OK

//TikTok - Video - OK
//Youtube - Video - OK
//Youtube - Short - Nao tem print
//Twiter - Tweet - OK
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

async function formattedTextFromImage(text, plataform, format) {
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
            recursos_de_navegacao: null,
            pesquisa_do_youtube: null,
            videos_sugeridos: null,
            paginas_do_canal: null
        };

        if (plataform?.toLowerCase() == 'instagram') {
            extractedData = await processInstagram(text, format)
        }

        if (plataform?.toLowerCase() == 'tiktok') {
            extractedData = await processTikTok(text)
        }

        if (plataform?.toLowerCase() == 'youtube') {
            extractedData = await processYoutube(text)
        }

        if (plataform?.toLowerCase() == 'twitter') {
            extractedData = await processTwiter(text)
        }

        if (plataform?.toLowerCase() == 'facebook') {
            extractedData = await processFacebook(text)
        }

        return extractedData;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

async function processInstagram(text, format) {
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
        comecaram_seguir: /come[çc]aram?\s+a?\s*seguir\s*[:\-]?\s*(\d+[,.]?\d*)/is,
        tempo_stories: /tempo\s+nos\s+stories\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        curtidas: /curtidas\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        salvamentos: /salvamentos\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        compartilhamentos: /compartilhamentos\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        // comentarios: /coment[áa]rios\s*[:\-]?\s*(\d+[,.]?\d*)/i,
        comentarios: /(?:coment[áa]rios|respostas?)\s*[:\-]?\s*(\d+[,.]?\d*)/i,
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
        respostas: null
    };

    // Itera sobre as linhas e associa as palavras-chave aos campos do extractedData
    for (const [key, regex] of Object.entries(regexPatternsInstagram)) {
        const match = text.match(regex);
        if (match) {
            const value = match[1].replace(/[,.]/g, ''); // Remove ',' e '.'
            extractedData[key] = parseInt(value, 10) || 0; // Converte para inteiro, default 0
        }
    }

    if (format.toLowerCase() === 'reels') {
        const result = text.toLowerCase().split(/\s+/);
        const reproducaoIndex = result.indexOf('reproduções');
        const contasAlcancadasIndex = result.indexOf('alcançadas');

        if (reproducaoIndex !== -1 && result[reproducaoIndex + 1]) {
            const formattedValue = result[reproducaoIndex + 1].replace(/[,.]/g, '');
            extractedData.visualizacoes = parseInt(formattedValue, 10) || 0;
        }

        if (contasAlcancadasIndex !== -1 && result[contasAlcancadasIndex + 1]) {
            extractedData.contas_alcancadas = result[contasAlcancadasIndex + 1]
        }

    }

    if (format.toLowerCase() === 'story') {
        const cliqueArroba = text.match(/(?:toques\s*em\s*figurinhas|cliques?\s+no\s+arroba)\s*[:\-]?\s*(\d+[,.]?\d*)/is);
        if (cliqueArroba) {
            extractedData.clique_arroba = parseInt(cliqueArroba[1].replace(/[,.]/g, ''), 10);
        }
    }


    if (format.toLowerCase() === 'story') {
        const alcanceMatch = text.match(/contas\s*alcançadas\s*[:\-]?\s*(\d+[,.]?\d*)/i);

        if (alcanceMatch) {
            const alcanceFormatted = parseInt(alcanceMatch[1].replace(/[.,]/g, ''));
            extractedData.alcance = extractedData.alcance || alcanceFormatted
            const alcanceIndex = alcanceMatch.index

            // Extrair texto próximo ao alcanceIndex (-5 e -4 palavras anteriores)
            const nearbyText = text.slice(Math.max(0, alcanceIndex - 50), alcanceIndex); // Pegamos até 50 caracteres antes para analisar

            let porcentagens = nearbyText.match(/(\d+[,.]?\d*)%/g); // Captura todas as porcentagens no trecho próximo

            if (porcentagens && porcentagens.length >= 2) {
                let firstPorcentage = parseFloat(porcentagens[0]?.replace(',', '.'));
                let secondPorcentage = parseFloat(porcentagens[1]?.replace(',', '.'));

                if ((firstPorcentage + secondPorcentage) === 100) {
                    extractedData.seguidores_alcancados = Math.round(calculationPercentageOfValue(firstPorcentage, alcanceFormatted))
                    extractedData.nao_seguidores_integram = Math.round(calculationPercentageOfValue(secondPorcentage, alcanceFormatted))
                }
            }
        }
    }

    if (format.toLowerCase() === 'reels') {
        // const alcanceMatch = text.match(/contas\s*alcançadas\s*[:\-]?\s*(\d+[,.]?\d*)/i);
        const result = text.toLowerCase().split(/\s+/).map(word => removeAccents(word));

        const alcanceReels = result.indexOf('alcance')

        if (alcanceReels) {
            const alcanceFormatted = parseInt(result[alcanceReels + 2]);
            extractedData.alcance = extractedData.alcance || alcanceFormatted;

            // Procurar as porcentagens próximas à posição do alcance
            const nearbyWords = result.slice(alcanceReels, alcanceReels + 20); // Pega palavras ao redor do alcance
            const porcentagens = nearbyWords.filter(word => word.includes('%')); // Filtra as porcentagens

            if (porcentagens.length >= 2) {
                let firstPorcentage = parseFloat(porcentagens[0].replace(',', '.'));
                let secondPorcentage = parseFloat(porcentagens[1].replace(',', '.'));
        
                // Se as porcentagens somam 100
                if ((firstPorcentage + secondPorcentage) === 100) {
                    extractedData.seguidores_alcancados = Math.round(calculationPercentageOfValue(firstPorcentage, alcanceFormatted));
                    extractedData.nao_seguidores_integram = Math.round(calculationPercentageOfValue(secondPorcentage, alcanceFormatted));
                }
            }
        }
    }

    return extractedData;
}

async function processTikTok(text) {
    try {
        let extractedData = {
            visualizacoes: null,
            alcance: null,
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
                // extractedData.taxa_retencao = extractedData.taxa_retencao || (result[completoIndex + 3] + '%');
                extractedData.taxa_retencao = extractedData.taxa_retencao || includesPorcentage(result[completoIndex + 3]);

                if (result[completoIndex + 3]) {
                    const porcentageVisualizacoesCompletas = parseFloat(result[completoIndex + 3]?.replace(',', '.'))
                    extractedData.visualizacoes_completas = Math.round(calculationPercentageOfValue(porcentageVisualizacoesCompletas, extractedData.visualizacoes))
                } else {
                    extractedData.visualizacoes_completas = extractedData.visualizacoes_completas || (result[completoIndex + 3]);
                }
            }
        }

        const seguidoresIndex = result.indexOf("seguidores");
        if (seguidoresIndex >= 0) {
            extractedData.seguidores_alcancados = (result[seguidoresIndex - 2]);
            extractedData.nao_seguidores_integram = (result[seguidoresIndex - 3]);
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

        if (result.includes('total') && result.includes('de') && result.includes('total') && result.includes('de') && result.includes('espectadores') && result.includes('i')) {

            const totalIndex = result.findIndex((item, idx) =>
                item.toLowerCase() === 'total' &&
                result[idx + 1] === 'de' &&
                result[idx + 2] === 'espectadores' &&
                result[idx + 3] === 'i'
            );

            if (totalIndex >= 0) {
                // O número esperado está na posição seguinte à sequência
                const espectadoresValue = result[totalIndex + 4];

                // Verifica se o valor é numérico
                if (!isNaN(Number(espectadoresValue))) {
                    extractedData.alcance = espectadoresValue
                } else {
                    console.log('Valor encontrado após "Total de espectadores i" não é numérico:', espectadoresValue);
                }
            } else {
                console.log('"Total de espectadores i" não encontrado.');
            }
        }

        return extractedData;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

async function processYoutube(text) {
    try {
        const regexPatternsYoutube = {
            visualizacoes: /Visualizações\s*[:\-]?\s*(\d+[,.]?\d*)\s*(mil)?/i,  // Captura valores de visualizações como 1,9 mil
            alcance: /Espectadores\s+únicos\s*[:\-]?\s*(\d+[,.]?\d*)\s*(mil)?/i, // Captura "Espectadores únicos"
            taxa_retencao: /Retenção\s+de\s+público\s*[:\-]?\s*(\d+:\d+)\s*\(([\d,.]+%)/i,  // Captura a taxa de retenção no formato 4:15 (39,1%)
            tempo_medio_visualizacao: /Duração\s+média\s+da\s+visualização\s*[:\-]?\s*(\d+:\d+)/i,  // Captura a duração média da visualização no formato "4:15"
            taxa_cliques_impressao: /Taxa\s+de\s+cliques\s+de\s+impress[õo]es?\s*[:\-]?\s*([\d,.]+%)/i,  // Captura a taxa de cliques de impressão
            recursos_de_navegacao: /Recursos\s+de\s+navega[çc][ãa]o\s*[:\-]?\s*([\d,.]+%)/i,  // Captura Recursos de navegação
            pesquisa_do_youtube: /Pesquisa\s+do\s+YouTube\s*[:\-]?\s*([\d,.]+%)/i,  // Captura Pesquisa do YouTube
            videos_sugeridos: /Vídeos\s+sugeridos\s*[:\-]?\s*([\d,.]+%)/i,  // Captura Vídeos sugeridos
            paginas_do_canal: /P[áa]ginas\s+do\s+canal\s*[:\-]?\s*([\d,.]+%)/i,  // Captura Páginas do canal
        };

        let extractedData = {
            visualizacoes: null,
            alcance: null,
            taxa_retencao: null,
            tempo_medio_visualizacao: null,
            recursos_de_navegacao: null,
            pesquisa_do_youtube: null,
            videos_sugeridos: null,
            paginas_do_canal: null
        };

        // Função para converter "mil" para número
        const convertMilToNumber = (value, isMil) => {
            let numericValue = parseFloat(value.replace(',', '.'));
            if (isMil) {
                numericValue *= 1000;
            }
            return numericValue;
        };

        // Itera sobre as linhas e associa as palavras-chave aos campos do extractedData
        for (const [key, regex] of Object.entries(regexPatternsYoutube)) {
            const match = text.match(regex);

            if (match) {
                if (key === 'visualizacoes' || key === 'alcance') {
                    extractedData[key] = convertMilToNumber(match[1], match[2]);  // Converte "mil" adequadamente
                } else if (key === 'taxa_retencao') {
                    extractedData[key] = match[2];  // Armazena o valor capturado
                } else {
                    extractedData[key] = match[1];  // Armazena o valor capturado
                }
            }
        }

        return extractedData;

    } catch (error) {
        console.log(error)
        throw error
    }
}

async function processTwiter(text) {
    try {

        const regexPatternsTwitter = {
            impressoes: /Impressions\s*i?\s*[:\-]?\s*([\d,.]+)/i, // Captura as impressões (visualizações)
            novos_seguidores: /New\s*followers\s*i?\s*[:\-]?\s*([\d,.]+)/i, // Captura os novos seguidores
            visitas_perfil: /Profile\s*visits\s*i?\s*[:\-]?\s*([\d,.]+)/i // Captura as visitas ao perfil
        };

        let extractedData = {
            impressoes: null,
            curtidas: null,
            comentarios: null,
            compartilhamentos: null,
            engajamento: null,
            novos_seguidores: null,
            visitas_perfil: null,
            detalha_expansoes: null
        };

        const convertMilToNumber = (value) => {
            return parseFloat(value.replace(',', ''));
        };

        // Extração dos campos de curtidas, compartilhamentos e comentários (baseado na posição fixa)
        const fixedNumbers = text.match(/(\d+)\s+(\d+)\s+(\d+)/);
        if (fixedNumbers) {
            extractedData.curtidas = parseInt(fixedNumbers[1]);
            extractedData.comentarios = parseInt(fixedNumbers[3]);
            extractedData.compartilhamentos = parseInt(fixedNumbers[2]);
        }

        // Itera sobre as expressões regulares para capturar os outros valores
        for (const [key, regex] of Object.entries(regexPatternsTwitter)) {
            const match = text.match(regex);
            if (match) {
                extractedData[key] = convertMilToNumber(match[1]); // Armazena o valor numérico capturado
            }
        }

        // Extração manual de "engagements" e "detail expands" pela ordem correta
        const result = text.toLowerCase().split(/\s+/);
        const engagementIndex = result.indexOf('engagements');
        const detailExpandsIndex = result.indexOf('expands');
        const profileIndex = result.indexOf('profile') || result.indexOf('perfil')
        const newFollowers = result.indexOf('followers') || result.indexOf('seguidores')


        if (engagementIndex !== -1 && result[engagementIndex + 5]) {
            extractedData.engajamento = convertMilToNumber(result[engagementIndex + 5]);
        }

        if (detailExpandsIndex !== -1 && result[detailExpandsIndex + 3]) {
            extractedData.detalha_expansoes = convertMilToNumber(result[detailExpandsIndex + 3]);
        }

        if (profileIndex !== -1 && result[profileIndex + 4]) {
            extractedData.visitas_perfil = convertMilToNumber(result[profileIndex + 4]);
        }


        if (newFollowers !== -1 && result[newFollowers + 5]) {
            extractedData.novos_seguidores = result[newFollowers + 5] == 'o' ? 0 : result[newFollowers + 5]
        }

        return extractedData;

    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

async function processFacebook(text) {
    try {

        const regexPatternsFacebook = {
            impressoes: /impressões\s*i?\s*[:\-]?\s*([\d,.]+)/i,
            alcance: /alcance\s*i?\s*[:\-]?\s*([\d,.]+)/i,
            tempo_medio_visualizacao: /média\s*de\s*minutos\s*visualizados\s*[:\-]?\s*([\d,.]+)/i,
            curtidas: /reações\s*(\d+)/i,
            comentarios: /comentários\s*[:\-]?\s*([\d,.]+)/i,
            compartilhamentos: /compartilhamentos\s*[:\-]?\s*([\d,.]+)/i,
            cliques_link: /total\s*de\s*cliques\s*[:\-]?\s*([\d,.]+)/i
        };

        let extractedData = {
            impressoes: null,
            alcance: null,
            tempo_medio_visualizacao: null,
            curtidas: null,
            comentarios: null,
            compartilhamentos: null,
            cliques_link: null,
        };

        for (const [key, regex] of Object.entries(regexPatternsFacebook)) {
            const match = text.match(regex);

            if (match) {
                extractedData[key] = match[1] // Armazena o valor numérico capturado
            }
        }

        // Extração manual do "engajamento" a partir de "Reações, comentários e compartilhamentos"
        const engajamentoRegex = /reações,\s*comentários\s*e\s*compartilhamentos\s*da\s*publicação\s*([\d,.]+)/i;
        const engajamentoMatch = text.match(engajamentoRegex);
        if (engajamentoMatch) {
            extractedData.engajamento = engajamentoMatch[1];
        }

        return extractedData;

    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}


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

function includesPorcentage(value) {
    if (!value) return null
    if (typeof value == 'string' && value.includes('%')) {
        return value
    }
    return value + '%'
}

module.exports = {
    formattedTextFromImage
};
