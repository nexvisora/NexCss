export default {
  plugins: [
    // Asset handling
    ['postcss-import', {
      path: ['src/styles']
    }],
    ['postcss-url', {
      url: 'rebase'
    }],

    // Modern CSS features
    ['postcss-nested', {}],
    ['postcss-custom-media', {
      importFrom: 'src/styles/media.css'
    }],
    ['postcss-preset-env', {
      stage: 1,
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true,
        'custom-selectors': true,
        'gap-properties': true,
        'place-properties': true,
        'logical-properties-and-values': true,
        'color-functional-notation': true,
        'double-position-gradients': true,
        'cascade-layers': true
      },
      autoprefixer: {
        grid: true
      }
    }],

    // Optimization
    ['postcss-combine-duplicated-selectors', {
      removeDuplicatedProperties: true
    }],
    ['postcss-combine-media-query', {}],
    ['postcss-sort-media-queries', {}],

    // Minification (only in production)
    process.env.NODE_ENV === 'production' && [
      'cssnano',
      {
        preset: [
          'advanced',
          {
            discardComments: {
              removeAll: true
            },
            reduceIdents: false,
            zindex: false
          }
        ]
      }
    ]
  ].filter(Boolean)
};
