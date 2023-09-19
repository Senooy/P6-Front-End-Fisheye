// Interface Media
class Media {
  createMedia(item, mediaFolder, index) {
    throw new Error("This method must be overwritten!");
  }
}

// Classe pour chaque type de média
// Classe image
class ImageMedia extends Media {
  createMedia(item, mediaFolder, index) {
    const imgPath = `assets/images/${mediaFolder}/${item.image}`;
    return `<article>
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
  }
}

// Classe vidéo
class VideoMedia extends Media {
  createMedia(item, mediaFolder, index) {
    const videoPath = `assets/images/${mediaFolder}/${item.video}`;
    return `<article>
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
  }
}

// Factory function
export function mediaFactory(item, mediaFolder, index) {
  let media;
  if (item.image) {
    media = new ImageMedia();
  } else if (item.video) {
    media = new VideoMedia();
  } else {
    return '';
  }
  return media.createMedia(item, mediaFolder, index);
}