<template>
    <div :id="id" class="particles" />
</template>

<script>
    import uniqueId from "lodash.uniqueid";
    import "strict-particles-js";

    export default {
        name: "ParticlesJS",
        props: {
            shapeTypeString: {
                type: String,
            },
        },
        data() {
            return {
                id: uniqueId("particles_"),
                height: 0,
            };
        },
        mounted() {
            let particle;
            switch (this.shapeTypeString) {
                case "circle":
                    particle = { nb_sides: 12 };
                    break;
                case "triangle":
                default:
                    particle = { nb_sides: 3 };
                    break;
            }

            this.$nextTick(() => {
                this.initParticlesJS(particle);
            });
        },

        methods: {
            initParticlesJS(particle) {
            /* eslint-disable */
            particlesJS(this.id, {
                particles: {
                    number: {
                        value: 15,
                        density: {
                            enable: true,
                            value_area: 800,
                        },
                    },
                    color: {
                        value: "#fc4445",
                    },
                    shape: {
                        type: "polygon",
                        stroke: {
                            width: 0,
                            color: "#fc4445",
                        },
                        polygon: particle,
                    },
                    opacity: {
                        value: 0.2367442924896818,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false,
                        },
                    },
                    size: {
                        value: 7.891476416322726,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false,
                        },
                    },
                    line_linked: {
                        enable: false,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.4,
                        width: 1,
                    },
                    move: {
                        enable: true,
                        speed: 3.206824121731046,
                        direction: "none",
                        random: false,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200,
                        },
                    },
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: {
                            enable: false,
                            mode: "repulse",
                        },
                        onclick: {
                            enable: false,
                            mode: "push",
                        },
                        resize: true,
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1,
                            },
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                        push: {
                            particles_nb: 4,
                        },
                        remove: {
                            particles_nb: 2,
                        },
                    },
                },
                retina_detect: true,
            });
        },
    },
};
</script>

<style lang="scss">
.particles {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: -100;

    canvas {
    }
}
</style>
