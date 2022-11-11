import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, RecursivePartial, IOptions } from "tsparticles-engine";

const BackgroundParticles = () => {
    const particlesInit = async (main: any) => {
        await loadFull(main);
    };

    const particlesLoaded = async (container?: Container) => {};

    const options: RecursivePartial<IOptions> = {
        background: {
            color: {
                value: "#000000",
            },
        },
        fpsLimit: 24,
        particles: {
            color: {
                value: ["#fc3c5f", "#993cfc", "#3ca9fc", "#3cfc5f", "#fcdf3c"],
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 0.9,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 50,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000",
                },
                polygon: {
                    nb_sides: 15,
                },
            },
            line_linked: {
                enable: true,
                distance: 110,
                color: "#2b313c",
                opacity: 1,
                width: 1,
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
    };
    return <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={options} />;
};

export default BackgroundParticles;
