


const cache_ = {};

export const imagePreload = (src) => {

  if (!src) return;
  if (src in cache_) return;
  
  return new Promise((r) => {

    const image = new Image();

    image.onload  = r;
    image.onerror = r;

    cache_[src] = 1;
    image.src = src;
  });
};
