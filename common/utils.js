// Function to convert the high-resolution time to seconds
const processHrTimeToSeconds = (hrTime) => {
    return (hrTime[0] + hrTime[1] / 1e9).toFixed(9);
};

// Export the function to be used in external files or modules
module.exports = {
    processHrTimeToSeconds,
};