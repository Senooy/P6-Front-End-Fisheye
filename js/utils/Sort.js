class Sort {
  sortMedias(mediaList, sortBy) {
    switch (sortBy) {
      case 'likes':
      default:
        mediaList.sort((a, b) => b.likes - a.likes);
        break;

      case 'date':
        mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

      case 'title':
        mediaList.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return new Map(mediaList.map(media => [media.id, media]));
  }
}

