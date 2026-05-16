module.exports = [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: {
                require: "readonly",
                process: "readonly",
                module: "readonly",
                console: "readonly"
            }
        },
        rules: {
            semi: ["error", "always"],
            quotes: ["error", "double"]
        }
    }
];