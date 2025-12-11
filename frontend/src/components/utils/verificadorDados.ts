// utils/verificarDados.ts
export function verificarSistema() {
  console.log('🔍 VERIFICAÇÃO DO SISTEMA SANTUÁRIO');
  
  // 1. Verificar localStorage
  const dados = localStorage.getItem('santuario-dados');
  if (!dados) {
    console.error('❌ CRÍTICO: Nenhum dado em santuario-dados');
    return false;
  }
  
  const parsed = JSON.parse(dados);
  
  // 2. Verificar estrutura
  console.log('📊 ESTRUTURA DOS DADOS:');
  console.log('- Carrossel:', parsed.carrossel?.length || 0, 'imagens');
  console.log('- Momentos Litúrgicos:', parsed.momentosLiturgicos?.length || 0);
  console.log('- Popups:', parsed.popups?.length || 0);
  console.log('- Recados:', parsed.recados?.length || 0);
  
  // 3. Verificar popups
  const popupsAtivos = parsed.popups?.filter((p: any) => p.ativo) || [];
  console.log('🔔 POPUPS ATIVOS:', popupsAtivos.length);
  
  popupsAtivos.forEach((popup: any, index: number) => {
    console.log(`  ${index + 1}. ${popup.imagem} (${popup.tempoExibicao}s)`);
  });
  
  // 4. Verificar URLs das imagens
  if (parsed.popups?.length > 0) {
    console.log('🖼️ TESTANDO IMAGENS DOS POPUPS:');
    parsed.popups.forEach((popup: any, i: number) => {
      const img = new Image();
      img.onload = () => console.log(`  ✅ Popup ${i + 1}: ${popup.imagem} - CARREGA`);
      img.onerror = () => console.error(`  ❌ Popup ${i + 1}: ${popup.imagem} - NÃO CARREGA`);
      img.src = popup.imagem;
    });
  }
  
  return true;
}