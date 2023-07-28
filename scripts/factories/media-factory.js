// media factory
export function mediaFactory(item, mediaFolder, index) {
  if (item.image) {
    const imgPath = `assets/images/${mediaFolder}/${item.image}`;
    const mediaHtml = `<article>
      <figure>
        <div class="media_item">
          <a>
            <img id="${item.id}" class="media_obj"  src="${imgPath}" data-id="${index}" tabindex="0" alt="${item.title}" aria-label="${item.title}, closeup view">
          </a>
        </div>
        <div class="infos-medias">
          <figcaption>${item.title}</figcaption>
          <div class="likes">
            <h3>${item.likes}</h3>
            <div>
              <em id="like_${item.id}" tabindex="0" class="fa-regular fa-heart" aria-label="likes" role="button"></em >
            </div>
          </div>
        </div>
      </figure>
    </article>`;
    return mediaHtml;
  } if (item.video) {
    const videoPath = `assets/images/${mediaFolder}/${item.video}`;
    const mediaHtml = `<article>
      <figure>
        <div class="media_item">
          <a>
          <video id="${item.id}" class="media_obj" src="${videoPath}" data-id="${index}" tabindex="0" aria-label="${item.title}, closeup view"></video>
          </a>
        </div>
        <div class="infos-medias">
          <figcaption>${item.title}</figcaption>
          <div class="likes">
            <h3>${item.likes}</h3>
            <div>
              <em id="like_${item.id}" tabindex="0" class="fa-regular fa-heart" aria-label="likes" role="button"></em >
            </div>
          </div>
        </div>
      </figure>
    </article>`;
    return mediaHtml;
  }
  return '';
}
