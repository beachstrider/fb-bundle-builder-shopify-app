module.exports = {
  quickfresh: {
    settings: {
      page: {
        title: 'QuickFresh',
        description:
          'We offer healthy, chef-prepared meals delivered fresh to your door. Choose from a wide variety of 120+ options for both Balanced and Keto meal types.'
      }
    },
    bundles: {
      images: {
        featured: '/images/quickfresh-frequency.jpg',
        checkout: '/images/quickfresh-order-package.jpg',
        breakfastSample: '/images/quickfresh-breakfast-sample.jpg'
      },
      icons: [
        {
          key: 'is_dairy_free',
          src: '/images/quickfresh-dairy-free-icon.svg',
          alt: 'dairy-free-icon'
        },
        {
          key: 'is_gluten_free',
          src: '/images/quickfresh-gluten-free-icon.svg',
          alt: 'gluten-free-icon'
        },
        {
          key: 'is_peanut_free',
          src: '/images/quickfresh-peanut-free-icon.svg',
          alt: 'peanut-free-icon'
        },
        {
          key: 'is_spicy',
          src: '/images/quickfresh-spicy-icon.svg',
          alt: 'spicy-icon'
        }
      ],
      options: [
        {
          id: 1,
          name: '14 Meals',
          description: '7-Days All inclusive - (14 Meals + 7 Breakfasts)',
          price: 9.95,
          shippingPrice: 8.95,
          entreesQuantity: 14,
          breakfastsQuantity: 7,
          breakfasts: [
            {
              name: '7 Meals',
              price: 4.95,
              tag: '7 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '7 Day'
            }
          ]
        },
        {
          id: 2,
          name: '10 Meals',
          description: '',
          price: 11.95,
          shippingPrice: 8.95,
          entreesQuantity: 10,
          breakfastsQuantity: 5,
          breakfasts: [
            {
              name: '5 Meals',
              price: 5.95,
              tag: '5 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '5 Day'
            }
          ]
        },
        {
          id: 3,
          name: '6 Meals',
          description: '',
          price: 12.95,
          shippingPrice: 8.95,
          entreesQuantity: 6,
          breakfastsQuantity: 3,

          breakfasts: [
            {
              name: '3 Meals',
              price: 5.95,
              tag: '3 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '3 Day'
            }
          ]
        }
      ],
      pricesPerPortion: [
        { type: 'keto', subType: 'large', price: 1 },
        { type: 'balanced', subType: 'medium', price: 1 },
        { type: 'balanced', subType: 'large', price: 2 }
      ]
    },
    theme: {
      fontFiles: [
        {
          name: 'Gotham-Black',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Black.otf?v=1627982628'
        },
        {
          name: 'Gotham-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Bold.otf?v=1627982628'
        },
        {
          name: 'Gotham-Book',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Book.otf?v=1627982628'
        },
        {
          name: 'Gotham-Light',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Light.otf?v=1627982628'
        },
        {
          name: 'Gotham-Medium',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Medium.otf?v=1627982628'
        },
        {
          name: 'Gotham-Thin',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Thin.otf?v=1627982628'
        }
      ],
      fontFamilies: {
        fontFamilyBook: 'Gotham-Book',
        fontFamilyBold: 'Gotham-Bold',
        fontFamilyBlack: 'Gotham-Black',
        fontFamilyLight: 'Gotham-Light',
        fontFamilyThin: 'Gotham-Thin',
        fontFamilyMedium: 'Gotham-Medium',
        fontFamilyMediumBold: 'Gotham-Medium',
        fontFamilyMediumItalic: 'Gotham-Medium'
      },
      borders: {
        borderButtonRadius: '2.5rem'
      },
      fontSizes: {
        fontLarge: '4.7rem',
        fontMediumLarge: '3rem',
        semiMediumFont: '2.4rem',
        fontMedium: '2rem',
        fontMediumRegular: '1.8rem',
        fontMediumSmall: '1.6rem',
        fontSmall: '1.6rem',
        fontXSmall: '1.5rem',
        font2XSmall: '1.4rem',
        font3XSmall: '1.2rem'
      },
      colors: {
        primaryColor: '#0a8d47',
        primaryColorLight: '#068d47',
        secondaryColor: '#fec12d',
        gray: '#4c4c4c',
        grayLight: '#e7eaec',
        gray100: '#e2e2e2',
        gray200: '#dbdbdb',
        gray300: '#bababa',
        grayMedium: '#737678',
        grayMediumSecondary: '#242424',
        white: '#ffffff',
        black: '#000000',
        border: '#707070',
        red: '#c8432d',
        orange: '#ec6120',
        butter: '#fedc5c',
        butter100: '#fedc5cb3',
        headerBackgroundColor: '#f6f6f7',
        borderColor: '#ebebec',
        faqBackgroundColor: '#e8e8e8',
        pillBackground: '#737678',
        buttonColor: '#0a8d47',
        bannerBackground: '#fedc5c',
        deliveryDay: '#000000'
      }
    }
  },
  /**
   * CHOW Notes:
   * Breakfast price is always: mealPrice - $2 = X
   */
  chow: {
    settings: {
      page: {
        title: 'Chow',
        description:
          'We offer healthy, chef-prepared meals delivered fresh to your door. Choose from a wide variety of 120+ options for both Balanced and Keto meal types.'
      }
    },
    bundles: {
      images: {
        featured: '/images/quickfresh-frequency.jpg',
        checkout: '/images/chow-thank-you-for-your-order.png',
        breakfastSample: '/images/quickfresh-breakfast-sample.jpg'
      },
      icons: [
        {
          key: 'is_dairy_free',
          src: '/images/quickfresh-dairy-free-icon.svg',
          alt: 'dairy-free-icon'
        },
        {
          key: 'is_gluten_free',
          src: '/images/quickfresh-gluten-free-icon.svg',
          alt: 'gluten-free-icon'
        },
        {
          key: 'is_peanut_free',
          src: '/images/quickfresh-peanut-free-icon.svg',
          alt: 'peanut-free-icon'
        },
        {
          key: 'is_spicy',
          src: '/images/quickfresh-spicy-icon.svg',
          alt: 'spicy-icon'
        }
      ],
      options: [
        {
          id: 1,
          name: '14 Meals',
          description: '7-Days All inclusive - (14 Meals + 7 Breakfasts)',
          price: 10.95,
          shippingPrice: 8.95,
          entreesQuantity: 14,
          breakfastsQuantity: 7,
          breakfasts: [
            {
              name: '7 Meals',
              price: 8.95,
              tag: '7 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '7 Day'
            }
          ]
        },
        {
          id: 2,
          name: '10 Meals',
          description: '',
          price: 11.95,
          shippingPrice: 8.95,
          entreesQuantity: 10,
          breakfastsQuantity: 5,
          breakfasts: [
            {
              name: '5 Meals',
              price: 9.95,
              tag: '5 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '5 Day'
            }
          ]
        },
        {
          id: 3,
          name: '6 Meals',
          description: '',
          price: 12.95,
          shippingPrice: 8.95,
          entreesQuantity: 6,
          breakfastsQuantity: 3,

          breakfasts: [
            {
              name: '3 Meals',
              price: 10.95,
              tag: '3 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '3 Day'
            }
          ]
        }
      ],
      pricesPerPortion: [
        { type: 'keto', subType: 'large', price: 1 },
        { type: 'balanced', subType: 'medium', price: 1 },
        { type: 'balanced', subType: 'large', price: 2 }
      ]
    },
    theme: {
      fontFiles: [
        {
          name: 'Eveleth-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/EvelethRegular-Bold.woff?v=1646429742'
        },
        {
          name: 'Eveleth-Regular',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/Eveleth_Regular.otf?v=1647641476'
        },
        {
          name: 'Gotham-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Bold.otf?v=1627982628'
        },
        {
          name: 'Lato-Regular',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/Lato-Regular.woff?v=1646429737'
        },
        {
          name: 'Gotham-Light',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Light.otf?v=1627982628'
        },
        {
          name: 'Lato-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/Lato-Bold.woff?v=1646429737'
        },
        {
          name: 'Lato-Bold-Italic',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/Lato-BoldItalic.ttf?v=1647640661'
        },
        {
          name: 'Gotham-Thin',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Thin.otf?v=1627982628'
        }
      ],
      fontFamilies: {
        fontFamilyBook: 'Lato-Regular',
        fontFamilyBold: 'Eveleth-Regular',
        fontFamilyBlack: 'Eveleth-Regular',
        fontFamilyLight: 'Lato-Bold',
        fontFamilyThin: 'Gotham-Thin',
        fontFamilyMedium: 'Lato-Bold',
        fontFamilyMediumBold: 'Lato-Bold',
        fontFamilyMediumItalic: 'Lato-Bold-Italic'
      },
      borders: {
        borderButtonRadius: '0.5rem'
      },
      fontSizes: {
        fontLarge: '4.7rem',
        fontMediumLarge: '3rem',
        semiMediumFont: '2.4rem',
        fontMedium: '2rem',
        fontMediumRegular: '1.8rem',
        fontMediumSmall: '1.6rem',
        fontSmall: '1.6rem',
        fontXSmall: '1.5rem',
        font2XSmall: '1.4rem',
        font3XSmall: '1.2rem'
      },
      colors: {
        primaryColor: '#000000',
        primaryColorLight: '#656549',
        secondaryColor: '#BB8D3D',
        gray: '#4c4c4c',
        grayLight: '#e7eaec',
        gray100: '#e2e2e2',
        gray200: '#dbdbdb',
        gray300: '#bababa',
        grayMedium: '#737678',
        grayMediumSecondary: '#242424',
        white: '#ffffff',
        black: '#000000',
        border: '#707070',
        red: '#c8432d',
        orange: '#ec6120',
        butter: '#fedc5c',
        butter100: '#fedc5cb3',
        headerBackgroundColor: '#f6f6f7',
        borderColor: '#ebebec',
        faqBackgroundColor: '#e8e8e8',
        pillBackground: '#BB8D3D',
        buttonColor: '#656549',
        bannerBackground: '#DDCFC4',
        deliveryDay: '#000000'
      }
    }
  },
  cse: {
    settings: {
      page: {
        title: 'Clean Simple Eats',
        description:
          'We offer healthy, chef-prepared meals delivered fresh to your door. Choose from a wide variety of 120+ options for both Balanced and Keto meal types.'
      }
    },
    bundles: {
      images: {
        featured: '/images/quickfresh-frequency.jpg',
        checkout: '/images/cse-review-order.png',
        breakfastSample: '/images/quickfresh-breakfast-sample.jpg'
      },
      icons: [
        {
          key: 'is_dairy_free',
          src: '/images/quickfresh-dairy-free-icon.svg',
          alt: 'dairy-free-icon'
        },
        {
          key: 'is_gluten_free',
          src: '/images/quickfresh-gluten-free-icon.svg',
          alt: 'gluten-free-icon'
        },
        {
          key: 'is_peanut_free',
          src: '/images/quickfresh-peanut-free-icon.svg',
          alt: 'peanut-free-icon'
        },
        {
          key: 'is_spicy',
          src: '/images/quickfresh-spicy-icon.svg',
          alt: 'spicy-icon'
        }
      ],
      options: [
        {
          id: 1,
          name: '14 Meals',
          description: '7-Days All inclusive - (14 Meals + 7 Breakfasts)',
          price: 10.95,
          shippingPrice: 8.95,
          entreesQuantity: 14,
          breakfastsQuantity: 7,
          breakfasts: [
            {
              name: '7 Meals',
              price: 7.95,
              tag: '7 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '7 Day'
            }
          ]
        },
        {
          id: 2,
          name: '10 Meals',
          description: '',
          price: 11.95,
          shippingPrice: 8.95,
          entreesQuantity: 10,
          breakfastsQuantity: 5,
          breakfasts: [
            {
              name: '5 Meals',
              price: 8.95,
              tag: '5 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '5 Day'
            }
          ]
        },
        {
          id: 3,
          name: '6 Meals',
          description: '',
          price: 12.95,
          shippingPrice: 8.95,
          entreesQuantity: 6,
          breakfastsQuantity: 3,

          breakfasts: [
            {
              name: '3 Meals',
              price: 9.95,
              tag: '3 Day with breakfast'
            },
            {
              name: 'none',
              price: 'None',
              tag: '3 Day'
            }
          ]
        }
      ],
      pricesPerPortion: [
        { type: 'keto', subType: 'large', price: 1 },
        { type: 'balanced', subType: 'medium', price: 1 },
        { type: 'balanced', subType: 'large', price: 2 }
      ]
    },
    theme: {
      fontFiles: [
        {
          name: 'Eveleth-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/EvelethRegular-Bold.woff?v=1646429742'
        },
        {
          name: 'Eveleth-Regular',
          url: 'https://cdn.shopify.com/s/files/1/0630/9399/7799/files/Eveleth_Regular.otf?v=1647641476'
        },
        {
          name: 'Gotham-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Bold.otf?v=1627982628'
        },
        {
          name: 'Avenir-Regular',
          url: 'https://cdn.shopify.com/s/files/1/0632/5262/7694/files/Avenir-Book.woff?v=1647640173'
        },
        {
          name: 'Gotham-Light',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Light.otf?v=1627982628'
        },
        {
          name: 'Avenir-Bold',
          url: 'https://cdn.shopify.com/s/files/1/0632/5262/7694/files/Avenir-Heavy.woff?v=1647640173'
        },
        {
          name: 'Avenir-Bold-Italic',
          url: 'https://cdn.shopify.com/s/files/1/0632/5262/7694/files/Avenir-Oblique.woff?v=1647640173'
        },
        {
          name: 'Gotham-Thin',
          url: 'https://cdn.shopify.com/s/files/1/0552/6549/3185/files/Gotham-Thin.otf?v=1627982628'
        }
      ],
      fontFamilies: {
        fontFamilyBook: 'Avenir-Regular',
        fontFamilyBold: 'Eveleth-Regular',
        fontFamilyBlack: 'Eveleth-Regular',
        fontFamilyLight: 'Avenir-Bold',
        fontFamilyThin: 'Gotham-Thin',
        fontFamilyMedium: 'Avenir-Bold',
        fontFamilyMediumBold: 'Avenir-Bold',
        fontFamilyMediumItalic: 'Avenir-Bold-Italic'
      },
      borders: {
        borderButtonRadius: '0.5rem'
      },
      fontSizes: {
        fontLarge: '4.7rem',
        fontMediumLarge: '3rem',
        semiMediumFont: '2.4rem',
        fontMedium: '2rem',
        fontMediumRegular: '1.8rem',
        fontMediumSmall: '1.6rem',
        fontSmall: '1.6rem',
        fontXSmall: '1.5rem',
        font2XSmall: '1.4rem',
        font3XSmall: '1.2rem'
      },
      colors: {
        primaryColor: '#000000',
        primaryColorLight: '#689859',
        secondaryColor: '#689859',
        gray: '#4c4c4c',
        grayLight: '#e7eaec',
        gray100: '#e2e2e2',
        gray200: '#dbdbdb',
        gray300: '#bababa',
        grayMedium: '#737678',
        grayMediumSecondary: '#242424',
        white: '#ffffff',
        black: '#000000',
        border: '#707070',
        red: '#c8432d',
        orange: '#ec6120',
        butter: '#fedc5c',
        butter100: '#fedc5cb3',
        headerBackgroundColor: '#f6f6f7',
        borderColor: '#ebebec',
        faqBackgroundColor: '#e8e8e8',
        pillBackground: '#689859',
        buttonColor: '#689859',
        bannerBackground: '#DDCFC4',
        deliveryDay: '#689859'
      }
    }
  }
}
