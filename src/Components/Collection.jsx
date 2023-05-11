import { useState } from 'react';

const Collection = ({ name, images }) => {
  const [imgBig, setImgBig] = useState(images[0]);
  const [imgMiniOne, setImgMiniOne] = useState(images[1]);
  const [imgMiniTwo, setImgMiniTwo] = useState(images[2]);
  const [imgMiniThree, setImgMiniThree] = useState(images[3]);

  const toggleImgMiniOne = () => {
    setImgMiniOne(imgBig);
  };

  const toggleImgMitiTwo = () => {
    setImgMiniTwo(imgBig);
  };

  const toggleImgMitiThree = () => {
    setImgMiniThree(imgBig);
  };

  const toggleImgBig = (e) => {
    setImgBig(e.src);
  };

  return (
    <div className="collection">
      <img className="collection__big" src={`${imgBig}`} alt="Item" />
      <div className="collection__bottom">
        <img
          onClick={(e) => {
            toggleImgBig(e.target);
            toggleImgMiniOne();
          }}
          className="collection__mini"
          src={imgMiniOne}
          alt="Item"
        />
        <img
          onClick={(e) => {
            toggleImgBig(e.target);
            toggleImgMitiTwo();
          }}
          className="collection__mini"
          src={imgMiniTwo}
          alt="Item"
        />
        <img
          onClick={(e) => {
            toggleImgBig(e.target);
            toggleImgMitiThree();
          }}
          className="collection__mini"
          src={imgMiniThree}
          alt="Item"
        />
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export default Collection;
