import { motion, useScroll, useMotionValueEvent, useTransform, useInView } from "framer-motion";
import Logo from "/logo skincare 2.svg";
import "./Navbar.css";
import { Link } from "react-scroll";

const navbar = () => {
    const { scrollYProgress } = useScroll();

    useMotionValueEvent(scrollYProgress, "change",
    );

    const position = useTransform(
        scrollYProgress,
        [0, 0.02],
        ["20%", "0%"]
    )
    const borderColor = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "1px solid gray"]
    )
    const showShadow = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "0 1px 20px gray"]
    )
    const bgColor = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["", "rgba(211, 211, 211, 0.8)"]
    )
    const blurFilter = useTransform(
        scrollYProgress,
        [0.02, 1],
        ["none", "blur(10px)"]
    )

    return (
        <motion.div className="n-wrapper" id="Navbar"
            style={{
                position: "fixed",
                y: position,
                boxShadow: showShadow,
                backgroundColor: bgColor,
                backdropFilter: blurFilter,
            }}
        >
            {/* left */}
            <div className="n-left">
                <img className="skincareLogo" src={Logo}/>
                <div className="n-name">Skincare</div>
            </div>
            {/* right */}
            <div className="n-right">
                <div className="n-list">
                    <ul style={{ listStyleType: "none" }}>
                        <li>
                            <Link /*activeClass="active"*/ to="Intro" spy={true} smooth={true}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="services" spy={true} smooth={true}>
                                AI Consultation
                            </Link>
                        </li>
                        <li>
                            <Link to="experience" spy={true} smooth={true}>
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link to="membership" spy={true} smooth={true}>
                                My Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="works" spy={true} smooth={true}>
                                About
                            </Link>
                        </li>
                    </ul>
                </div>
                <Link to="contact" spy={true} smooth={true}>
                    <button className="homePageLoginButton">Log in</button>
                </Link>
                <Link to="contact" spy={true} smooth={true}>
                    <button className="homePageSigninButton">Sign in</button>
                </Link>
            </div>
        </motion.div>
    );
};

export default navbar;