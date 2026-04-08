module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'taro/react',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			impliedStrict: false,
			jsx: true,
			modules: true,
		},
		ecmaVersion: 15,
		sourceType: 'module',
	},
	plugins: ['react', 'prettier', '@typescript-eslint'],
	root: true,
	// globals: {
	//   defineAppConfig: true,
	//   definePageConfig: true,
	//   Res: true,
	//   Req: true,
	//   NodeJS: true
	// },
	rules: {
		'import/no-commonjs': 'off',
		'react/jsx-uses-react': 'off',
		'for-direction': 'error',
		'getter-return': [
			'error',
			{
				allowImplicit: false,
			},
		],
		'no-console': 'off',
		'no-constant-condition': [
			'error',
			{
				checkLoops: false,
			},
		],
		'no-control-regex': 'off',
		'no-debugger': 'error',
		'no-empty': [
			'error',
			{
				allowEmptyCatch: true,
			},
		],
		'no-template-curly-in-string': 'error',
		'accessor-pairs': [
			'error',
			{
				setWithoutGet: true,
				getWithoutSet: false,
			},
		],
		'dot-location': ['error', 'property'],
		eqeqeq: [
			'error',
			'always',
			{
				null: 'ignore',
			},
		],
		'no-case-declarations': 'error',
		'no-extend-native': 'error',
		'no-floating-decimal': 'error',
		'no-implied-eval': 'error',
		'no-lone-blocks': 'error',
		'no-loop-func': 'error',
		'no-multi-spaces': [
			'error',
			{
				ignoreEOLComments: true,
				exceptions: {
					Property: true,
					BinaryExpression: false,
					VariableDeclarator: true,
					ImportDeclaration: true,
				},
			},
		],
		'no-multi-str': 'error',
		'no-new': 'error',
		'no-return-await': 'error',
		'no-self-compare': 'error',
		'no-unused-expressions': [
			'error',
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		'no-useless-concat': 'error',
		'no-useless-escape': 'off',
		yoda: [
			'error',
			'never',
			{
				onlyEquality: true,
			},
		],
		strict: ['error', 'global'],
		'no-shadow-restricted-names': 'error',
		'no-undef': 'off',
		'no-unused-vars': 'off',
		'array-bracket-spacing': ['error', 'never'],
		'block-spacing': ['error', 'always'],
		'brace-style': 'error',
		'comma-dangle': ['error', 'never'],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': 'error',
		'func-call-spacing': 'error',
		'function-paren-newline': ['error', 'multiline'],
		'implicit-arrow-linebreak': ['error', 'beside'],
		indent: [
			'error',
			2,
			{
				SwitchCase: 1,
				flatTernaryExpressions: true,
			},
		],
		'jsx-quotes': ['error', 'prefer-double'],
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
				mode: 'strict',
			},
		],
		'keyword-spacing': [
			'error',
			{
				before: true,
				after: true,
				overrides: {
					if: {
						after: false,
					},
					for: {
						after: false,
					},
					while: {
						after: false,
					},
					catch: {
						after: false,
					},
				},
			},
		],
		'lines-between-class-members': 'error',
		'max-depth': ['error', 5],
		'new-cap': [
			'error',
			{
				newIsCap: true,
				capIsNew: false,
				properties: true,
			},
		],
		'new-parens': 'error',
		'no-array-constructor': 'error',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 1,
				maxEOF: 1,
				maxBOF: 1,
			},
		],
		'no-new-object': 'error',
		'no-trailing-spaces': 'error',
		'no-unneeded-ternary': 'error',
		'no-whitespace-before-property': 'error',
		'nonblock-statement-body-position': [
			'error',
			'beside',
			{
				overrides: {
					while: 'below',
				},
			},
		],
		'object-curly-newline': [
			'error',
			{
				multiline: true,
				consistent: true,
			},
		],
		'object-curly-spacing': [
			'error',
			'always',
			{
				arraysInObjects: true,
				objectsInObjects: false,
			},
		],
		quotes: [
			'error',
			'single',
			{
				avoidEscape: true,
				allowTemplateLiterals: true,
			},
		],
		semi: [
			'error',
			'always',
			{
				omitLastInOneLineBlock: true,
			},
		],
		'semi-spacing': [
			'error',
			{
				before: false,
				after: true,
			},
		],
		'semi-style': ['error', 'last'],
		'space-before-blocks': ['error', 'always'],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'space-in-parens': ['error', 'never'],
		'space-infix-ops': 'error',
		'space-unary-ops': [
			'error',
			{
				words: true,
				nonwords: false,
			},
		],
		'switch-colon-spacing': [
			'error',
			{
				after: true,
				before: false,
			},
		],
		'template-tag-spacing': ['error', 'never'],
		'arrow-spacing': [
			'error',
			{
				before: true,
				after: true,
			},
		],
		'generator-star-spacing': [
			'error',
			{
				before: false,
				after: true,
			},
		],
		'no-class-assign': 'error',
		'no-confusing-arrow': [
			'error',
			{
				allowParens: true,
			},
		],
		'no-duplicate-imports': 'error',
		'no-useless-computed-key': 'error',
		'no-useless-constructor': 'error',
		'no-useless-rename': 'error',
		'no-var': 'error',
		'rest-spread-spacing': ['error', 'never'],
		'symbol-description': 'error',
		'template-curly-spacing': ['error', 'never'],
		'yield-star-spacing': ['error', 'after'],
		'react/no-find-dom-node': 'off',
		'react/no-deprecated': 'off',
		'react/no-typos': 'error',
		'react/no-string-refs': 'off',
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/no-direct-mutation-state': 'off',
		'react/self-closing-comp': [
			'error',
			{
				component: true,
				html: true,
			},
		],
		'react/display-name': 'off',
		'react/sort-comp': [
			'error',
			{
				order: ['defaultProps', 'static-methods', 'constructor', 'everything-else', 'lifecycle', 'render'],
			},
		],
		'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
		'react/jsx-equals-spacing': ['error', 'never'],
		'react/jsx-first-prop-new-line': ['error', 'multiline'],
		'react/jsx-key': 'error',
		'react/jsx-max-props-per-line': [
			'error',
			{
				maximum: 1,
				when: 'multiline',
			},
		],
		'react/jsx-no-target-blank': 'off',
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-multi-spaces': 'error',
		'react/jsx-tag-spacing': [
			'error',
			{
				closingSlash: 'never',
				beforeSelfClosing: 'always',
				afterOpening: 'never',
				beforeClosing: 'never',
			},
		],
		'react-hooks/exhaustive-deps': 'off',
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'none',
				caughtErrors: 'none',
				ignoreRestSiblings: true,
			},
		],
	},
}
