// Aguarda o carregamento total da página
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Cria a estrutura HTML do Lightbox e insere no final do body
    const lightboxHTML = `
        <div id="lightbox-overlay">
            <span id="lightbox-close" title="Fechar (Esc)">&times;</span>
            <img id="lightbox-image" src="" alt="Imagem ampliada">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    // 2. Seleciona os elementos criados
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.getElementById('lightbox-close');

    // 3. Seleciona todas as imagens dentro do conteúdo do manual
    // Ajuste o seletor '.rst-content' ou '.md-content' conforme o seu tema
    const images = document.querySelectorAll('.rst-content img, .md-content img');

    // 4. Adiciona o evento de clique em cada imagem
    images.forEach(image => {
        // Garante que o texto 'alt' de acessibilidade seja copiado para a imagem ampliada
        const altText = image.getAttribute('alt') || 'Imagem do sistema ampliada';
        image.setAttribute('title', 'Clique para ampliar'); // Dica visual ao passar o mouse

        image.addEventListener('click', function() {
            lightboxImg.src = this.src;   // Define a origem da imagem do popup como a da imagem clicada
            lightboxImg.alt = altText;    // Mantém a acessibilidade
            overlay.classList.add('active'); // Mostra o popup
            document.body.style.overflow = 'hidden'; // Impede o scroll do texto ao fundo
        });
    });

    // 5. Funções para fechar o popup
    function closeLightbox() {
        overlay.classList.remove('active'); // Esconde o popup
        document.body.style.overflow = '';  // Reativa o scroll do texto
        // Limpa a src após a animação para não piscar a imagem antiga na próxima abertura
        setTimeout(() => { lightboxImg.src = ''; }, 300); 
    }

    // Fechar ao clicar no botão (X)
    closeBtn.addEventListener('click', closeLightbox);

    // Fechar ao clicar no fundo escuro (fora da imagem)
    overlay.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) { // Se não clicou na imagem em si, mas no fundo
            closeLightbox();
        }
    });

    // Fechar ao apertar a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });
});
