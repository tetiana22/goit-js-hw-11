import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(arrImgs) {
    return arrImgs.map(({largeImageURL, webformatURL, tags, likes, views, comments, downloads}) => {
      return`<div class="photo-card">
      
            <a class="gallery_link" href="${largeImageURL}">
                <img class="gallery__image" src="${webformatURL}" alt="${tags}"  loading="lazy" />
            </a>
        
             <div class="info">
                <p class="info-item">
                     <p>Likes: ${likes}</p>
                 </p>
                 <p class="info-item">
                     <p>Views: ${views}</p>
                 </p>
                 <p class="info-item">
                     <p>Comments: ${comments}</p>
                 </p>
                 <p class="info-item">
                     <p>Downloads: ${downloads}</p>
                 </p>
             </div>
      </div>`
}).join('');}