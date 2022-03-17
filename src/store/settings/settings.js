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
      ]
    },
    theme: {
      fontFamilies: {
        fontFamilyBook: 'Gotham-Book',
        fontFamilyBold: 'Gotham-Bold',
        fontFamilyBlack: 'Gotham-Black',
        fontFamilyLight: 'Gotham-Light',
        fontFamilyThin: 'Gotham-Thin',
        fontFamilyMedium: 'Gotham-Medium'
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
        font2XSmall: '1.4rem'
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
        bannerBackground: '#fedc5c'
      }
    }
  },
  /**
   * CHOW Notes:
   * Breakfast price is always: mealPrice - $3 = X
   */
  chow: {
    settings: {
      page: {
        title: 'Chow',
        // TODO: Change description
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
      ]
    },
    theme: {
      fontFamilies: {
        fontFamilyBook: 'Gotham-Book',
        fontFamilyBold: 'Gotham-Bold',
        fontFamilyBlack: 'Gotham-Black',
        fontFamilyLight: 'Gotham-Light',
        fontFamilyThin: 'Gotham-Thin',
        fontFamilyMedium: 'Gotham-Medium'
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
        font2XSmall: '1.4rem'
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
        bannerBackground: '#DDCFC4'
      }
    }
  }
}
