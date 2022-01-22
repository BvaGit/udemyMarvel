import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';

const ComicsList = () => {

    const [allComics, setAllComics] = useState([]);
    const [comicsOffset, setComicsOffset] = useState(210);

    useEffect(() => {
        onRequest(comicsOffset)
    }, []);

    const {loading, error, getAllComics} = useMarvelService();

    const onRequest = (comicsOffset) => {
        
        getAllComics(comicsOffset)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (newComics) => {
    
        setAllComics(allComics => [...allComics, ...newComics]);
        setComicsOffset(comicsOffset => comicsOffset + 8)
    }

    const renderComics = (arr) => {
        const item = arr.map((comic, i) => {
            return (
                <li className="comics__item"
                    tabIndex={0}
                    key={i}
                >
                    <a href="#">
                        <img src={comic.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </a>
                </li>
            )
        })

        return item
    }
    
    const comicsItem = renderComics(allComics)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {comicsItem}
                {spinner}
            </ul>
            <button className="button button__main button__long" onClick={() => onRequest(comicsOffset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;