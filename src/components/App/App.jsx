import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { GlobalStyle } from './GlobalStyle';
import { Container } from './App.styled';
import { fetchData } from 'services/fetchData';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState({ src: '', alt: '' });

  useEffect(() => {
    if (!query) return;
    document.title = `Search: "${query}"`;
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = (query, page) => {
    const perPage = 12;
    setLoading(true);

    fetchData(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);
        if (hits.length === 0) {
          return toast.error('Sorry, there are no images. Please try again!');
        }
        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }
        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
        }
        setImages(images => [...images, ...hits]);
        setTotal(totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const handleSearch = searchQuery => {
    if (searchQuery === query) return;
    setImages([]);
    setQuery(searchQuery);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(page => page + 1);
  };

  const openModal = (src, alt) => {
    setShowModal(true);
    setLargeImage({ src, alt });
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImage({ src: '', alt: '' });
  };

  const isImage = images.length !== 0;
  const isLastPage = images.length === total;
  const isLoadMoreBtn = isImage && !loading && !isLastPage;

  return (
    <Container>
      <GlobalStyle />
      <Searchbar onSubmit={handleSearch} />
      {isImage && <ImageGallery images={images} onImageClick={openModal} />}
      {loading && <Loader />}
      {isLoadMoreBtn && <Button onLoadMore={handleLoadMore} />}
      {showModal && <Modal largeImage={largeImage} onClose={closeModal} />}
      {error && toast.error(error.message)}
      <ToastContainer />
    </Container>
  );
};
