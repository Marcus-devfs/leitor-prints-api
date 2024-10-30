const FileTextData = require("../models/FileTextData")

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

            const tableVideoCurtoInfluencer = data
                .filter(item => {
                    const short = ['reels', 'tiktok', 'short']
                    return short.includes(item.format.toLowerCase())
                })
                .map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    plataforma: item?.plataform,
                    formato: item?.format,
                    data: item?.createdAt,
                    url_publi: '',
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    views: item?.visualizacoes || item?.views,
                    engajamento: item?.engajamento,
                    taxa_de_engajamento: '',
                    curtidas: item?.curtidas,
                    compartilhamentos: item?.compartilhamentos,
                    comentarios: item?.comentarios
                }))

            const tableVideoCurtoMediaPlataforma = data
                .filter(item => {
                    const short = ['reels', 'tiktok', 'short']
                    return short.includes(item.format.toLowerCase())
                })
                .map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    views: item?.visualizacoes || item?.views,
                    taxa_views: '',
                    engajamento: item?.engajamento,
                    taxa_de_engajamento: '',
                    curtidas: item?.curtidas,
                    compartilhamentos: item?.compartilhamentos,
                    comentarios: item?.comentarios
                }))

            reports.video_curto.table_v1.data = tableVideoCurtoMediaPlataforma
            reports.video_curto.table_v2.data = tableVideoCurtoInfluencer


            const tableStoriesInfluencer = data
                .filter(item => {
                    const short = ['story']
                    return short.includes(item.format.toLowerCase())
                })
                .map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    plataforma: item?.plataform,
                    formato: item?.format,
                    data: item?.createdAt,
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    impressoes: item?.impressoes,
                    avancar: item?.avancar,
                    engajamento: item?.engajamento,
                    taxa_de_engajamento: '',
                    cliques_no_link: item?.cliques_link,
                    clique_no_arroba: item?.clique_arroba,
                    clique_hashtag: item?.clique_hashtag
                }))

            const tableStoriesMediaPlataforma = data
                .filter(item => {
                    const short = ['story']
                    return short.includes(item.format.toLowerCase())
                })
                .map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    impressoes: item?.impressoes,
                    avancar: item?.avancar,
                    engajamento: item?.engajamento,
                    taxa_de_engajamento: '',
                    cliques_no_link: item?.cliques_link,
                    clique_no_arroba: item?.clique_arroba,
                    clique_hashtag: item?.clique_hashtag
                }))

            reports.stories.table_v1.data = tableStoriesMediaPlataforma
            reports.stories.table_v2.data = tableStoriesInfluencer


            const tableVideoLongoInfluencer = data
                .filter(item => {
                    const plataform = ['youtube']
                    return plataform.includes(item.plataform.toLowerCase())
                })
                .map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    url_publi: '',
                    data: item?.createdAt,
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    impressoes: item?.impressoes,
                    visualizacoes: item?.visualizacoes,
                    taxa_de_retencao: item?.taxa_retencao,
                    engajamento: item?.engajamento,
                    eng_youtube: '',
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                }))

            const tableVideoLongoPlataforma = data
                .filter(item => {
                    const plataform = ['youtube']
                    return plataform.includes(item.plataform.toLowerCase())
                })
                .map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.seguidores,
                    alcance_seguidores: '',
                    impressoes: item?.impressoes,
                    visualizacoes: item?.visualizacoes,
                    taxa_de_retencao: item?.taxa_retencao,
                    engajamento: item?.engajamento,
                    eng_youtube: '',
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                }))

            reports.video_longo.table_v1.data = tableVideoLongoPlataforma
            reports.video_longo.table_v2.data = tableVideoLongoInfluencer


            const tableOutrosInfluencer = data
                .filter(item => {
                    const plataform = ['twitter']
                    return plataform.includes(item.plataform.toLowerCase())
                })
                .map(item => ({
                    marca: item?.marca_cliente,
                    acao: item?.acao,
                    influencer: item?.influencer,
                    formato: item?.format,
                    url_publi: '',
                    seguidores: item?.seguidores,
                    impressoes: item?.impressoes,
                    engajamento: item?.engajamento,
                    taxa_de_retencao: item?.taxa_retencao,
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                    retwit: item?.retwit,
                    cliques_link: item?.cliques_link,
                }))

            const tableOutrosPlataforma = data
                .filter(item => {
                    const plataform = ['twitter']
                    return plataform.includes(item.plataform.toLowerCase())
                })
                .map(item => ({
                    plataforma: item?.plataform,
                    formato: item?.format,
                    seguidores: item?.seguidores,
                    impressoes: item?.impressoes,
                    engajamento: item?.engajamento,
                    taxa_de_retencao: item?.taxa_retencao,
                    curtidas: item?.curtidas,
                    comentarios: item?.comentarios,
                    retwit: item?.retwit,
                    cliques_link: item?.cliques_link,
                }))

            reports.outras_plataformas.table_v1.data = tableOutrosPlataforma
            reports.outras_plataformas.table_v2.data = tableOutrosInfluencer


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

module.exports = new ReportsController()