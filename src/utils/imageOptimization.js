// Image optimization utilities for better performance

/**
 * Preload critical images
 * @param {string[]} imagePaths - Array of image paths to preload
 * @returns {Promise<void[]>} Promise that resolves when all images are loaded
 */
export const preloadImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map((path) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image: ${path}`));
        img.src = path;
      });
    })
  );
};

/**
 * Lazy load image with intersection observer
 * @param {HTMLImageElement} img - Image element to lazy load
 * @param {string} src - Source URL for the image
 * @param {Object} options - Intersection observer options
 */
export const lazyLoadImage = (img, src, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = src;
        image.classList.remove("lazy");
        observer.unobserve(image);
      }
    });
  }, defaultOptions);

  observer.observe(img);
};

/**
 * Create optimized image element with lazy loading
 * @param {string} src - Image source
 * @param {string} alt - Alt text
 * @param {Object} options - Additional options
 * @returns {HTMLImageElement} Optimized image element
 */
export const createOptimizedImage = (src, alt = "", options = {}) => {
  const img = document.createElement("img");
  img.alt = alt;
  img.loading = "lazy";
  img.decoding = "async";

  if (options.className) {
    img.className = options.className;
  }

  if (options.lazy !== false) {
    img.classList.add("lazy");
    lazyLoadImage(img, src, options.observerOptions);
  } else {
    img.src = src;
  }

  return img;
};

/**
 * Optimize texture loading for Three.js
 * @param {Object} loader - Three.js texture loader
 * @param {string} url - Texture URL
 * @param {Object} THREE - Three.js library reference
 * @returns {Promise<Object>} Promise that resolves with loaded texture
 */
export const loadTextureOptimized = (loader, url, THREE) => {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        // Optimize texture settings
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        resolve(texture);
      },
      undefined,
      (error) => reject(error)
    );
  });
};

/**
 * Batch load textures with progress tracking
 * @param {Object} loader - Three.js texture loader
 * @param {string[]} urls - Array of texture URLs
 * @param {Object} THREE - Three.js library reference
 * @param {Function} onProgress - Progress callback
 * @returns {Promise<Object[]>} Promise that resolves with loaded textures
 */
export const batchLoadTextures = async (loader, urls, THREE, onProgress) => {
  const textures = [];
  const total = urls.length;

  for (let i = 0; i < urls.length; i++) {
    try {
      const texture = await loadTextureOptimized(loader, urls[i], THREE);
      textures.push(texture);

      if (onProgress) {
        onProgress((i + 1) / total);
      }
    } catch {
      // Continue loading other textures even if one fails
      textures.push(null);
    }
  }

  return textures;
};
