async function formattedTextFromImage(text) {
    try {
        const regexPatterns = {
            impressoes: /impress[õo]es?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            visualizacoes: /visualiza[çc][õo]es?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            alcance: /alcance\s*i?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            // seguidores_alcancados: /seguidores\s*[:\-]?\s*(\d+[,.]?\d*)?\s*([\d,.]+)%/i,
            // nao_seguidores_integram: /n[ãa]o\s*seguidores\s*[:\-]?\s*(\d+[,.]?\d*)?\s*([\d,.]+)%/i,
            visualizacoes_completas: /visualiza[çc][õo]es?\s+completas?\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            taxa_retencao: /taxa\s+de\s+reten[çc][ãa]o\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            tempo_medio_visualizacao: /tempo\s+m[eé]dio\s+de\s+visualiza[çc][ãa]o\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            taxa_for_you: /taxa\s+for\s+you\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            cliques_link: /cliques?\s+no\s+link\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            clique_arroba: /cliques?\s+no\s+arroba\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            clique_hashtag: /nas\s+hashtags\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            avancar: /avan[çc]ar\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            voltar: /voltar\s*[:\-]?\s*(\d+[,.]?\d*)/i,
            sair: /sair\s*[:\-]?\s*(\d+[,.]?\d*)/i,
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
        for (const [key, regex] of Object.entries(regexPatterns)) {
            const match = text.match(regex);
            if (match) {
                if (key === 'seguidores_alcancados' || key === 'nao_seguidores_integram') {
                    const totalAlcanceMatch = text.match(regexPatterns.alcance);
                    if (totalAlcanceMatch) {
                        const totalAlcance = parseFloat(totalAlcanceMatch[1].replace(',', '.'));
                        const porcentagem = parseFloat(match[2].replace(',', '.'));
                        extractedData[key] = Math.round((porcentagem / 100) * totalAlcance); // Calcula o valor real
                    }
                } else {
                    extractedData[key] = parseInt(match[1].replace(/[,.]/g, ''), 10); // remove ',' e '.' para números
                }
            }
        }

        const alcanceMatch = text.match(/alcance\s*i?\s*[:\-]?\s*(\d+[,.]?\d*)[\s\S]*?contas\s*alcançadas\s*[:\-]?\s*(\d+[,.]?\d*)/i);
        if (alcanceMatch) {
            const porcentagens = text.match(/(\d+[,.]?\d*)%/g);

            if (porcentagens && porcentagens.length >= 2) {
                const firstPorcentage = parseFloat(porcentagens[1].replace(',', '.'));
                const secondPorcentage = parseFloat(porcentagens[2].replace(',', '.'));
                if ((firstPorcentage + secondPorcentage) == 100) {
                    extractedData.seguidores_alcancados = parseFloat(porcentagens[1].replace(',', '.'));
                    extractedData.nao_seguidores_integram = parseFloat(porcentagens[2].replace(',', '.'));
                }
            }
        }

        return extractedData;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

module.exports = {
    formattedTextFromImage
};
