import React, { useState, useEffect } from 'react';
import './Footer.css';
// import { Instagram, Twitter, LinkedIn } from './assets/svg';
// import data from '../../../data.json';

export const Footer = () => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const data = {
        email: 'contact@mulearn.org',
        linkedIn: 'https://www.linkedin.com/in/mulearn',
        instagram: 'https://www.instagram.com/mulearn',
        twitter: 'https://twitter.com/mulearn'
    };

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <div className="FooterWrapper">
            <div className="topFooter">
                
                <p>
                    Reach us at{' '}
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </p>
                <div>
                    <a target="_blank" href="https://mulearn.org/" rel="noopener noreferrer">
                        µLearn
                    </a>
                    <a target="_blank" href="https://mulearn.org/announcements" rel="noopener noreferrer">
                        Events
                    </a>
                    <a target="_blank" href="https://mulearn.org/gallery" rel="noopener noreferrer">
                        Gallery
                    </a>
                    <a target="_blank" href="https://online.fliphtml5.com/egsqr/tlgc/" rel="noopener noreferrer">
                        Branding
                    </a>
                </div>
            </div>
            <div className="socialMedia">
                <a href={data.linkedIn} target="_blank" rel="noopener noreferrer">
                    {/* <LinkedIn /> */}
                    LinkedIn
                </a>
                <a href={data.instagram} target="_blank" rel="noopener noreferrer">
                    {/* <Instagram /> */}
                    Instagram
                </a>
                <a href={data.twitter} target="_blank" rel="noopener noreferrer">
                    {/* <Twitter /> */}
                    Twitter
                </a>
            </div>
            <div className="line"></div>
            <div className="ptag">
                <p>Copyright © {currentYear}. All Rights Reserved.</p>
                <p>µLearn Foundation.</p>
            </div>
        </div>
    );
};