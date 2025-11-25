// ===== CONFIGURAÇÃO DO LINK DA HOTMART =====
// SUBSTITUA ESTE LINK PELO SEU LINK REAL DA HOTMART
const HOTMART_LINK = 'https://pay.hotmart.com/U103015679I?checkoutMode=10';

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    setupHotmartLinks();
    setupScrollAnimations();
    setupSmoothScroll();
});

// ===== CONFIGURAR LINKS DA HOTMART =====
function setupHotmartLinks() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-huge, #hotmart-btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Se for um link interno, deixar o comportamento padrão
            if (href && href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            // Validar se o link foi configurado
            if (HOTMART_LINK.includes('seu-link-aqui')) {
                alert('⚠️ AVISO: O link da Hotmart ainda não foi configurado!\n\nPor favor, edite o ficheiro js/script.js e substitua "seu-link-aqui" pelo seu link real.');
                return;
            }
            
            // Abrir link em nova aba
            window.open(HOTMART_LINK, '_blank');
        });
    });
}

// ===== ANIMAÇÕES AO FAZER SCROLL =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll(
        '.benefit-card, .testimonial-card, .faq-item, .timeline-item'
    );

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== SCROLL SUAVE =====
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#hotmart-link') {
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== CONTADOR DE REGRESSÃO (OPCIONAL) =====
function startCountdown(endDate) {
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            console.log('Oferta expirada!');
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        console.log(`Tempo restante: ${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
}

// ===== RASTREAMENTO DE EVENTOS =====
function trackEvent(eventName, eventData) {
    console.log(`Evento: ${eventName}`, eventData);
    
    // Se você usar Google Analytics, descomente:
    // gtag('event', eventName, eventData);
}

// ===== VERIFICAR CONFIGURAÇÃO DO LINK =====
window.addEventListener('load', function() {
    if (HOTMART_LINK.includes('seu-link-aqui')) {
        console.warn('⚠️ AVISO: O link da Hotmart ainda não foi configurado!');
        console.warn('Por favor, edite o ficheiro js/script.js e substitua "seu-link-aqui" pelo seu link real.');
    } else {
        console.log('✅ Link da Hotmart configurado com sucesso:', HOTMART_LINK);
    }
});

// ===== FUNÇÃO PARA ATUALIZAR O LINK =====
function updateHotmartLink(newLink) {
    window.HOTMART_LINK = newLink;
    setupHotmartLinks();
    console.log('✅ Link da Hotmart atualizado:', newLink);
}

// ===== EFEITO DE PARALLAX (OPCIONAL) =====
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-parallax') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
}

// ===== FUNÇÃO PARA COPIAR LINK =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copiado para a área de transferência!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// ===== ADICIONAR CLASSE ATIVA AO NAVBAR AO FAZER SCROLL =====
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 212, 255, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

setupNavbarScroll();

// ===== FUNÇÃO PARA RASTREAR CONVERSÃO =====
function logConversion(conversionType) {
    const timestamp = new Date().toISOString();
    const conversionData = {
        type: conversionType,
        timestamp: timestamp,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        url: window.location.href
    };

    console.log('Conversão registada:', conversionData);
    
    // Aqui você pode enviar dados para um servidor
    // fetch('/api/conversions', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(conversionData)
    // });
}

// ===== RASTREAR CLIQUES NOS BOTÕES CTA =====
document.querySelectorAll('.btn-primary, .btn-huge').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', {
            button_text: this.textContent,
            button_class: this.className
        });
        logConversion('cta_click');
    });
});

// ===== RASTREAR SCROLL ATÉ SEÇÕES =====
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('section_view', {
                section_id: entry.target.id,
                section_name: entry.target.className
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// ===== FUNÇÃO PARA MOSTRAR NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : '#ff3333'};
        color: #000;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        font-weight: 700;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== ANIMAÇÕES CSS PARA NOTIFICAÇÕES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== VALIDAÇÃO DO LINK HOTMART =====
console.log('🚀 Landing Page Milionário Rápido carregada com sucesso!');
console.log('📝 Não esqueça de configurar o link da Hotmart em js/script.js');
