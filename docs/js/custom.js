/* === NOVO CÓDIGO JavaScript PARA O POPUP (docs/js/custom.js) === */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de popup carregado!"); // Mensagem de teste para o console do navegador

    // 1. Criar a estrutura HTML do Popup e inserir no final da página
    const lightboxHTML = `
        <div id="lightbox-overlay" style="display: none; position: fixed; z-index: 99999; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); cursor: pointer; opacity: 0; transition: opacity 0.3s ease; justify-content: center; align-items: center;">
            <span id="lightbox-close" style="position: absolute; top: 20px; right: 30px; color: white; font-size: 50px; font-weight: bold; cursor: pointer; user-select: none;" title="Fechar (Esc)">&times;</span>
            <img id="lightbox-image" src="" alt="Imagem ampliada" style="max-width: 90%; max-height: 90%; border: 3px solid white; border-radius: 4px; box-shadow: 0 0 30px rgba(0, 0, 0, 0.6); transform: scale(0.9); transition: transform 0.3s ease;">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 2. Selecionar os elementos do popup
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');

    // 3. SELETOR MAIS ROBUSTO: Seleciona TODAS as imagens dentro da área de conteúdo principal
    // Isso é o que provavelmente estava falhando antes.
    const images = document.querySelectorAll('.md-content img, .rst-content img, article img');
    console.log("Imagens encontradas:", images.length); // Teste

    // 4. Adicionar o evento de clique em cada imagem
    images.forEach(image => {
        image.style.cursor = 'zoom-in'; // Força o cursor de lupa
        image.setAttribute('title', 'Clique para ampliar'); // Dica visual

        image.addEventListener('click', function(e) {
            e.preventDefault(); // Impede comportamentos padrão
            console.log("Imagem clicada:", this.src); // Teste

            lightboxImg.src = this.src;   // Define a imagem grande
            lightboxImg.alt = this.getAttribute('alt') || 'Imagem ampliada'; // Mantém acessibilidade

            // Mostra o popup
            overlay.style.display = 'flex';
            
            // Pequeno delay para a animação de opacidade funcionar
            setTimeout(() => {
                overlay.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 10);

            // Impede o scroll do texto de fundo
            document.body.style.overflow = 'hidden'; 
        });
    });

    // 5. Função para fechar o popup
    function closeLightbox() {
        overlay.style.opacity = '0';
        lightboxImg.style.transform = 'scale(0.9)';
        
        // Espera a animação acabar para esconder de fato
        setTimeout(() => {
            overlay.style.display = 'none';
            lightboxImg.src = ''; // Limpa a imagem para não piscar na próxima abertura
            document.body.style.overflow = ''; // Reativa o scroll do texto
        }, 300);
    }

    // Eventos de fechamento
    closeBtn.addEventListener('click', closeLightbox); // Clicar no X
    
    // Clicar em qualquer lugar do fundo escuro (mas não na imagem)
    overlay.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) { 
            closeLightbox();
        }
    });

    // Apertar a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
            closeLightbox();
        }
    });
});
