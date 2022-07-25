module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ["standard"],
    parserOptions: {
        ecmaVersion: "latest",
    },
    rules: {
        semi: [2, "always"],
        quotes: [
            "error",
            "double",
            { allowTemplateLiterals: true, avoidEscape: true },
        ],
        "comma-dangle": ["error", "only-multiline"],
        "space-before-function-paren": ["error", { named: "never" }],
        "multiline-ternary": ["off"],
        indent: ["error", 4, { SwitchCase: 1 }],
    },
};
