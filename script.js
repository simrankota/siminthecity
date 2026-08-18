const nav = document.querySelector('#site-nav');
const modal = document.querySelector('#video-modal');
const modalVideo = document.querySelector('#modal-video');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 12);
});

document.querySelectorAll('.video-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.video;
    if (!src) return;
    modalVideo.src = src;
    modal.showModal();
    modalVideo.play().catch(() => {});
  });
});

function closeVideo(){
  modalVideo.pause();
  modalVideo.removeAttribute('src');
  modalVideo.load();
  modal.close();
}
document.querySelector('.modal-close').addEventListener('click', closeVideo);
modal.addEventListener('click', e => { if(e.target === modal) closeVideo(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.open) closeVideo(); });
