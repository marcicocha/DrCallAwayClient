<template>
  <div>
    <p>
      Savon Nettoyage reserves the right to use both persistent cookies which
      remain in your computer after you close your session and until you delete
      and/or session cookies that expires when you close your browser.
    </p>
    <p>
      A cookie is a piece of data sent from a website to a user’s computer while
      the user is browsing that website. Cookies are designed to save certain
      information inputed by a web user on particular web pages that will allow
      the website recall information such as postal address, phone number, and
      customer name on future visits to that web page. This provides ease and
      convenience to a user’s experience by ensuring previously submitted
      information does not need to be re-entered each time the user is on that
      web page.
    </p>
    <p>
      You may accept or decline cookies. Opting to decline cookies may restrict
      users from enjoying the full breadth of Savon Nettoyage’s website and its
      associated services and features
    </p>
    <p>
      IF YOU HAVE ANY QUESTION CONCERNING OUR PRIVACY POLICY, YOU MAY CONTACT US
      BY SENDING AN EMAIL TO XXXXX
    </p>
    <br />
    <a @click="$emit('changePageHandler', 'governingLaw')"
      ><h6>&#60;&#60;&#60; Governing Law</h6></a
    >
  </div>
</template>
<style lang="scss" scoped>
h6 {
  color: $purple;
}
a {
  h6 {
    text-shadow: 0px 16px 21px #00000029;
  }
}
</style>
