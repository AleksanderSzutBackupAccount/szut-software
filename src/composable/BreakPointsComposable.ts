import { useBreakpoint } from "vue-composable";

export function BreakPointsComposable() {
    const { current, desktop, mobile, mini } = useBreakpoint({
        desktop: 1280,
        mobile: 720,
        mini: "(min-width: 320px)",
    });

    return {
        current,
        desktop,
        mobile,
        mini,
    };
}
