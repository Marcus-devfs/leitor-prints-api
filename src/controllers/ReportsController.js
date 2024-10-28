const FileTextData = require("../models/FileTextData")

class ReportsController {

    reportDashboard = async (req, res) => {
        try {
            const { userId } = req.currentUser
            if (!userId) return res.status(200).json({ success: false })

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

            const data = await FileTextData.find({ userId }).exec()

            if (data.length == 0) res.status(200).json({ success: true, indicadores })

            // Contagem influenciadores Distintos
            const influencersSet = new Set(data.map(item => item.influencer))
            indicadores.influencers = influencersSet.size

            // Total de publicações
            indicadores.publis = data.length

            // Seguidores Totais (maior número de seguidores por influenciador)
            const seguidoresPorInfluencer = data.reduce((acc, item) => {
                const influencer = item.influencer;
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

            res.status(200).json({ success: true, indicadores })
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false })
        }
    }
}

module.exports = new ReportsController()