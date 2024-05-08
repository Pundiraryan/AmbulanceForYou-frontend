// Services.js
import React, { useEffect, useState } from 'react';
import './Services.css';
import i1 from '../images/firstimg.jpg'
import i2 from '../images/secondimg.jpg'
import i3 from '../images/thirdimg.webp'
import i4 from '../images/fourthimg.webp'

const Services = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = [
        { imgSrc: i2, topic: 'MORTUARY AMBULANCE SERVICE', des: 'Build your portfolio of industry-leading Properties by investing only Rs 5,000' },
        { imgSrc: i1, topic: 'BASIC LIFE SUPPORT AMBULANCE', des: 'Build your portfolio of industry-leading Properties by investing only Rs 5,000' },
        { imgSrc: i3, topic: 'ADVANCE LIFE SUPPORT AMBULANCE', des: 'Build your portfolio of industry-leading Properties by investing only Rs 5,000' },
        { imgSrc: i4, topic: 'PATIENT TRANSPORT AMBULANCE', des: 'Build your portfolio of industry-leading Properties by investing only Rs 5,000' },
    ];

    const handleNext = () => {
        // console.log('handling next');
        setCurrentIndex((currentIndex+1)%4);
        showSlider('next');
    };

    const handlePrev = () => {
        showSlider('prev');
        setCurrentIndex((currentIndex-1+4)%4);
    };

    useEffect(() => {
        // Logic for time auto next
        const autoNextTimeout = setTimeout(() => {
            handleNext();
        }, 10000);
        return () => {
            clearTimeout(autoNextTimeout);
        };
    }, [currentIndex]);

    const showSlider = (type) => {
        const containerDom = document.querySelector('.container');
        const SliderDom = containerDom.querySelector('.container .list');
        const thumbnailBorderDom = document.querySelector('.container .thumbnail');

        let SliderItemsDom = Array.from(SliderDom.querySelectorAll('.container .list .item'));
        let thumbnailItemsDom = Array.from(document.querySelectorAll('.container .thumbnail .item'));

        if (type === 'next') {
            SliderDom.appendChild(SliderItemsDom[0]);
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            containerDom.classList.add('next');
        } else {
            SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            containerDom.classList.add('prev');
        }

        clearTimeout(containerDom.runTimeOut);
        containerDom.runTimeOut = setTimeout(() => {
            containerDom.classList.remove('next');
            containerDom.classList.remove('prev');
        }, 3000);

        clearTimeout(containerDom.runNextAuto);
        containerDom.runNextAuto = setTimeout(() => {
            handleNext();
        }, 6000);
    };

    return (
        <div className="container">

            <div className="list">
                <div className="item">
                    <img src={items[currentIndex].imgSrc} alt="item" />
                    <div className="content .tc">
                        <div>
                        <div className="subtitle">What will you be investing in     ?</div>
                        <div className="topic">{items[currentIndex].topic}</div>
                        <div className="des">{items[currentIndex].des}</div>

                        </div>
                        <div className="buttons">
                            <button className="btn">Invest</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="thumbnail">
                {items.map((item, index) => (
                    <div key={index} className={`item ${index === currentIndex ? 'active' : ''}`}>
                        <img src={item.imgSrc} alt={`thumbnail-${index}`} />
                        <div className="content">
                            <div className="title">{item.topic}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="arrows ">
                <button id="prev" onClick={handlePrev}>
                    <img src="images/left-arrow.png" alt="notfound"  width="15"
                height="auto"/>
                </button>
                <button id="next" onClick={handleNext}>
                <img src="images/right-arrow.png" alt="notfound"  width="15"
                height="auto" />
                </button>
            </div>

            <div className="time"></div>
        </div>
    );
};

export default Services;
