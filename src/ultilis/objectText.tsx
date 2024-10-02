interface ExtractData {
    impressoes: null | string
    visualizacoes: null | string
    alcance: null | string
    seguidores_alcancados: null | string
    nao_seguidores_integram: null | string
    visualizacoes_completas: null | string
    taxa_retencao: null | string
    tempo_medio_visualizacao: null | string
    taxa_for_you: null | string
    cliques_link: null | string
    clique_arroba: null | string
    clique_hashtag: null | string
    avancar: null | string
    voltar: null | string
    sair: null | string
    proximo_story: null | string
    visitas_perfil: null | string
    comecaram_seguir: null | string
    tempo_stories: null | string
    curtidas: null | string
    salvamentos: null | string
    compartilhamentos: null | string
    comentarios: null | string
}

let extractedData: ExtractData = {
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
    comentarios: null
};

module.exports = extractedData
