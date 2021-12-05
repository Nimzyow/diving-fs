/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            tsconfig: "./tsconfig.json",
        },
    },
    rootDir: "src",
    // collectCoverageFrom: ["**/*.{ts,tsx}", "!dist/*"],
    moduleNameMapper: {
        // "^@shared$": "<rootDir>/shared/",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        // "^@ripple-react(.*)$": "<rootDir>/core/lib/",
        // "^@templates$": "<rootDir>/templates/",
        // "^@utils$": "<rootDir>/utils/",
        // "^@core$": "<rootDir>/core/",
    },
}
