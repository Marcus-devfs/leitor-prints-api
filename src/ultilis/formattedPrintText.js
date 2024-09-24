async function formattedTextFromImage(extractedText) {
    try {
        const jsonResult = {
            platform: "Instagram",
            type: "Post",
            date: "",
            metrics: {
                likes: 0,
                comments: 0,
                shares: 0,
                saves: 0
            },
            overview: {
                accounts_reached: 0,
                accounts_engaged: 0,
                profile_activity: 0
            },
            reach: {
                total_reach: 0,
                followers_percentage: 0,
                non_followers_percentage: 0
            },
            impressions: {
                total_impressions: 0,
                from_home: 0,
                from_profile: 0,
                from_hashtags: 0,
                from_other: 0
            },
            engagement: {
                total_engaged_accounts: 0,
                followers_percentage: 0,
                non_followers_percentage: 0,
                post_interactions: {
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    saves: 0
                }
            },
            profile_activity: {
                profile_visits: 0,
                follows: 0
            }
        };

        // Divida o texto extraído em linhas
        const lines = extractedText.split('\n');

        lines.forEach((line, index) => {
            const cleanedLine = line.trim();

            // Extrair data
            if (cleanedLine.includes('agosto')) {
                jsonResult.date = cleanedLine;
            }

            // Extrair métricas
            if (cleanedLine.includes('Curtidas')) {
                jsonResult.metrics.likes = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('Comentários')) {
                jsonResult.metrics.comments = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('Compartilhamentos')) {
                jsonResult.metrics.shares = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('Salvamentos')) {
                jsonResult.metrics.saves = parseInt(lines[index + 1]) || 0;
            }

            // Extrair contas alcançadas
            if (cleanedLine.includes('Contas alcangadas')) {
                jsonResult.overview.accounts_reached = parseInt(lines[index + 1]) || 0;
            }

            // Extrair contas com engajamento
            if (cleanedLine.includes('Contas com engajamento')) {
                jsonResult.overview.accounts_engaged = parseInt(lines[index + 1]) || 0;
            }

            // Extrair visitas ao perfil
            if (cleanedLine.includes('Visitas ao perfil')) {
                jsonResult.profile_activity.profile_visits = parseInt(lines[index + 1]) || 0;
            }

            // Extrair total de alcance
            if (cleanedLine.includes('Alcance')) {
                jsonResult.reach.total_reach = parseInt(lines[index + 1]) || 0;
            }

            // Extrair porcentagens de seguidores e não seguidores
            if (cleanedLine.includes('Seguidores')) {
                jsonResult.reach.followers_percentage = parseFloat(cleanedLine.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
            }
            if (cleanedLine.includes('Não seguidores')) {
                jsonResult.reach.non_followers_percentage = parseFloat(cleanedLine.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
            }

            // Extrair impressões
            if (cleanedLine.includes('Impressões')) {
                jsonResult.impressions.total_impressions = parseInt(lines[index + 1]) || 0;
            }

            // Extrair impressões de diferentes fontes
            if (cleanedLine.includes('Na página inicial')) {
                jsonResult.impressions.from_home = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('No perfil')) {
                jsonResult.impressions.from_profile = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('Nas hashtags')) {
                jsonResult.impressions.from_hashtags = parseInt(lines[index + 1]) || 0;
            }
            if (cleanedLine.includes('De outra pessoa')) {
                jsonResult.impressions.from_other = parseInt(lines[index + 1]) || 0;
            }

            // Extrair contas com engajamento
            if (cleanedLine.includes('Engajamento')) {
                jsonResult.engagement.total_engaged_accounts = parseInt(lines[index + 1]) || 0;
            }

            // Extrair porcentagens de seguidores e não seguidores no engajamento
            if (cleanedLine.includes('Seguidores') && jsonResult.engagement.total_engaged_accounts > 0) {
                jsonResult.engagement.followers_percentage = parseFloat(cleanedLine.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
            }
            if (cleanedLine.includes('Não seguidores') && jsonResult.engagement.total_engaged_accounts > 0) {
                jsonResult.engagement.non_followers_percentage = parseFloat(cleanedLine.replace(/[^\d,.]/g, '').replace(',', '.')) || 0;
            }
        });

        return jsonResult;
    } catch (error) {
        console.log('Erro ao formatar o texto extraído:', error);
        return false;
    }
}

module.exports = {
    formattedTextFromImage
};
