function merge(candidate) {

    return {

        profile: candidate,

        generatedAt: new Date().toISOString(),

        version: "1.0"

    };

}

module.exports = merge;