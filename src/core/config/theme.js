const colors = {
  primary: '#F2994A',
  primary_080: '#466785',
  success_color: '#209781',
  error: '#CB0A29',
  text_placeholder: '#A8A8A8',
  link: '#2a74aa',
  white: '#ffffff',
  black: '#171717',
  black_050: '#8F8F8F',
};

const theme = {
  // https://ant.design/theme-editor
  token: {
    colorPrimary: colors.primary,
    colorLink: colors.link,
    colorTextPlaceholder: colors.text_placeholder,
    colorSuccess: colors.success_color,
    colorError: colors.error,
    borderRadius: 4,
    fontFamily: 'Roboto, sans-serif',
    colorText: colors.black,
    controlHeightLG: 48,
    controlHeight: 36,
  },
  components: {
    Layout: {
      controlHeightLG: 40,
      controlHeight: 32,
    },
    Input: {
      colorTextDisabled: colors.black_050,
      colorTextPlaceholder: colors.black_050,
    },
    Checkbox: {
      controlInteractiveSize: 18,
    },
    Button: {
      controlHeightLG: 56,
      colorBorder: colors.primary,
    },
    Menu: {
      colorItemBg: colors.primary,
      colorItemBgSelected: colors.primary_080,
      colorItemTextSelected: colors.white,
      colorItemTextHover: colors.white,
      colorItemBgHover: colors.primary_080,
    },
    Table: {
      controlHeight: 40,
      fontWeightStrong: 500,
    },
  },
};
export default theme;
