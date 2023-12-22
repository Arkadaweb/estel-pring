import React from 'react';
import Link from "next/link";

const NotFound = () => {

    return (
        <div className='not-found'>

            <h3>
                По вашему запросу ничего не найдено
            </h3>
            <p>
                Измените запрос или воспользуйтесь <Link href="/catalog">каталогом</Link> для поиска товара
            </p>
        </div>
    );
};

export default NotFound;
