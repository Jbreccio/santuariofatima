// src/utils/instagramAPI.js
export const getInstagramFeed = async () => {
  try {
    // Substitua com seu token real
    const token = 'SEU_TOKEN_AQUI';
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp&access_token=${token}`
    );
    return await response.json();
  } catch (error) {
    console.error('Erro Instagram API:', error);
    return { data: [] };
  }
};
