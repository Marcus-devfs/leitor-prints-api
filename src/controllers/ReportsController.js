const FileTextData = require("../models/FileTextData")
const { formatPorcentagem } = require("../ultilis")

class ReportsController {

    reportDashboard = async (req, res) => {
        try {
            const { userId } = req.currentUser

            let indicadores = {
                influencers: 0,
                publis: 0,
                seguidores_totais: 0,
                impressoes_views: 0,
                alcance_total: 0,
                alcance_seguidores: 0,
                engajamento_total: 0,
                taxa_de_engajamento: 0,
                comentarios_total: 0
            }

            let reports = {
                video_curto: {
                    table_v1: {
                        title: 'Média por Plataforma',
                        data: []
                    },
                    table_v2: {
                        title: 'Detalhes por Influenciador',
                        data: []
                    },
                },
                stories: {
                    table_v1: {
                        title: 'Média por Plataforma',
                        data: []
                    },
                    table_v2: {
                        title: 'Detalhes por Influenciador',
                        data: []
                    },
                },
                video_longo: {
                    table_v1: {
                        title: 'Média por Plataforma',
                        data: []
                    },
                    table_v2: {
                        title: 'Detalhes por Influenciador',
                        data: []
                    },
                },
                outras_plataformas: {
                    table_v1: {
                        title: 'Twitter',
                        data: []
                    },
                    table_v2: {
                        title: '',
                        data: []
                    },
                }
            }


            if (!userId) return res.status(200).json({ success: false, indicadores, reports })

            const data = await FileTextData.find({ userId }).exec()


            if (data.length == 0) return res.status(200).json({ success: true, indicadores, reports })

            //Video Curto:
            //reels, tiktok, short
            const filteredData = (data, types) => data.filter(item => {
                const short = types
                return short.includes(item.format.toLowerCase())
            })

            const calculationColumnsCurtoInfluencer = (data) => {

                return data.map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    plataforma: item?.plataform,
                    formato: item?.format,
                    data: item?.createdAt,
                    url_publi: '',
                    seguidores: item.followersNumber,
                    alcance_seguidores: item.followersNumber,
                    views: item?.visualizacoes || item?.views,
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_engajamento: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views),
                    curtidas: item?.curtidas,
                    compartilhamentos: item?.compartilhamentos,
                    comentarios: item?.comentarios
                }))
            }

            const calculationColumnsCurtoPlataforma = (data) => {

                return data.map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.followersNumber,
                    alcance_seguidores: item?.followersNumber,
                    views: item?.visualizacoes || item?.views,
                    taxa_views: '',
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_engajamento: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views),
                    curtidas: item?.curtidas,
                    compartilhamentos: item?.compartilhamentos,
                    comentarios: item?.comentarios
                }))
            }

            const calculationColumnsStoriesInfluencer = (data) => {

                return data.map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    plataforma: item?.plataform,
                    formato: item?.format,
                    data: item?.createdAt,
                    seguidores: item?.followers,
                    alcance_seguidores: item?.followersNumber,
                    impressoes: item?.impressoes,
                    avancar: item?.avancar,
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_engajamento: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views),
                    cliques_no_link: item?.cliques_link,
                    clique_no_arroba: item?.clique_arroba,
                    clique_hashtag: item?.clique_hashtag
                }))
            }

            const calculationColumnsStoriesPlataform = (data) => {

                return data.map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.followersNumber,
                    alcance_seguidores: item?.followersNumber,
                    impressoes: item?.impressoes,
                    avancar: item?.avancar,
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_engajamento: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views),
                    cliques_no_link: item?.cliques_link,
                    clique_no_arroba: item?.clique_arroba,
                    clique_hashtag: item?.clique_hashtag
                }))
            }

            const calculationColumnsVideoLongoInfluencer = (data) => {

                return data.map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    url_publi: '',
                    data: item?.createdAt,
                    seguidores: item?.followersNumber,
                    alcance_seguidores: item?.followersNumber,
                    impressoes: item?.impressoes,
                    visualizacoes: item?.visualizacoes,
                    taxa_de_retencao: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views) || item.taxa_de_retencao,
                    engajamento: calculateTotalInteractions(item),
                    eng_youtube: '',
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                }))
            }

            const calculationColumnsVideoLongoPlataform = (data) => {

                return data.map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item.followersNumber,
                    alcance_seguidores: item?.followersNumber,
                    impressoes: item?.impressoes,
                    visualizacoes: item?.visualizacoes,
                    taxa_de_retencao: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views) || item.taxa_de_retencao,
                    engajamento: calculateTotalInteractions(item),
                    eng_youtube: '',
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                }))
            }


            const calculationColumnsOutrosInfluencer = (data) => {

                return data.map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    formato: item?.format,
                    url_publi: '',
                    seguidores: item.followersNumber,
                    impressoes: item?.impressoes,
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_retencao: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views) || item.taxa_de_retencao,
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                    retwit: item?.retwit,
                    cliques_link: item?.cliques_link,
                }))
            }

            const calculationColumnsOutrosPlataform = (data) => {

                return data.map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item.followersNumber,
                    impressoes: item?.impressoes,
                    engajamento: calculateTotalInteractions(item),
                    taxa_de_retencao: calculateEngagementRate(calculateTotalInteractions(item), item?.visualizacoes || item?.views) || item.taxa_de_retencao,
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                    retwit: item?.retwit,
                    cliques_link: item?.cliques_link,
                }))
            }


            reports.video_curto.table_v1.data = calculationColumnsCurtoPlataforma(filteredData(data, ['reels', 'tiktok', 'short']))
            reports.video_curto.table_v2.data = calculationColumnsCurtoInfluencer(filteredData(data, ['reels', 'tiktok', 'short']))

            reports.stories.table_v1.data = calculationColumnsStoriesPlataform(filteredData(data, ['story']))
            reports.stories.table_v2.data = calculationColumnsStoriesInfluencer(filteredData(data, ['story']))

            reports.video_longo.table_v1.data = calculationColumnsVideoLongoPlataform(filteredData(data, ['youtube']))
            reports.video_longo.table_v2.data = calculationColumnsVideoLongoInfluencer(filteredData(data, ['youtube']))

            reports.video_longo.table_v1.data = calculationColumnsOutrosPlataform(filteredData(data, ['twitter']))
            reports.video_longo.table_v2.data = calculationColumnsOutrosInfluencer(filteredData(data, ['twitter']))

            //indicadores
            // Contagem influenciadores Distintos
            const influencersSet = new Set(data.map(item => item.influencer.toLowerCase()))
            indicadores.influencers = influencersSet.size

            // Total de publicações
            indicadores.publis = data.length

            // Seguidores Totais (maior número de seguidores por influenciador)
            const seguidoresPorInfluencer = data.reduce((acc, item) => {
                const influencer = item.influencer.toLowerCase();
                const followers = Number(item.followersNumber) || 0;
                acc[influencer] = Math.max(acc[influencer] || 0, followers);
                return acc;
            }, {});

            indicadores.seguidores_totais = Object.values(seguidoresPorInfluencer).reduce((acc, followers) => acc + followers, 0);

            // Impressões / Views total: somar todas as impressões (ou views se não houver impressões)
            indicadores.impressoes_views = data.reduce((acc, item) => {
                return acc + (Number(item.impressoes) || Number(item.visualizacoes) || 0)
            }, 0)

            // Alcance Total: soma de todos os alcances
            indicadores.alcance_total = data.reduce((acc, item) => {
                return acc + (Number(item.alcance) || 0);
            }, 0);


            // Total de engajamento: (curtidas + compart + coment + salvamentos)
            const totalInteractions = data.reduce((acc, item) => {
                const curtidas = Number(item.curtidas) || 0;
                const compartilhamentos = Number(item.curtidas) || 0;
                const comentarios = Number(item.curtidas) || 0;
                const salvamentos = Number(item.curtidas) || 0;

                return acc + curtidas + compartilhamentos + comentarios + salvamentos
            }, 0)

            indicadores.engajamento_total = totalInteractions

            // Calcular taxa de Engajamento
            if (indicadores.impressoes_views > 0) {
                indicadores.taxa_de_engajamento =
                    ((totalInteractions / indicadores.impressoes_views) * 100).toFixed(2)
            }

            // Alcance X Seguidores: Soma de alcances / Soma de seguidores
            if (indicadores.alcance_total > 0 && indicadores.seguidores_totais > 0) {
                indicadores.alcance_seguidores =
                    ((indicadores.alcance_total / indicadores.seguidores_totais) * 100).toFixed(2)
            }

            indicadores.comentarios_total = data.reduce((acc, item) => {
                return acc + (Number(item.comentarios) || 0)
            }, 0)

            res.status(200).json({ success: true, indicadores, reports })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false })
        }
    }
}


const calculateTotalInteractions = (item) => {
    const curtidas = Number(item.curtidas) || 0;
    const compartilhamentos = Number(item.compartilhamentos) || 0;
    const comentarios = Number(item.comentarios) || 0;
    const salvamentos = Number(item.salvamentos) || 0;
    return curtidas + compartilhamentos + comentarios + salvamentos;
};

// Função para calcular a taxa de engajamento
const calculateEngagementRate = (totalInteractions, totalViews) => {
    if (typeof totalViews === 'string') totalViews = (Number(totalViews.replace('.', '').replace(',', '.')))
    const calculationValue = totalViews > 0 ? (totalInteractions / totalViews) * 100 : 0;

    // Arredonda para duas casas decimais e retorna o valor em formato porcentagem
    const formattedValue = (calculationValue).toFixed(2); // Arredonda para 2 casas decimais
    return `${formattedValue}%`; // Retorna como string com porcentagem
};


module.exports = new ReportsController()