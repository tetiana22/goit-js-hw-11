import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/markup';
import { getImage } from './js/img_api';

const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});


const searchForm = document.querySelector('.search-form');
const loadBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const perPage =  40;
let page = 1;
let q = ''

searchForm.addEventListener('submit', handlerForm);

async function handlerForm(e) {
    try {
    e.preventDefault();
    const inputValue = searchForm.elements.searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');
        if (inputValue === '') {
            Notiflix.Notify.info('Enter your request, please!');
            return;
        }
    
    const data = await getImage(inputValue)
        
        gallery.innerHTML = createMarkup(data.hits);
        if(data.totalHits > perPage) {
            lightbox.refresh();
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            loadBtn.hidden = false;
            } else if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                loadBtn.hidden = true;
            } else if (data.totalHits < perPage) {
                loadBtn.hidden = true;
            } }
      catch(err) {
        Notiflix.Notify.failure('Oops!!! Something went wrong');
      } };
  
loadBtn.addEventListener('click', onLoadImgs)

async function onLoadImgs() {
    try {
   page += 1;
   const inputValue = searchForm.elements.searchQuery.value.trim();
   const data =  await getImage(inputValue)
    
        const numberOfPage = Math.ceil(data.totalHits / perPage);
        lightbox.refresh();
        gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
        if (page >= numberOfPage) {
            loadBtn.hidden = true;
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadBtn.removeEventListener('click', onLoadImgs);
        } }
    catch(err) {
        Notiflix.Notify.failure('Oops!!! Something went wrong');
    }};

