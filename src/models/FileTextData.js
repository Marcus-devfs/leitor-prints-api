

const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileTextDataSchema = new Schema({
    keyFile: String,
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
        type: Number,
        default: null
    },
    impressoes: {
        type: Number,
        default: null
    },
    visualizacoes: {
        type: Number,
        default: null
    },
    alcance: {
        type: Number,
        default: null
    },
    seguidores_alcancados: {
        type: Number,
        default: null
    },
    nao_seguidores_integram: {
        type: Number,
        default: null
    },
    visualizacoes_completas: {
        type: Number,
        default: null
    },
    taxa_retencao: {
        type: Number,
        default: null
    },
    tempo_medio_visualizacao: {
        type: Number,
        default: null
    },
    taxa_for_you: {
        type: Number,
        default: null
    },
    cliques_link: {
        type: Number,
        default: null
    },
    clique_arroba: {
        type: Number,
        default: null
    },
    clique_hashtag: {
        type: Number,
        default: null
    },
    avancar: {
        type: Number,
        default: null
    },
    voltar: {
        type: Number,
        default: null
    },
    sair: {
        type: Number,
        default: null
    },
    proximo_story: {
        type: Number,
        default: null
    },
    visitas_perfil: {
        type: Number,
        default: null
    },
    comecaram_seguir: {
        type: Number,
        default: null
    },
    tempo_stories: {
        type: Number,
        default: null
    },
    curtidas: {
        type: Number,
        default: null
    },
    salvamentos: {
        type: Number,
        default: null
    },
    compartilhamentos: {
        type: Number,
        default: null
    },
    comentarios: {
        type: Number,
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