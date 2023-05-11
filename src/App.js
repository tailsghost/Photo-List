import { useEffect, useState } from 'react';
import Collection from './Components/Collection';
import './index.scss';

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [collaction, setCollaction] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const category = `${categoryId && `category=${categoryId}`}`;

  useEffect(() => {
    const fetchCollaction = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://644fe914b61a9f0c4d2ea16e.mockapi.io/photos?page=${page}&limit=${
            !searchValue ? 3 : 100
          }&${category}`
        );
        const data = await res.json();
        setCollaction(data);
      } catch (error) {
        alert(`Произошла ошибка - ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollaction();
  }, [categoryId, page, searchValue]);

  const onCategoryId = (index) => {
    setCategoryId(index);
    setPage(1);
  };

  const onSearch = (text) => {
    setSearchValue(text);
    setPage(1);
  };

  const filterObj = collaction
    .filter((obj) => {
      return obj.name.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj, index) => {
      return <Collection key={index} name={obj.name} images={obj.photos} />;
    });
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((item, index) => {
            return (
              <li
                onClick={() => onCategoryId(index)}
                className={categoryId === index && 'active'}
                key={index}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <input
          value={searchValue}
          onChange={(text) => onSearch(text.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? <h2>Идет загрузка...</h2> : filterObj}
      </div>
      <ul className="pagination">
        {filterObj.length > 0 &&
          [...Array(3)].map((_, index) => (
            <li
              key={index}
              onClick={() => setPage(index + 1)}
              className={page === index + 1 && 'active'}
            >
              {index + 1}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
