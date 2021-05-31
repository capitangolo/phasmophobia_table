// Language switcher from:
//  https://stackoverflow.com/a/51556636
//
// Locale data from:
//  https://github.com/austintackaberry/i18n-example/blob/master/src/index.js

import React from "react";
import { IntlProvider, addLocaleData } from "react-intl";

import localeData from "./locales/data.json";
import qs from "qs";

class IntlProviderWrapper extends React.Component {

  constructor(...args) {
    super(...args);

    // Language from url query
    const queryLanguage = qs.parse(window.location.search, { ignoreQueryPrefix: true }).lang

    // Define user's language. Different browsers have the user locale defined
    // on different fields on the `navigator` object, so we make sure to account
    // for these different by checking all of them
    const navigatorLanguage =
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      navigator.userLanguage;

    // Split locales with a region code
    const language = queryLanguage || navigatorLanguage
    const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    // Try full locale, try locale without region code, fallback to 'en'
    const messages =
      localeData[languageWithoutRegionCode] ||
      localeData[language] ||
      localeData.en;

    // pass everything in state to avoid creating object inside render method (like explained in the documentation)
    this.state = {
      locale: language,
      messages: messages,
      switchToEN: this.switchToEN,
      switchToES: this.switchToES
    };
  }

  render() {
    const { children } = this.props;
    return (
      <IntlProvider
        locale={this.state.language}
        messages={this.state.messages}
      >
        <div>
          <span style={{margin: "10px"}} ><a href="?lang=EN">English</a></span>
          <span style={{margin: "10px"}} ><a href="?lang=ES">Español</a></span>
        </div>
        {children}
      </IntlProvider>
    );
  }
}

export { IntlProviderWrapper };
