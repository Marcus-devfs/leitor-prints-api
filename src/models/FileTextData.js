

const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileTextDataSchema = new Schema({
    groupKey: String,
    marca_cliente: {
        type: String,
        default: null
    },
    influencer: {
        type: String,
        default: null
    },
    plataform: {
        type: String,
        default: null
    },
    format: {
        type: String,
        default: null
    },
    campaign: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: null
    },
    followersNumber: {
        type: String,
        default: null
    },
    impressoes: {
        type: String,
        default: null
    },
    visualizacoes: {
        type: String,
        default: null
    },
    alcance: {
        type: String,
        default: null
    },
    seguidores_alcancados: {
        type: String,
        default: null
    },
    nao_seguidores_integram: {
        type: String,
        default: null
    },
    visualizacoes_completas: {
        type: String,
        default: null
    },
    taxa_retencao: {
        type: String,
        default: null
    },
    respostas: {
        type: String,
        default: null
    },
    tempo_medio_visualizacao: {
        type: String,
        default: null
    },
    taxa_for_you: {
        type: String,
        default: null
    },
    cliques_link: {
        type: String,
        default: null
    },
    clique_arroba: {
        type: String,
        default: null
    },
    clique_hashtag: {
        type: String,
        default: null
    },
    avancar: {
        type: String,
        default: null
    },
    voltar: {
        type: String,
        default: null
    },
    sair: {
        type: String,
        default: null
    },
    proximo_story: {
        type: String,
        default: null
    },
    visitas_perfil: {
        type: String,
        default: null
    },
    comecaram_seguir: {
        type: String,
        default: null
    },
    tempo_stories: {
        type: String,
        default: null
    },
    curtidas: {
        type: String,
        default: null
    },
    salvamentos: {
        type: String,
        default: null
    },
    compartilhamentos: {
        type: String,
        default: null
    },
    comentarios: {
        type: String,
        default: null
    },
    recursos_de_navegacao: {
        type: String,
        default: null
    },
    pesquisa_do_youtube: {
        type: String,
        default: null
    },
    videos_sugeridos: {
        type: String,
        default: null
    },
    paginas_do_canal: {
        type: String,
        default: null
    },
    engajamento: {
        type: String,
        default: null
    },
    novos_seguidores: {
        type: String,
        default: null
    },
    detalha_expansoes: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    files: [{
        type: mongoose.Schema.ObjectId,
        ref: "File",
        default: null,
    }]
},
    { timestamps: true }
);

const FileTextData = mongoose.model("FileTextData", fileTextDataSchema);

module.exports = FileTextData;