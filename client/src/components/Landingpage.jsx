import React, { useEffect } from 'react';
import './Landingpage.css'
import {
    Link, useNavigate
} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { getUserDetailsAsync, logout, logoutUserAsync, selectIsLogin, selectUser } from '../Redux/features/Authentication/AuthenticationSlice';
import { signOutUser } from '../firebase/firebase-auth';
import { showAlert } from '../Redux/features/Alerts/AlertSlice';
import Footer from './Footer';
import Music from './Music';

export default function Landingpage() {
    document.querySelectorAll('.explore-image img, .hero-image img, .cta-image img').forEach(image => {
        image.addEventListener('mouseover', function () {
            const sparkleCount = 5; // Number of sparkles
            for (let i = 0; i < sparkleCount; i++) {
                const sparkle = document.createElement('span');
                sparkle.classList.add('sparkle');
                this.parentNode.appendChild(sparkle);

                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';

                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            }
        });

        image.addEventListener('mouseleave', function () {
            this.classList.add('bounce'); // Add the bounce class

            setTimeout(() => {
                this.classList.remove('bounce'); // Remove the bounce class after animation
            }, 500); // Duration matches the bounce animation
        });
    });

    const isLogin = useSelector(selectIsLogin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (isLogin) {
                try {
                    const response = await dispatch(getUserDetailsAsync());
                    const data = response.payload;
                    console.log(data.error)
                    if (data.error === "Unauthorized: No auth token found" || data.error === 'Session expired. Please log in again.') {
                        dispatch(logout());
                        const result = await signOutUser();
                        if (result.status) {
                            dispatch(showAlert({ message: "Session expired. Please log in again.", type: "info" }));
                            navigate('/')
                        } else {
                            console.log(result.error)
                            dispatch(showAlert({ message: "User logged out failed", type: "error" }));
                        }
                    }
                    else if (data.status === false) {
                        dispatch(showAlert({ message: data.error, type: "error" }));
                    }
                    else {
                        console.log(data);
                    }
                } catch (error) {
                    dispatch(showAlert({ message: error.message, type: "error" }));
                }
            }
        }
        fetchUser();
    }, [isLogin])

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(logoutUserAsync());
            const data = response.payload;
            if (!data.status) {
                dispatch(showAlert({ message: "User logged out failed", type: "error" }));
            }
            else {
                const result = await signOutUser();
                if (result.status) {
                    dispatch(showAlert({ message: "User logged out successfully", type: "success" }));
                    navigate('/')
                } else {
                    dispatch(showAlert({ message: "User logged out failed", type: "error" }));
                }
            }
        } catch (error) {
            dispatch(showAlert({ message: "User logged out failed", type: "error" }));
        }
    }

    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="logo">QueryCraft</div>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/user/profile">Profile</Link></li>
                        <li><Link to="/user/view-quiz">Game</Link></li>
                        {
                            !isLogin
                                ?
                                <li><Link to="/login">Login</Link></li>
                                :
                                <li><button onClick={handleLogOut}>Logout</button></li>
                        }
                        <li><Link to="contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-text">
                    <h1>Welcome to the Wizarding World</h1>
                    <p>Explore the magical realm where enchantment and wonder unfold</p>
                    <Link to="/user/view-quiz" className="cta-btn">Discover the Magic</Link>
                </div>
                <div className="hero-image">
                    <img src="image1.jpg" alt="Wizarding World Castle" className='w-[300px] h-[500px]' />
                </div>
            </section>

            <section className="exploration">
                <h2>Uncover the Secrets of the Enchanted Realm</h2>
                <p>Embark on a journey through the vibrant tapestry of the wizarding world, where ancient spells, mystical creatures, and hidden wonders converge to create an unforgettable experience.</p>

                <div className="explore-box">
                    <div className="explore-image">
                        <img src="2.png" alt="Unveil the Mysteries" />
                    </div>
                    <div className="explore-content">
                        <h3>Unveil the Mysteries</h3>
                        <p>Unravel the captivating tales of the wizarding world, where ancient magic, extraordinary characters, and breathtaking landscapes intertwine to create a truly immersive experience.</p>
                    </div>
                </div>

                <div className="explore-box">
                    <div className="explore-content">
                        <h3>Unlock the Wonders</h3>
                        <p>Immerse yourself in the captivating narratives and awe-inspiring environments of the wizarding world. Discover the intricate tapestry of spells, creatures, and hidden treasures that await your exploration.</p>
                    </div>
                    <div className="explore-image">
                        <img src="3.png" alt="Unlock the Wonders" />
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta-image">
                    <img src="4.png" alt="Discover the Magic" />
                </div>
                <div className="cta-text">
                    <h2>Uncover the Secrets</h2>
                    <p>Immerse yourself in the captivating narratives and awe-inspiring environments of the wizarding world. Discover the intricate tapestry of spells, creatures, and hidden treasures that await your exploration.</p>
                </div>
            </section>
            <Music/>
            <Footer />
        </div>
    )
}