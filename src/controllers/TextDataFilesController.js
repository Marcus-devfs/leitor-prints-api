const FileTextData = require('../models/FileTextData')
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const ColumnsPlanilha = require('../helpers/planilhaExport');
const { sendPlanilha } = require('../ultilis/function/sendEmailPlanilha');
const User = require('../models/User');
const { formattDateAndHour } = require('../ultilis');


class TextDataFilesController {

    list = async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '', userId } = req.query

            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);

            let query = {}

            if (search && search != '') {
                query.influencer = { $regex: search, $options: 'i' }; // Ajuste "name" para o campo correto
            }
            if (userId) {
                query.userId = userId;
            }

            // Calcula o total de documentos para paginação
            const total = await FileTextData.countDocuments(query);


            // Busca os dados com paginação e filtro
            const filesData = await FileTextData.find(query)
                .skip((pageNum - 1) * limitNum)
                .limit(limitNum);

            res.status(200).json({ success: true, filesData, total });
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false })
        }
    }

    sendTextDataInPlanilha = async (req, res) => {
        try {
            const { textDataIds = [] } = req.body;
            const { userId } = req.currentUser

            const user = await User.findById(userId)
            let textFileData = [];

            function formattedForNumber(value) {
                if (!!value) return null
                if (typeof value === 'string') {
                    if (value.includes('.') || value.includes('.')) return parseFloat(value)
                    else return parseInt(value)
                }

                return value
            }

            await Promise.all(textDataIds.map(async (item) => {
                const textData = await FileTextData.findById(item);

                // Mapeia os dados de acordo com as colunas
                textFileData.push({
                    Marca: textData.marca_cliente || '',
                    Categoria: textData.type || '',
                    Acao: textData.campaign || '',
                    Influenciador: textData.influencer || '',
                    Plataforma: textData.plataform || '',
                    Formato: textData.format || '',
                    'URL Publi': '',
                    Combo: '',
                    Quantidade: '',
                    'Tipo De Entrega': '',
                    'Tipo De Parceria': '',
                    Data: textData.createdAt.toISOString().split('T')[0],
                    Hora: textData.createdAt.toISOString().split('T')[1].split('.')[0],
                    'Apoio Count': '',
                    Seguidores: formattedForNumber(textData.followersNumber) || 0,
                    Impressoes: formattedForNumber(textData.impressoes) || 0,
                    Visualizacoes: formattedForNumber(textData.visualizacoes) || 0,
                    Alcance: formattedForNumber(textData.alcance) || 0,
                    'Seguidores Alcancados': formattedForNumber(textData.seguidores_alcancados) || 0,
                    'Nao Seguidores': formattedForNumber(textData.nao_seguidores_integram) || 0,
                    'Visualizacoes Completas': formattedForNumber(textData.visualizacoes_completas) || 0,
                    'Taxa de Retencao': textData.taxa_retencao || 0,
                    'Tempo Medio de Visualizacao': formattedForNumber(textData.tempo_medio_visualizacao) || 0,
                    'Taxa For You': textData.taxa_for_you || 0,
                    'Cliques no Link': formattedForNumber(textData.cliques_link) || 0,
                    'Clique no @': formattedForNumber(textData.clique_arroba) || 0,
                    'Clique na Hashtag': formattedForNumber(textData.clique_hashtag) || 0,
                    Avancar: formattedForNumber(textData.avancar) || 0,
                    Voltar: formattedForNumber(textData.voltar) || 0,
                    Sair: formattedForNumber(textData.sair) || 0,
                    'Proximo Story': (textData.proximo_story) || 0,
                    'Visitas ao Perfil': formattedForNumber(textData.visitas_perfil) || 0,
                    'Comecaram a Seguir': formattedForNumber(textData.comecaram_seguir) || 0,
                    'Tempo de Stories em Segundos': textData.tempo_stories || 0,
                    Curtidas: formattedForNumber(textData.curtidas) || 0,
                    Salvamentos: formattedForNumber(textData.salvamentos) || 0,
                    Compartilhamentos: formattedForNumber(textData.compartilhamentos) || 0,
                    Comentarios: formattedForNumber(textData.comentarios) || 0
                });
            }));

            // Gerar a planilha usando XLSX em um Buffer
            const fileName = `${formattDateAndHour()}_extracao-de-resultados_dottie`
            const ws = XLSX.utils.json_to_sheet(textFileData, { header: ColumnsPlanilha });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, fileName);
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

            // Enviar o e-mail com o Excel como anexo
            if (excelBuffer) {
                await sendPlanilha(excelBuffer, user.email);
            }

            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(200).json({ error, success: false });
        }
    };


    readById = async (req, res) => {
        try {
            const { id } = req.params

            const filesData = await FileTextData.findById(id).populate({
                path: 'files',
                model: 'File'
            })
            res.status(200).json({ filesData, success: true })
        } catch (error) {
            console.log(error)
            res.status(200).json({ error, success: false })
        }
    }


    delete = async (req, res) => {
        try {
            const { id } = req.params
            const deleteFilesData = await FileTextData.findByIdAndDelete(id).exec()
            res.status(200).json({ deleteFilesData, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params
            const { filesData } = req.body
            const response = await FileTextData.findByIdAndUpdate(id, filesData, { new: true, runValidators: true }).exec()
            res.status(200).json({ filesData: response, success: true })
        } catch (error) {
            res.status(400).json({ error, success: false })
        }
    }
}

module.exports = new TextDataFilesController()