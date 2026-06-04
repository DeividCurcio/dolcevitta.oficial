const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const chatWindow = document.getElementById('chatbot-window');
const chatMessages = document.getElementById('chat-messages');
const quickReplies = document.getElementById('quick-replies');
const chatInput = document.getElementById('chat-input');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
const blogGrid = document.getElementById('blog-grid');
let toastTimeout = null;

const blogPosts = [
  {
    title: '5 Dicas para Escolher Presentes Gourmet',
    excerpt: 'Seleções de produtos finos, embalagens criativas e combinações que encantam em qualquer ocasião.',
    image: 'https://picsum.photos/id/380/900/600',
    href: '#blog'
  },
  {
    title: 'Como Montar uma Cesta de Delicatessen Perfeita',
    excerpt: 'Monte uma cesta elegante com doces, biscoitos e sabores especiais para clientes e eventos.',
    image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRy93s-wUt_0_t6bz54RhRrJAzWnFPj2ZX3Ivjm7WhS6o7l42nQr230iepWR1sT2i2YwrCtnYj98wO-v8O6DRKFoTCsxOos1Q',
    href: '#blog'
  },
  {
    title: 'Sabores que Conectam: Rosquinhas e Bem Casados',
    excerpt: 'Entenda por que esses produtos são escolha certeira para festas, encomendas e lembranças.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbVUzDLqOjGVGsXJ5rNdEHl3uHHmjlmgcvQ&s',
    href: '#blog'
  }
];

function toggleMenu() {
  if (!mobileMenu || !mobileBtn) return;
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  mobileBtn.setAttribute('aria-expanded', String(!isOpen));
}

function handleScroll() {
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}

function toggleChatbot() {
  if (!chatWindow) return;
  const chatbotButton = document.getElementById('chatbot-button');
  const isHidden = chatWindow.classList.toggle('hidden');
  chatWindow.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
  if (chatbotButton) {
    chatbotButton.setAttribute('aria-expanded', String(!isHidden));
  }
}

function showToast(message) {
  if (!toast) return;
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
    toastTimeout = null;
  }, 2600);
}

function addToCart(product, price) {
  showToast(`${product} adicionado ao carrinho por R$ ${price.toFixed(2)}`);
}

function addMessage(role, text) {
  if (!chatMessages) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role}`;
  bubble.textContent = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
  if (!chatInput || !chatMessages) return;

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage('user', message);
  chatInput.value = '';
  setTimeout(() => {
    addMessage('bot', 'Obrigado pela mensagem! Em breve um representante entrará em contato.');
  }, 600);
}

function renderBlogPosts() {
  if (!blogGrid) return;

  blogGrid.innerHTML = blogPosts.map(post => `
    <article class="blog-card overflow-hidden rounded-3xl border border-[#C9A961]/10 bg-white shadow-sm transition-all duration-300">
      <a href="${post.href}" class="block group" aria-label="Leia o post ${post.title}">
        <div class="overflow-hidden">
          <img src="${post.image}" alt="${post.title}" loading="lazy" decoding="async" class="blog-image w-full h-56 object-cover transition-transform duration-500" />
        </div>
        <div class="p-6">
          <h4 class="font-serif text-2xl text-[#0F4C3A] mb-3">${post.title}</h4>
          <p class="text-sm text-[#555]">${post.excerpt}</p>
        </div>
      </a>
    </article>
  `).join('');
}

function initQuickReplies() {
  if (!quickReplies) return;

  const replies = ['Quero fazer um pedido', 'Mais informações', 'Entrega no RJ'];
  quickReplies.innerHTML = replies.map(reply => `
    <button type="button" class="quick-reply-btn" aria-label="Resposta rápida: ${reply}">${reply}</button>
  `).join('');

  quickReplies.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      if (!chatInput) return;
      chatInput.value = button.textContent;
      sendChatMessage();
    });
  });
}

function handleContactSubmit(event) {
  if (!contactForm) return;
  event.preventDefault();

  const name = document.getElementById('name')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!name || !email || !message) {
    showToast('Preencha todos os campos antes de enviar.');
    return;
  }

  contactForm.reset();
  showToast('Mensagem enviada com sucesso!');
}

function initialize() {
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', toggleMenu);
  }

  if (window) {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileBtn?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  renderBlogPosts();
  initQuickReplies();
}

document.addEventListener('DOMContentLoaded', initialize);
