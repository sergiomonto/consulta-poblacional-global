export const generateColorPalette = (numColors) => {
    const backgroundColors = [];
    const borderColors = [];

    for (let i = 0; i < numColors; i++) {
        const hue = Math.floor((i * 360) / numColors);
        const backgroundColor = `hsl(${hue}, 70%, 60%)`;
        const borderColor = `hsl(${hue}, 70%, 50%)`;

        backgroundColors.push(backgroundColor);
        borderColors.push(borderColor);
    }

    return {
        backgroundColors,
        borderColors,
    };
};
