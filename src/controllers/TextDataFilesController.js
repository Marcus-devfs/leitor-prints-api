const FileTextData = require('../models/FileTextData')
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const ColumnsPlanilha = require('../helpers/planilhaExport');
const { sendPlanilha } = require('../ultilis/function/sendEmailPlanilha');


class TextDataFilesController {

    list = async (req, res) => {
        try {
            const filesData = await FileTextData.find()
            res.status(200).json({ success: true, filesData })
        } catch (error) {
            res.status(500).json({ success: false })
        }
    }

    sendTextDataInPlanilha = async (req, res) => {
        try {
            const { textDataIds = [] } = req.body;


            let textFileData = [];
            await Promise.all(textDataIds.map(async (item) => {
                const textData = await FileTextData.findById(item);

                // Mapeia os dados de acordo com as colunas
                textFileData.push({
                    Marca: '', // ou outro campo adequado
                    Categoria: textData.type || '', // ou outro campo adequado
                    Acao: textData.campaign || '',
                    Influenciador: textData.influencer || '',
                    Plataforma: textData.plataform || '',
                    Formato: textData.format || '',
                    'URL Publi': '', // Preencha com o valor correto se houver
                    Combo: '', // Preencha com o valor correto se houver
                    Quantidade: '', // Preencha com o valor correto se houver
                    'Tipo De Entrega': '', // Preencha com o valor correto se houver
                    'Tipo De Parceria': '', // Preencha com o valor correto se houver
                    Data: textData.createdAt.toISOString().split('T')[0], // Formato de data
                    Hora: textData.createdAt.toISOString().split('T')[1].split('.')[0], // Formato de hora
                    'Apoio Count': '', // Preencha com o valor correto se houver
                    Seguidores: textData.followersNumber || 0,
                    Impressoes: textData.impressoes || 0,
                    Visualizacoes: textData.visualizacoes || 0,
                    Alcance: textData.alcance || 0,
                    'Seguidores Alcancados': textData.seguidores_alcancados || 0,
                    'Nao Seguidores': textData.nao_seguidores_integram || 0,
                    'Visualizacoes Completas': textData.visualizacoes_completas || 0,
                    'Taxa de Retencao': textData.taxa_retencao || 0,
                    'Tempo Medio de Visualizacao': textData.tempo_medio_visualizacao || 0,
                    'Taxa For You': textData.taxa_for_you || 0,
                    'Cliques no Link': textData.cliques_link || 0,
                    'Clique no @': textData.clique_arroba || 0,
                    'Clique na Hashtag': textData.clique_hashtag || 0,
                    Avancar: textData.avancar || 0,
                    Voltar: textData.voltar || 0,
                    Sair: textData.sair || 0,
                    'Proximo Story': textData.proximo_story || 0,
                    'Visitas ao Perfil': textData.visitas_perfil || 0,
                    'Comecaram a Seguir': textData.comecaram_seguir || 0,
                    'Tempo de Stories em Segundos': textData.tempo_stories || 0,
                    Curtidas: textData.curtidas || 0,
                    Salvamentos: textData.salvamentos || 0,
                    Compartilhamentos: textData.compartilhamentos || 0,
                    Comentarios: textData.comentarios || 0
                });
            }));

            // Gerar a planilha usando XLSX em um Buffer
            const ws = XLSX.utils.json_to_sheet(textFileData, { header: ColumnsPlanilha });
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Planilha Dados');
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

            // Enviar o e-mail com o Excel como anexo
            if (excelBuffer) {
                await sendPlanilha(excelBuffer);
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